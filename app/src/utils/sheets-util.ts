import fs from 'fs'
import YAML from 'yaml'
import { DiceUtil } from './dice-util';

import { FileUtil } from "./file-util";
import { TableUtil } from './tables-util';

const sheetsBasePath = 'app/data/sheets'
const ymlExtension = '.yml'

export class SheetsUtil {
    static getAllSheets(): string[] {
        return FileUtil.getFilesListFromPath(sheetsBasePath, ymlExtension)
    }
    
    static rollSheet(sheetPath: string): any {
        const sheetFile = fs.readFileSync(`${sheetsBasePath}/${sheetPath}${ymlExtension}`, 'utf-8')
        const sheet = YAML.parse(sheetFile)
        for (const fieldName in sheet) {
            const field = sheet[fieldName]
            switch (field.type) {
                case 'dice_roll': {
                    sheet[fieldName] = DiceUtil.rollDiceFormula(field.value).value
                    break
                }
                case 'table_roll': {
                    sheet[fieldName] = TableUtil.rollOnTable(field.value)
                    break
                }
                case 'eval': {
                    const formula = field.value.replaceAll('$', 'sheet.')
                    sheet[fieldName] = eval(formula)
                }
            }
        }
        return sheet
    }
}