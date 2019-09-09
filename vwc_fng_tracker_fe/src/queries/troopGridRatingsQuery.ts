export const troopGridRatingsQuery =
  (type: string): string => (
  `
    {
      troops(func: type(${ type })) {
        uid
        ratings: rating {
          uid
          expand(_all_)
        }
      }
    }
  `
)
