export const troopGridAccountsQuery =
  (personType: string): string => (
  `
    {
      troops(func: eq(personType, "${ personType }")) {
        uid
        accounts: ownsAccount {
          uid
          expand(_all_)
        }
      }
    }
  `
)
