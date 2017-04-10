import delay from './delay';

export const asyncIncrement = async ({ dispatch }) => {
  await delay(5000)
  await dispatch({ type: 'INCREMENT' })
}