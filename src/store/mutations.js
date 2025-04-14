
export const SET_TG_USER = (state, user) => {
  state.tgUser = user;
}

export const SET_USER = (state, user) => {
  state.user = user;
}

export const SET_CURRENT_MONTH = (state, month) => {
  state.month = month;
}

export const SET_DIFFERENCE = (state, value) => {
  state.difference = value
}

export const SET_INDEX = (state, index) => {
  state.index = index
}

export const SET_OPERATION = (state, operation) => {
  state.operation = operation
}

export const REMOVE_OPERATION = (state) => {
  state.operation = null
}

export const SET_LENGHT_OPERATION = (state, length) => {
  state.length = length
}


export const SET_CURRENT_MONEYBOX = (state, moneybox) => {
  state.moneybox = moneybox
}

export const UPDATE_MONEYBOX_CURRENT_BALANCE = (state, balance) => {
  state.moneybox.current_balance = balance 
}

export const SET_INCOME_AND_EXPENSE_OPERATIONS = (state, incomeOperations, expenseOperations) => {
  state.incomeOperations = incomeOperations
  state.expenseOperations = expenseOperations
}