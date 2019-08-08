
export function runQuery(query: string) {
  const url = `${process.env.REACT_APP_DGRAPH_API_URL}/query?debug=true&timeout=60s` || ''
  return fetch(url, { method: 'post', body: query})
}
