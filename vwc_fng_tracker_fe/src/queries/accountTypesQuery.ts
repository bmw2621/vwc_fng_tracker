export const accountTypesQuery = (): string => {
  return `
    {
      accountTypes(func:eq(type, "account_type")){
        uid
        name
      }
    }
  `
}
