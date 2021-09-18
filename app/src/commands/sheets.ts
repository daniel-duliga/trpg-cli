import inquirer from 'inquirer'

import { CommandBase } from './command-base'
import { SearchUtil } from '../utils/search-util'
import { SheetsUtil } from '../utils/sheets-util'
import { ConsoleUtil } from '../utils/console-util'
import { EntitiesUtil } from '../utils/entities-util'

export class SheetsCommand extends CommandBase {
    name = '📜 Sheets'

    execute(): Promise<boolean> {
        const allSheets = SheetsUtil.getAllSheets()
        return inquirer
            .prompt([
                {
                    type: 'autocomplete',
                    name: 'option',
                    message: 'Sheet:',
                    source: (answersSoFar: any, input: string) => SearchUtil.fuzzySearchStrings(allSheets, input)
                },
            ])
            .then(selection => this.handleSheetSelection(selection.option))
    }

    handleSheetSelection(sheetPath: string): Promise<boolean> {
        const sheet = SheetsUtil.rollSheet(sheetPath)
        ConsoleUtil.logObjectResult(sheet)
        console.log()

        return inquirer
            .prompt([
                {
                    type: 'autocomplete',
                    name: 'option',
                    message: 'Options:',
                    source: (answersSoFar: any, input: string) => SearchUtil.fuzzySearchStrings(['Save as entity', 'Roll another', 'Back'], input)
                },
            ])
            .then(selection => this.handleSheetOption(sheet, selection.option))
    }

    handleSheetOption(sheet: any, option: string): Promise<boolean> {
        switch (option) {
            case 'Save as entity': {
                return this.saveAsEntity(sheet)
            }
            case 'Roll another': {
                return this.execute()
            }
            case 'Back': {
                return super.execute()
            }
            default: {
                return super.execute()
            }
        }
    }

    saveAsEntity(sheet: any): Promise<boolean> {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'value',
                    message: 'Entity name:',
                },
            ])
            .then((answer) => {
                EntitiesUtil.saveSheetAsEntity(answer.value, sheet)
                return super.execute()
            })
    }
}