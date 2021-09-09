import inquirer from 'inquirer'

import { CommandBase } from './command-base'
import { SearchUtil } from '../utils/search-util'
import { SheetsUtil } from '../utils/sheets-util'

export class SheetsCommand extends CommandBase {
    name = '📜 Roll sheet'

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
            .then(selection => this.handleSelection(selection.option))
    }

    handleSelection(sheetPath: string): Promise<boolean> {
        const sheet = SheetsUtil.rollSheet(sheetPath)
        console.log(sheet)
        return super.execute()
    }
}