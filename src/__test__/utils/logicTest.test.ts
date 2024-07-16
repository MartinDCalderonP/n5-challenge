import { reverseStringWithSpecialChars } from '../../utils/logicTest'
import { describe, expect, test } from 'vitest'

describe('reverseStringWithSpecialChars', () => {
  test('first case', () => {
    const input = 'a,b$c'
    const expectedOutput = 'c,b$a'

    const actualOutput = reverseStringWithSpecialChars(input)

    expect(actualOutput).toBe(expectedOutput)
  })

  test('second case', () => {
    const input = 'Ab,c,de!$'
    const expectedOutput = 'ed,c,bA!$'

    const actualOutput = reverseStringWithSpecialChars(input)

    expect(actualOutput).toBe(expectedOutput)
  })
})
