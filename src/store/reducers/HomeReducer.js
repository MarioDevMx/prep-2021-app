const INITIAL_STATE = {
  name: 'John Doe',
  Age: 23,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
}