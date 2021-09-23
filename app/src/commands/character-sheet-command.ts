import { Config } from "../config";
import { Entities } from "../trpg/entities";
import { ConsoleUtil } from "../utils/console-util";
import { BaseCommand } from "./base-command";

export class CharacterSheetCommand extends BaseCommand {
    name = '🌟 Character Sheet'

    execute(): Promise<boolean> {
        const config = Config.read()
        if (config.defaultEntity) {
            const entity = Entities.getEntity(config.defaultEntity)
            ConsoleUtil.logObjectResult(entity)
        }
        return super.execute()
    }
}