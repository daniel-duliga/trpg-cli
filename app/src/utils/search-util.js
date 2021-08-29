import fuzzy from 'fuzzy'

export function fuzzySearchStrings(data, input) {
    if (!input) {
      return data
    } else {
      var fuzzyOptions = {
        pre: '<',
        post: '>',
      }
      var results = fuzzy.filter(input, data, fuzzyOptions)
      return results.map((x) => x.original)
    }
  }