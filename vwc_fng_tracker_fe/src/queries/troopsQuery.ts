export const troopsQuery = (type: string): string => {
  return `
    {
      troops(func: type(${type})) {
        uid
        expand(_all_)
      }
    }
  `
}
