import { createStore } from "vuex";
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
    tgUser: {},
    user: {},
    month: null,
    difference: null,
    index: 0,
    operation: null,
    length: 0

  }
  
  const store = createStore({
    state,
    getters,
    actions,
    mutations
  })

export default store;