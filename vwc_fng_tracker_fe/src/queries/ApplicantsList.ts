export function getApplicantsList(): string {
  return `
    {
  applicants(func: eq(personType, "applicant")){
    uid
    expand(_all_)
  }
}
  `
}


