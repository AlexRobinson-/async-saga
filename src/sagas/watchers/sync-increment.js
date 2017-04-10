const syncIncrement = async ({ run, dispatch, take, takeEvery }) => {
  await take('START_SYNCING')

  const stopTaking = takeEvery('INCREMENT', () => dispatch({ type: 'INCREMENT_ANOTHER' }))

  await take('STOP_SYNCING')
  stopTaking()

  await run(syncIncrement)
}

export default syncIncrement