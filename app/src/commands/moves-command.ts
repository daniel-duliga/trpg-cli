import inquirer from "inquirer";
import { IMove } from "../trpg/interfaces/move";
import { Moves } from "../trpg/moves";
import { ConsoleUtil } from "../utils/console-util";
import { SearchUtil } from "../utils/search-util";
import { BaseCommand } from "./base-command";

export class MovesCommand extends BaseCommand {
    name = "🎮 Moves"

    execute(): Promise<boolean> {
        const allMoves = Moves.getAllMoves()
        return inquirer.prompt([
            {
                type: 'autocomplete',
                name: 'option',
                message: 'Move:',
                source: (answersSoFar: any, input: string) =>
                    SearchUtil.fuzzySearchStrings(allMoves, input)
            },
        ]).then(selection => this.handleSheetSelection(selection.option))
    }

    async handleSheetSelection(movePath: string): Promise<boolean> {
        const move: IMove = await Moves.rollMove(movePath)
        ConsoleUtil.logStringResult(move.Output)
        return super.execute()
    }
}