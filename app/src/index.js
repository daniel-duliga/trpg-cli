const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')
const fuzzy = require('fuzzy')

const LogCommand = require('./commands/log')
const RollDiceCommand = require('./commands/roll-dice')
const QuitCommand = require('./commands/quit')

inquirer.registerPrompt('autocomplete', autocomplete)
let commands = loadCommands()
prompt(commands)

function loadCommands() {
  let commands = []
  commands.push(new LogCommand())
  commands.push(new RollDiceCommand())
  commands.push(new QuitCommand())
  return commands
}

function prompt(commands) {
  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'option',
        message: 'Commands:',
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
    return results.map(x => x.original)
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
