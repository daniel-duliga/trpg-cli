import fs from 'fs'
import YAML from 'yaml'

import { dataBasePaths, fileExtensions } from '../constants'
import { Dice } from './dice'
import { FileUtil } from "../utils/file-util"
import { Tables } from './tables'
import { PromptService } from '../services/prompt-service'

export class Sheets {
    static getAllSheets(): string[] {
        return FileUtil.getFilesListFromPath(dataBasePaths.sheets, fileExtensions.yml)
    }
    
    static async rollSheet(sheetPath: string): Promise<any> {
        const sheetFile = fs.readFileSync(`${dataBasePaths.sheets}/${sheetPath}${fileExtensions.yml}`, 'utf-8')
        const sheet = YAML.parse(sheetFile)
        return Sheets.processSheet(sheet)
    }

    static async processSheet(sheet: any): Promise<any> {
        for (const fieldName in sheet) {
            const field = sheet[fieldName]
            const fieldType = field.type
            if (fieldType === 'input') {
                sheet[fieldName] = await PromptService.promptInput(field.value)
            } else if (fieldType === 'dice') {
                sheet[fieldName] = Dice.rollDiceFormula(field.value).value
            } else if (fieldType === 'table') {
                sheet[fieldName] = Tables.rollOnTable(field.value)
            } else if (['eval', 'progress', 'result'].includes(fieldType)) {
                const formula = field.value.replace(/\$/g, 'sheet.')
                sheet[fieldName] = eval(formula)
            } else if (fieldType === 'section') {
                sheet[fieldName] = await Sheets.processSheet(field.value)
            }
        }
        return Promise.resolve(sheet)
    }
}