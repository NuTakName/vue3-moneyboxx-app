import { getUser } from "@/api/user";

  export const SET_TG_USER = ({commit}, user) => {
    commit('SET_TG_USER', user);
  }

  export const SET_USER = async({commit}, userId) => {
    const user = await getUser(userId)
    commit('SET_USER', user);
  }