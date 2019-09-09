export const ratingTypesQuery = () => `
  {
    ratingTypes(func: type(RatingType)) {
      uid
      name
      weightModifier
    }
  }
`
