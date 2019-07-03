
export function runQuery(query: string) {
  const url = process.env.REACT_APP_DGRAPH_API_URL || '';
  return fetch(url, { method: 'post', body: query})
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
}
