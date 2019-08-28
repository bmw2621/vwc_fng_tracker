export const applicantQuery = (uid: string): string => {
  return `
    {
      applicant(func:uid(${uid})) {
        uid
        firstName
        lastName
        email
        phoneNumber
        dateJoined
        active
        personType
        accounts: ownsAccount {
          uid
          name
          type
        }
        comments: hasComment {
          uid
          commenterName
          commentDate
          edited
          text
        }
        completedTasks: hasCompletedTask {
          uid
          expand(_all_)
        }
        ratings: hasRating {
          uid
          expand(_all_)
        }
      }
    }
  `
}

