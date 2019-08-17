import { dgClient } from './dgClient'

export const runDelete = async (data) => {
  const txn = dgClient.newTxn()
  try {
    const res = await txn.mutate({
      deleteJson: data,
      commitNow: true
    })
    return res.data
  } catch (error) {
  } finally {
    await txn.discard()
  }
}
