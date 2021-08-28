import inquirer from 'inquirer'

export default class LogCommand {
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
