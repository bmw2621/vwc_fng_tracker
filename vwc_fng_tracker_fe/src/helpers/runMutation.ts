import { dgClient } from './dgClient'

export const runMutation = async (data) => {
  dgClient.setDebugMode(true)
  const txn = dgClient.newTxn()
  try {
    const res = await txn.mutate({
      setJson: data,
      commitNow: true
    })
    console.info('Created new record with uid', res.data.uids[0])
  } catch (error) {
    console.error('Database write error.', error)
  } finally {
    await txn.discard()
  }
}
