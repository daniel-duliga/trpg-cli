import inquirer from "inquirer"
import { SearchUtil } from "../utils/search-util"

export class PromptService {
    static promptInput(message: string): Promise<any> {
        return inquirer.prompt([{
            type: 'input',
            name: 'value',
            message: `${message}:`
        }]).then((answer) => {
            return answer.value
        })
    }

    static promptAutocomplete(message: string, options: string[]): Promise<string> {
        console.log()
        return inquirer.prompt([{
            type: 'autocomplete',
            name: 'value',
            message: `${message}:`,
            source: (answersSoFar: any, input: string) => SearchUtil.fuzzySearchStrings(options, input)
        }]).then((answer) => { return answer.value })
    }
}