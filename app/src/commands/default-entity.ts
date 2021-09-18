import { Config } from "../config";
import { Entities } from "../trpg/entities";
import { ConsoleUtil } from "../utils/console-util";
import { CommandBase } from "./command-base";

export class DefaultEntityCommand extends CommandBase {
    name = '🌟 View Default Entity'

    execute(): Promise<boolean> {
        const config = Config.read()
        if (config.defaultEntity) {
            const entity = Entities.getEntity(config.defaultEntity)
            ConsoleUtil.logObjectResult(entity)
        }
        return super.execute()
    }
}