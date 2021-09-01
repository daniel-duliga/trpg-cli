// Package imports
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'

// Local imports
import { LogCommand } from './commands/log'
import { RollDiceCommand } from './commands/roll-dice'
import { RollTableCommand } from './commands/roll-table'
import { QuitCommand } from './commands/quit'
import { CommandBase } from './commands/base-command'

// Main
inquirer.registerPrompt('autocomplete', autocomplete)
const commands = loadCommands()
prompt(commands)

// Functions

function loadCommands(): CommandBase[] {
  const commands: CommandBase[] = []
  commands.push(new LogCommand())
  commands.push(new RollDiceCommand())
  commands.push(new RollTableCommand())
  commands.push(new QuitCommand())
  return commands
}

function prompt(commands: CommandBase[]) {
  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'option',
        message: 'Command:',
        source: filterCommands,
      },
    ])
    .then(selection => handlePromptSelection(commands, selection))
    .catch(error => handlePromptError(error))
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

function handlePromptSelection(commands: CommandBase[], selection: any) {
  const command = commands.find((x) => x.name === selection.option)
  if (command) {
    command.execute().then(() => {
      console.log()
      prompt(commands)
    })
  }
}

function handlePromptError(error: any) {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    console.log('Error: ', error)
  }
}
