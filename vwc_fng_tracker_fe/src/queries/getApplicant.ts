export function getApplicant(uid: string): string {
  return `
    {
      applicant(func:uid(${uid})) {
        uid
        firstName
        lastName
        email
        accounts: ownsAccount {
          name
          type
        }
      }
    }
  `
}

