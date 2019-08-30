export const troopsQuery = (personType: string): string => {
  return `
    {
      troops(func: eq(personType, "${personType}")){
        uid
        expand(_all_)
      }
    }
  `
}
