import inquirer from "inquirer"

import { CommandBase } from "./command-base"
import { Entities } from "../trpg/entities"
import { ConsoleUtil } from "../utils/console-util"
import { SearchUtil } from "../utils/search-util"
import { Config } from "../config"

export class EntitiesCommand extends CommandBase {
    name = "🎭 Entities"

    execute(): Promise<boolean> {
        const allEntities = Entities.getAllEntities()
        return inquirer
            .prompt([
                {
                    type: 'autocomplete',
                    name: 'value',
                    message: 'Entity:',
                    source: (answersSoFar: any, input: string) =>
                        SearchUtil.fuzzySearchStrings(allEntities, input)
                },
            ])
            .then(selection => this.handleSelection(selection.value))
    }

    handleSelection(entityPath: string): Promise<boolean> {
        const entity = Entities.getEntity(entityPath)
        ConsoleUtil.logObjectResult(entity)
        console.log()
        return inquirer
            .prompt([
                {
                    type: 'autocomplete',
                    name: 'value',
                    message: 'Options:',
                    source: (answersSoFar: any, input: string) => 
                        SearchUtil.fuzzySearchStrings(['Set as default', 'Back'], input)
                },
            ])
            .then(selection => this.handleOption(selection.value, entityPath))
    }

    handleOption(option: string, entityPath: string): Promise<boolean> {
        switch (option) {
            case 'Set as default': {
                const config = Config.read()
                config.defaultEntity = entityPath
                Config.write(config)
                break
            }
            default: {
                break
            }
        }
        return super.execute()
    }
}