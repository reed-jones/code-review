import Axios from "axios";

const state = {
  // maybe tokens & user should be split up into nested modules (auth.tokens.access_token etc)
  tokens: {
    access_token: null,
    refresh_token: null,
    token_type: null,
    expires_at: null,
  },
  user: {
    email: null,
    avatar: null,
    name: null,
    nickname: null,
  }
}

const getters = {
  //
}

const mutations = {
  SET_AUTH_TOKENS(state, tokens) {
    Object.assign(state.tokens, tokens)
  },
  SET_USER_DETAILS (state, user) {
    Object.assign(state.user, user)
  }
}


let types = Object.entries(mutations).reduce((acc, [key, value]) => ({ ...acc, [key]: key }), {})

const actions = {
  async login({}, { provider }) {
    let { data } = await Axios.get(`/api/auth/redirect/${provider}`)
  },

  setAuthTokens({ commit }, tokens) {
    commit(types.SET_AUTH_TOKENS, tokens)
  },

  setUserDetails({ commit }, user) {

    commit(types.SET_USER_DETAILS, user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}