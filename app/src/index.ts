// Package imports
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'

// Local imports
import { LogCommand } from './commands/log-command'
import { DiceCommand } from './commands/dice-command'
import { TablesCommand } from './commands/tables-command'
import { QuitCommand } from './commands/quit-command'
import { BaseCommand } from './commands/base-command'
import { SheetsCommand } from './commands/sheets-command'
import { EntitiesCommand } from './commands/entities-command'
import { CharacterSheetCommand } from './commands/character-sheet-command'
import { MovesCommand } from './commands/moves-command'

// Main
inquirer.registerPrompt('autocomplete', autocomplete)
const commands = loadCommands()
prompt(commands)

// Functions

function loadCommands(): BaseCommand[] {
  return [
    new LogCommand(),
    new CharacterSheetCommand(),
    new MovesCommand(),
    new DiceCommand(),
    new TablesCommand(),
    new SheetsCommand(),
    new EntitiesCommand(),
    new QuitCommand(),
  ]
}

function prompt(commands: BaseCommand[]) {
  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'option',
        message: 'Command:',
        source: filterCommands,
        pageSize: 10
      },
    ])
    .then(selection => handleSelection(commands, selection))
    .catch(error => handleError(error))
}

function filterCommands(answersSoFar: any, input: string) {
  if (!input) {
    return commands
  }
  const fuzzyOptions = { pre: '<', post: '>', extract: (el: BaseCommand) => el.name }
  return fuzzy
    .filter(input, commands, fuzzyOptions)
    .map((x) => x.original)
}

function handleSelection(commands: BaseCommand[], selection: any) {
  const command = commands.find((x) => x.name === selection.option)
  if (command) {
    command.execute().then(() => {
      console.log()
      prompt(commands)
    })
  }
}

function handleError(error: any) {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    console.log('Error: ', error)
  }
}
