export const troopGridAccountsQuery =
  (type: string): string => (
  `
    {
      troops(func: type(Applicant)) {
        uid
        accounts: account {
          uid
          name
          accountType {
            uid
            name
          }
        }
      }
    }
  `
)
