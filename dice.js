const { valueIsPositiveNumber } = require('./utilities')

const rollNSidedDiceOnce = sides => Math.floor((Math.random() * sides) + 1)

const roll = (diceAmount, diceSides) => {
  if (!valueIsPositiveNumber(diceAmount) || !valueIsPositiveNumber(diceSides)) {
    return []
  }

  const results = []
  for (let index = 0; index < diceAmount; index++) {
    results.push(rollNSidedDiceOnce(diceSides))
  }
  return results
}

module.exports = { roll }
