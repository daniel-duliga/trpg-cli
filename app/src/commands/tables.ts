import inquirer from 'inquirer'

import { SearchUtil } from '../utils/search-util'
import { ConsoleUtil } from '../utils/console-util'
import { CommandBase } from './command-base'
import { TableUtil } from '../utils/tables-util'

export class TablesCommand extends CommandBase {
  name = '🎱 Tables'

  execute(): Promise<boolean> {
    const allTables = TableUtil.getAllTables()
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
    const result = TableUtil.rollOnTable(selection.option)
    ConsoleUtil.logStringResult(result)
    return super.execute()
  }
}
