import inquirer from "inquirer";

export class PromptService {
    static promptInput(message: string): Promise<any> {
        return inquirer.prompt([{
            type: 'input',
            name: 'input',
            message: message
        }]).then((answer) => {
            return answer.input
        });
    }
}