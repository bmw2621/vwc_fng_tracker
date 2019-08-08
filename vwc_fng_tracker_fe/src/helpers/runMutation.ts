
export function runMutation(mutation: string) {
  const url = `${process.env.REACT_APP_DGRAPH_API_URL}/mutate?timeout=60s` || ''
  const meta = {
    'X-Dgraph-CommitNow': 'true'
  }
  const headers = new Headers(meta)
  return fetch(url, { method: 'post', headers: headers, body: mutation})
}
