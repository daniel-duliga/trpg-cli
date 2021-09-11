import fuzzy from 'fuzzy'

export class SearchUtil {
  static fuzzySearchStrings(data: string[], input: string): string[] {
    if (!input) {
      return data
    } else {
      input = input.replace(/ /g, '')
      const fuzzyOptions = {
        pre: '<',
        post: '>',
      }
      const results = fuzzy.filter(input, data, fuzzyOptions)
      return results.map((x) => x.original)
    }
  }
}