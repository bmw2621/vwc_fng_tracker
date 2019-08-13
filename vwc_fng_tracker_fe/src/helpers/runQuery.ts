import { dgClient } from './dgClient'

export const runQuery = async (query) => {
  const res =
    await dgClient.newTxn().query(query)
  return res.data
}
