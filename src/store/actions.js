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

  export const SET_OPERATION = ({commit}, operation) => {
    commit("SET_OPERATION", operation)
  }

  export const REMOVE_OPERATION = ({commit}) => {
    commit("REMOVE_OPERATION")
  }

  export const SET_LENGHT_OPERATION = ({commit}, length) => {
    commit("SET_LENGHT_OPERATION", length)
  }

  export const SET_CURRENT_MONEYBOX = ({commit}, moneybox) => {
    commit("SET_CURRENT_MONEYBOX", moneybox)
  }


  export const UPDATE_MONEYBOX_CURRENT_BALANCE = ({commit}, balance) => {
    commit("UPDATE_MONEYBOX_CURRENT_BALANCE", balance)
  }

  export const SET_INCOME_AND_EXPENSE_OPERATIONS = ({commit}, incomeOperations, expenseOperations) => {
    commit("SET_INCOME_AND_EXPENSE_OPERATIONS", incomeOperations, expenseOperations)
  }