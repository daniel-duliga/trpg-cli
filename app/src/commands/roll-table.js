import fs from 'fs'
import inquirer from 'inquirer'
import parse from 'csv/lib/sync.js'

import { fuzzySearchStrings } from '../utils/search-util.js'
import { logResult } from '../utils/console-util.js'
import { rollDice } from '../utils/dice-util.js'
import { walk } from '../utils/file-util.js'

const tablesBasePath = 'app/data/tables'
const csvExtension = '.csv'

export default class RollTableCommand {
  name = 'Roll table'

  execute() {
    let allTables = walk(tablesBasePath)
    allTables = allTables.map((x) =>
      x.replace(`${tablesBasePath}/`, '').replace(csvExtension, ''),
    )
    return inquirer
      .prompt([
        {
          type: 'autocomplete',
          name: 'option',
          message: 'Table:',
          source: function (answersSoFar, input) {
            return fuzzySearchStrings(allTables, input)
          },
        },
      ])
      .then((selection) => {
        const file = fs
          .readFileSync(`${tablesBasePath}/${selection.option}${csvExtension}`)
          .toString()
        const records = parse.parse(file)
        if (records.length > 0) {
          return this.rollOnTable(records)
        } else {
          logResult('Table has no entries')
        }
      })
  }

  rollOnTable(output) {
    const roll = rollDice(1, output.length)[0]
    const result = output.find((x) => x[0] === roll.toString())[1]
    logResult(result)
  }
}
