const { parse } = require('../parser')

test('An empty string does almost nothing', () => {
  const rootNode = parse('')
  expect(rootNode.run()).toEqual({expression: '', rolls: [], result: 0})
})

test('Numbers result in themselves', () => {
  const rootNode = parse('42')
  expect(rootNode.run()).toEqual({expression: '42', rolls: [], result: 42})
})
