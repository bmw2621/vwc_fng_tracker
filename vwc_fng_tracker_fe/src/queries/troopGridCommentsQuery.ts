export const troopGridCommentsQuery =
  (type: string): string => (
  `
    {
      troops(func: type(Applicant)) {
        uid
        comments: comment (orderdesc: commentDate) {
          uid
          author
          commentDate
          text
          edited
        }
      }
    }
  `
)
