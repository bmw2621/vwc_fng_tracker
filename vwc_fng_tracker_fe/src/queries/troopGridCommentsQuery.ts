export const troopGridCommentsQuery =
  (personType: string): string => (
  `
    {
      troops(func: eq(personType, "${ personType }")) {
        uid
        comments: hasComment (orderdesc: commentDate) {
          uid
          expand(_all_)
        }
      }
    }
  `
)
