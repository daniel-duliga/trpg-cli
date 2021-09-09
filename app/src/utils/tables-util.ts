import fs from 'fs';
import parse from 'csv-parse/lib/sync'

import { FileUtil } from './file-util'
import { DiceUtil } from './dice-util';

const tablesBasePath = 'app/data/tables'
const csvExtension = '.csv'

export class TableUtil {
    static getAllTables(): string[] {
        let allTables = FileUtil.walk(tablesBasePath)
        allTables = allTables.map((x) =>
            x.replace(`${tablesBasePath}/`, '').replace(csvExtension, ''),
        )
        return allTables
    }

    static rollOnTable(path: string): string {
        const table = this.getTable(path)
        const max = TableUtil.getMaxIndex(table);
        const roll = DiceUtil.rollDice(1, max)
        const result = table.find((x: any[]) => this.checkMatch(x[0], roll.value))[1]
        return result
    }

    private static getTable(path: string): any {
        const file = fs
            .readFileSync(`${tablesBasePath}/${path}${csvExtension}`)
            .toString()
        return parse(file)
    }

    private static getMaxIndex(table: any) {
        let max = table[table.length - 1][0];
        if (max.includes('-')) {
            max = max.split('-')[1];
        }
        if (max === '00') {
            max = 100;
        } else {
            max = +max;
        }
        return max;
    }

    private static checkMatch(index: string, roll: number): boolean {
        if (index.includes('-')) {
            const ranges = index.split('-').map(x => +x)
            return ranges[0] <= roll && roll <= ranges[1]
        } else {
            return index === roll.toString()
        }
    }
}

