export const troopGridCommentsQuery =
  (type: string): string => (
  `
    {
      troops(func: type(${ type })) {
        uid
        comments: comment (orderdesc: commentDate) {
          uid
          expand(_all_)
        }
      }
    }
  `
)
