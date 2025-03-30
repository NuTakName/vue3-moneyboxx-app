  export const SET_TG_USER = ({commit}, user) => {
    commit('SET_TG_USER', user);
  }

  export const SET_USER = async({commit}, user) => {
    commit('SET_USER', user);
  }

  export const UPDATE_OPERATIONS = ({commit}, operation) => {
    commit("UPDATE_OPERATIONS", operation)
  }
