import inquirer from "inquirer"

import { CommandBase } from "./command-base"
import { Entities } from "../trpg/entities"
import { ConsoleUtil } from "../utils/console-util"
import { SearchUtil } from "../utils/search-util"

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
                    source: (answersSoFar: any, input: string) => SearchUtil.fuzzySearchStrings(allEntities, input)
                },
            ])
            .then(selection => this.handleSheetSelection(selection.value))
    }

    handleSheetSelection(entityPath: string): Promise<boolean> {
        const entity = Entities.getEntity(entityPath)
        ConsoleUtil.logObjectResult(entity)
        return super.execute()
    }
}