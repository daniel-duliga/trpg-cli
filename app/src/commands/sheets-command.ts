import inquirer from 'inquirer'

import { BaseCommand } from './base-command'
import { Sheets } from '../trpg/sheets'
import { Entities } from '../trpg/entities'
import { ConsoleUtil } from '../utils/console-util'
import { SearchUtil } from '../utils/search-util'
import { PromptService } from '../services/prompt-service'

export class SheetsCommand extends BaseCommand {
    name = '📜 Roll Sheet'

    execute(): Promise<boolean> {
        const allSheets = Sheets.getAllSheets()
        return inquirer.prompt([
            {
                type: 'autocomplete',
                name: 'option',
                message: 'Sheet:',
                source: (answersSoFar: any, input: string) =>
                    SearchUtil.fuzzySearchStrings(allSheets, input)
            },
        ]).then(selection => this.handleSheetSelection(selection.option))
    }

    async handleSheetSelection(sheetPath: string): Promise<boolean> {
        const sheet = await Sheets.rollSheet(sheetPath)
        ConsoleUtil.logObjectResult(sheet)
        
        console.log()
        
        const option = await PromptService.promptAutocomplete('Options', ['Save as entity', 'Roll another', 'Back'])
        return this.handleSheetOption(sheet, option)
    }

    async handleSheetOption(sheet: any, option: string): Promise<boolean> {
        switch (option) {
            case 'Save as entity': {
                return await this.saveAsEntity(sheet)
            }
            case 'Roll another': {
                return this.execute()
            }
            default: {
                return super.execute()
            }
        }
    }

    async saveAsEntity(sheet: any): Promise<boolean> {
        const path = await PromptService.promptInput('Entity name')
        Sheets.saveSheetAsEntity(path, sheet)
        return super.execute()
    }
}