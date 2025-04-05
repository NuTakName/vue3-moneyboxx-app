  export const SET_TG_USER = ({commit}, user) => {
    commit('SET_TG_USER', user);
  }

  export const SET_USER = async({commit}, user) => {
    commit('SET_USER', user);
  }

  export const SET_CURRENT_MONTH = ({commit}, month) => {
    commit("SET_CURRENT_MONTH", month)
  }


  export const SET_DIFFERENCE = ({commit}, value) => {
    commit("SET_DIFFERENCE", value)
  }

  export const SET_INDEX = ({commit}, index) => {
    commit("SET_INDEX", index)
  }