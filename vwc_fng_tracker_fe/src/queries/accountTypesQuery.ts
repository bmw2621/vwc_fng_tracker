export const accountTypesQuery = (): string => {
  return `
    {
      accountTypes(func: type(AccountType)){
        uid
        name
      }
    }
  `
}
