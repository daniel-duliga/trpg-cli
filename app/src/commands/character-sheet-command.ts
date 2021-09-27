import { CharacterSheet } from "../trpg/character-sheet";
import { ConsoleUtil } from "../utils/console-util";
import { BaseCommand } from "./base-command";

export class CharacterSheetCommand extends BaseCommand {
    name = '🌟 Character Sheet'

    execute(): Promise<boolean> {
        const characterSheet = CharacterSheet.getCharacterSheet()
        ConsoleUtil.logObjectResult(characterSheet)
        return super.execute()
    }
}