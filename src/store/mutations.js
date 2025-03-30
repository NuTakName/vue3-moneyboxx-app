
export const SET_TG_USER = (state, user) => {
  state.tgUser = user;
}

export const SET_USER = (state, user) => {
  state.user = user;
}


export const UPDATE_OPERATIONS = (state, operation) => {
  if (operation === Array) {
    state.operations = operation
  } else {
    state.operations = []
    state.operations.push(operation)
  }
}