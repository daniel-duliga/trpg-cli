var inquirer = require('inquirer')

class LogCommand {
  name = 'Log'

  execute() {
    return inquirer
      .prompt({
        type: 'input',
        name: 'log',
        message: "Log:",
      })
      .then((answer) => {
        // console.log(answer)
      })
  }
}

module.exports = LogCommand
