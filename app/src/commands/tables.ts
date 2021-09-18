import inquirer from 'inquirer'

import { SearchUtil } from '../utils/search-util'
import { ConsoleUtil } from '../utils/console-util'
import { CommandBase } from './command-base'
import { Tables } from '../trpg/tables'

export class TablesCommand extends CommandBase {
  name = '🎱 Roll Table'

  execute(): Promise<boolean> {
    const allTables = Tables.getAllTables()
    return inquirer
      .prompt([
        {
          type: 'autocomplete',
          name: 'option',
          message: 'Table:',
          source: (answersSoFar: any, input: string) => SearchUtil.fuzzySearchStrings(allTables, input)
        },
      ])
      .then(selection => this.handleSelection(selection))
  }

  handleSelection(selection: any): Promise<boolean> {
    const result = Tables.rollOnTable(selection.option)
    ConsoleUtil.logStringResult(result)
    return super.execute()
  }
}
