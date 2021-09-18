import inquirer from 'inquirer'

import { CommandBase } from './command-base'
import { Sheets } from '../trpg/sheets'
import { Entities } from '../trpg/entities'
import { ConsoleUtil } from '../utils/console-util'
import { SearchUtil } from '../utils/search-util'

export class SheetsCommand extends CommandBase {
    name = '📜 Sheets'

    execute(): Promise<boolean> {
        const allSheets = Sheets.getAllSheets()
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
        const sheet = Sheets.rollSheet(sheetPath)
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
                Entities.saveSheetAsEntity(answer.value, sheet)
                return super.execute()
            })
    }
}