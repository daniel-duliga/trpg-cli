// Package imports

import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'

// Local imports

import LogCommand from './commands/log.js'
import RollDiceCommand from './commands/roll-dice.js'
import RollTableCommand from './commands/roll-table.js'
import QuitCommand from './commands/quit.js'

// Main

inquirer.registerPrompt('autocomplete', autocomplete)
let commands = loadCommands()
prompt(commands)

// Functions

function loadCommands() {
  let commands = []
  commands.push(new LogCommand())
  commands.push(new RollDiceCommand())
  commands.push(new RollTableCommand())
  commands.push(new QuitCommand())
  return commands
}

function prompt(commands) {
  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'option',
        message: 'Command:',
        source: filterCommands,
      },
    ])
    .then((selection) => {
      handlePromptSelection(commands, selection)
    })
    .catch((error) => {
      handlePromptError(error)
    })
}

function filterCommands(answersSoFar, input) {
  if (!input) {
    return commands
  } else {
    var fuzzyOptions = {
      pre: '<',
      post: '>',
      extract: function (el) {
        return el.name
      },
    }
    var results = fuzzy.filter(input, commands, fuzzyOptions)
    return results.map((x) => x.original)
  }
}

function handlePromptSelection(commands, selection) {
  const command = commands.find((x) => x.name === selection.option)
  if (command) {
    command.execute().then((resp) => {
      console.log()
      prompt(commands)
    })
  }
}

function handlePromptError(error) {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    console.log('Error: ', error)
  }
}
