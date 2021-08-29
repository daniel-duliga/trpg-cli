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
        return this.handleSelection(selection)
      })
  }

  handleSelection(selection) {
    const file = fs
      .readFileSync(`${tablesBasePath}/${selection.option}${csvExtension}`)
      .toString()
    const csvRecords = parse.parse(file)
    return this.rollOnTable(csvRecords)
  }

  rollOnTable(tableRecords) {
    let max = tableRecords[tableRecords.length - 1][0]
    if (max.includes('-')) {
      max = max.split('-').map(x => +x)[1]
    } else if (max === '00') {
      max = 100
    } else {
      max = +max
    }
    const roll = rollDice(1, max)
    const result = tableRecords.find((x) => this.checkMatch(x[0], roll))[1]
    logResult(result)
  }

  checkMatch(index, roll) {
    if (index.includes('-')) {
      const ranges = index.split('-').map(x => +x)
      return ranges[0] <= roll && roll <= ranges[1]
    } else {
      return index === roll.toString()
    }
  }
}
