import inquirer from 'inquirer'

import { fuzzySearchStrings } from '../utils/search-util'
import { ConsoleUtil } from '../utils/console-util'
import { CommandBase } from './base-command'
import { TableUtil } from '../utils/table-util'

const backOption = '* Back'

export class RollTableCommand extends CommandBase {
  name = '📄 Roll table'

  execute(): Promise<boolean> {
    const allTables = TableUtil.getAllTables()
    allTables.push(backOption)
    return inquirer
      .prompt([
        {
          type: 'autocomplete',
          name: 'option',
          message: 'Table:',
          source: (answersSoFar: any, input: string) => fuzzySearchStrings(allTables, input)
        },
      ])
      .then(selection => this.handleSelection(selection))
  }

  handleSelection(selection: any): Promise<boolean> {
    if (selection.option === backOption) {
      ConsoleUtil.logResult('Going back')
      return super.execute()
    }
    const result = TableUtil.rollOnTable(selection.option)
    ConsoleUtil.logResult(result)
    console.log()
    return this.execute()
  }
}
