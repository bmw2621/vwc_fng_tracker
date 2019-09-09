export const applicantsQuery = (): string => {
  return `
    {
      applicants(func: type(Applicant)){
        uid
        expand(_all_)
      }
    }
  `
}


