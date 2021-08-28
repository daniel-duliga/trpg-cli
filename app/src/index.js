// Package imports

import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import stripAnsi from 'strip-ansi'
import fs from 'fs'

// Local imports

import LogCommand from './commands/log.js'
import RollDiceCommand from './commands/roll-dice.js'
import QuitCommand from './commands/quit.js'

// Main

capture_stdout()
inquirer.registerPrompt('autocomplete', autocomplete)
let commands = loadCommands()
prompt(commands)

// Functions

function capture_stdout() {
  const filePath = './log.txt'

  var log_file = fs.createWriteStream(filePath, { flags: 'w' })

  hook_stream(process.stdout, write_data)

  function hook_stream(stream, callback) {
    var old_write = stream.write

    stream.write = (function (write) {
      return function (string, encoding, fd) {
        write.apply(stream, arguments) // comments this line if you don't want output in the console
        callback(string, encoding, fd)
      }
    })(stream.write)

    return function () {
      stream.write = old_write
    }
  }

  function write_data(data, encoding) {
    data = stripAnsi(data)
    if(data === '') {
      return
    }
    data += '\n'
    // let existingData = fs.readFileSync(filePath).toString()
    log_file.write(data)
  }
}

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
        message: 'Command:',
        source: filterCommands,
      },
    ])
    .then((selection) => {
      handlePromptSelection(commands, selection)
      // unhook_stdout()
      // unhook_stderr()
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
