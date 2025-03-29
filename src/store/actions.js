import { getUser } from "@/api/user";
import { getOperations } from "@/api/operations";

  export const SET_TG_USER = ({commit}, user) => {
    commit('SET_TG_USER', user);
  }

  export const SET_USER = async({commit}, user) => {
    commit('SET_USER', user);
  }

  export const SET_OPERATIONS = async({commit}, currentBudget) => {
    const operations = await getOperations(currentBudget)
    commit("SET_OPERATIONS", operations)
  }