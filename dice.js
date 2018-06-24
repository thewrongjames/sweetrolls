const diceSides = [2, 3, 4, 6, 8, 10, 12, 20]
const validDiceTypes = diceSides.map(sides => 'd' + sides)

const getDiceSides = diceType => diceSides[validDiceTypes.indexOf(diceType)]
const rollNSidedDiceOnce = sides => Math.floor((Math.random() * sides) + 1)

const roll = (diceAmount, diceType) => {
  const results = []
  for (let index = 0; index < diceAmount; index++) {
    results.push(rollNSidedDiceOnce(getDiceSides(diceType)))
  }
  return results
}

module.exports = {validDiceTypes: validDiceTypes, roll: roll}
