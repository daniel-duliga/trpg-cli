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

    static promptAutocomplete(options: string[]): Promise<string> {
        return inquirer.prompt([{
            type: 'autocomplete',
            name: 'value',
            message: 'Options:',
            source: (answersSoFar: any, input: string) => SearchUtil.fuzzySearchStrings(options, input)
        }]).then((answer) => { return answer.value })
    }
}