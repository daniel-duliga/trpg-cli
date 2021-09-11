import inquirer from "inquirer";
import { ConsoleUtil } from "../utils/console-util";

import { EntitiesUtil } from "../utils/entities-util";
import { SearchUtil } from "../utils/search-util";
import { CommandBase } from "./command-base";

export class EntitiesCommand extends CommandBase {
    name = "🎭 Entities"

    execute(): Promise<boolean> {
        const allEntities = EntitiesUtil.getAllEntities()
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
        const entity = EntitiesUtil.getEntity(entityPath)
        ConsoleUtil.logResult(entity)
        return super.execute()
    }
}