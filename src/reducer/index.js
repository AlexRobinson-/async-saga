export default (state = { count: 0, anotherCount: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'INCREMENT_ANOTHER':
      return { ...state, anotherCount: state.anotherCount + 1 };
    default:
      return state;
  }
}