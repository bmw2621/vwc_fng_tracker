export function getApplicantsList(): string {
  return `
    {
      applicants(func:allOfTerms(personType, "applicant")) {
        uid
        firstName
        lastName
        email
      }
    }
  `
}


