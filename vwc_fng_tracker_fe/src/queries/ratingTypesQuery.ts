export const ratingTypesQuery = () => `
  {
    ratingTypes(func: eq(type, "RatingType")) {
      uid
      name
      associatedWith
      weightModifier
      type
    }
  }
`
