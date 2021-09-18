// Package imports
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'

// Local imports
import { LogCommand } from './commands/log'
import { DiceCommand } from './commands/dice'
import { TablesCommand } from './commands/tables'
import { QuitCommand } from './commands/quit'
import { CommandBase } from './commands/command-base'
import { SheetsCommand } from './commands/sheets'
import { EntitiesCommand } from './commands/entities'
import { Config } from './config'
import { Entities } from './trpg/entities'
import { ConsoleUtil } from './utils/console-util'

// Main
inquirer.registerPrompt('autocomplete', autocomplete)
const commands = loadCommands()
prompt(commands)

// Functions

function loadCommands(): CommandBase[] {
  const commands: CommandBase[] = []
  commands.push(new LogCommand())
  commands.push(new DiceCommand())
  commands.push(new TablesCommand())
  commands.push(new EntitiesCommand())
  commands.push(new SheetsCommand())
  commands.push(new QuitCommand())
  return commands
}

function prompt(commands: CommandBase[]) {
  const config = Config.read()
  if (config.defaultEntity) {
    const entity = Entities.getEntity(config.defaultEntity)
    ConsoleUtil.logObject(entity)
  }

  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'option',
        message: 'Command:',
        source: filterCommands,
      },
    ])
    .then(selection => handleSelection(commands, selection))
    .catch(error => handleError(error))
}

function filterCommands(answersSoFar: any, input: string) {
  if (!input) {
    return commands
  }
  const fuzzyOptions = { pre: '<', post: '>', extract: (el: CommandBase) => el.name }
  return fuzzy
    .filter(input, commands, fuzzyOptions)
    .map((x) => x.original)
}

function handleSelection(commands: CommandBase[], selection: any) {
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
