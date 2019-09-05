export const specificRatingTypesQuery =
  (associatedWith: string): string => `
  {
    ratingTypes(func: eq(type, "RatingType")) @filter(eq(associatedWith, "${ associatedWith }")) {
      uid
      name
      associatedWith
      weightModifier
      type
    }
  }
`
