export const troopGridRatingsQuery =
  (personType: string): string => (
  `
    {
      troops(func: eq(personType, "${ personType }")) {
        uid
        ratings: hasRating {
          uid
          expand(_all_)
        }
      }
    }
  `
)
