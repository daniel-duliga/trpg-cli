import fs from 'fs'
import YAML from 'yaml'

import { dataBasePaths, fileExtensions } from '../constants'
import { Dice } from './dice'
import { FileUtil } from "../utils/file-util"
import { Tables } from './tables'

export class Sheets {
    static getAllSheets(): string[] {
        return FileUtil.getFilesListFromPath(dataBasePaths.sheets, fileExtensions.yml)
    }
    
    static rollSheet(sheetPath: string): any {
        const sheetFile = fs.readFileSync(`${dataBasePaths.sheets}/${sheetPath}${fileExtensions.yml}`, 'utf-8')
        const sheet = YAML.parse(sheetFile)
        return Sheets.processSheet(sheet)
    }

    private static processSheet(sheet: any): any {
        for (const fieldName in sheet) {
            const field = sheet[fieldName]
            switch (field.type) {
                case 'dice_roll': {
                    sheet[fieldName] = Dice.rollDiceFormula(field.value).value
                    break
                }
                case 'table_roll': {
                    sheet[fieldName] = Tables.rollOnTable(field.value)
                    break
                }
                case 'eval': {
                    const formula = field.value.replace(/\$/g, 'sheet.')
                    sheet[fieldName] = eval(formula)
                    break
                }
                case 'section': {
                    sheet[fieldName] = Sheets.processSheet(field.value)
                }
            }
        }
        return sheet
    }
}