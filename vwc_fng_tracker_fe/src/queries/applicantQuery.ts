export function applicantQuery(uid: string): string {
  return `
    {
      applicant(func:uid(${uid})) {
        uid
        firstName
        lastName
        email
        phoneNumber
        dateJoined
        accounts: ownsAccount {
          uid
          name
          type
        }
      }
    }
  `
}

