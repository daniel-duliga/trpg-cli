import fs from 'fs'
import inquirer from 'inquirer'
import parse from 'csv-parse/lib/sync'

import { fuzzySearchStrings } from '../utils/search-util'
import { logResult } from '../utils/console-util'
import { rollDice } from '../utils/dice-util'
import { walk } from '../utils/file-util'
import { CommandBase } from './base-command'

const tablesBasePath = 'app/data/tables'
const csvExtension = '.csv'
const backOption = '* Back'

export class RollTableCommand extends CommandBase {
  name = '📄 Roll table'

  execute(): Promise<boolean> {
    let allTables = walk(tablesBasePath)
    allTables = allTables.map((x) =>
      x.replace(`${tablesBasePath}/`, '').replace(csvExtension, ''),
    )
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
      logResult('Going back')
      return super.execute()
    }

    const file = fs
      .readFileSync(`${tablesBasePath}/${selection.option}${csvExtension}`)
      .toString()

    const csvRecords = parse(file)

    this.rollOnTable(csvRecords)
    
    return this.execute()
  }

  rollOnTable(tableRecords: any): void {
    
    let max = tableRecords[tableRecords.length - 1][0]
    if (max.includes('-')) {
      max = max.split('-')[1]
    }
    if (max === '00') {
      max = 100
    } else {
      max = +max
    }
    
    const roll = rollDice(1, max)
    
    const result = tableRecords.find((x: any[]) => this.checkMatch(x[0], roll.value))[1]
    
    logResult(result)
    
    console.log()
  }

  checkMatch(index: string, roll: number): boolean {
    if (index.includes('-')) {
      const ranges = index.split('-').map(x => +x)
      return ranges[0] <= roll && roll <= ranges[1]
    } else {
      return index === roll.toString()
    }
  }
}
