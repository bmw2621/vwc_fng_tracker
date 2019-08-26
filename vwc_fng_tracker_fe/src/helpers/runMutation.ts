import { dgClient } from './dgClient'

export const runMutation = async (data) => {
  const txn = dgClient.newTxn()
  try {
    const retUid = await txn.mutate({
      setJson: data,
      commitNow: true
    })
    .then((res) => {
      const uid = res.data.uids.uid
      console.info('Saved record with uid', uid)
      return uid
    })

    return retUid
  } catch (error) {
    console.error('Database write error.', error)
  } finally {
    await txn.discard()
  }
}
