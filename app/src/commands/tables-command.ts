import inquirer from 'inquirer'

import { SearchUtil } from '../utils/search-util'
import { ConsoleUtil } from '../utils/console-util'
import { BaseCommand } from './base-command'
import { Tables } from '../trpg/tables'
import { PromptService } from '../services/prompt-service'

export class TablesCommand extends BaseCommand {
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
    console.log()
    return PromptService.promptAutocomplete(['Roll another', 'Back']).then(answer => {
      switch (answer) {
        case 'Roll another': {
          return this.execute()
        }
        default: {
          return super.execute()
        }
      }
    })
  }
}
