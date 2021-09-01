import YAML from 'yaml'
import fs from 'fs'

import { rollDiceFormula } from '../../utils/dice-util'

const rollCommand = '$roll_dice'

const sheet = fs.readFileSync('app/src/experiments/sheets/sheet.yml', 'utf-8')
const parsedSheet = YAML.parse(sheet)
for (const prop in parsedSheet) {
    const propValue = parsedSheet[prop]
    if (propValue.startsWith(rollCommand)) {
        let rollFormula = propValue.replace(rollCommand, '')
        rollFormula = rollFormula.slice(1, rollFormula.length - 1)
        const roll = rollDiceFormula(rollFormula)
        parsedSheet[prop] = roll.value
        continue
    }
}

console.log(parsedSheet)