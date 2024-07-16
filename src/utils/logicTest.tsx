const isAbecedarian = (str: string): boolean => {
  const regex = /^[a-zA-Z]+$/

  return regex.test(str)
}

export const reverseStringWithSpecialChars = (str: string): string => {
  const arrayOfWords = str.split('')
  let lastArrayIndex = arrayOfWords.length - 1

  for (let i = 0; i < lastArrayIndex; i++) {
    if (!isAbecedarian(arrayOfWords[i])) {
      continue
    }

    while (!isAbecedarian(arrayOfWords[lastArrayIndex])) {
      lastArrayIndex--
    }

    if (i >= lastArrayIndex) {
      break
    }

    const temp = arrayOfWords[i]
    arrayOfWords[i] = arrayOfWords[lastArrayIndex]
    arrayOfWords[lastArrayIndex] = temp
    lastArrayIndex--
  }

  return arrayOfWords.join('')
}
