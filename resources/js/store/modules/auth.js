


// sub-modules
const defaultTokenState = _ => ({
  access_token: null,
  refresh_token: null,
  isTrusted: null,
  token_type: null,
  expires_at: null,
})
const tokens = {
  namespaced: true,
  state: defaultTokenState(),
  mutations: {
    SET_OR_RESET(state, newState = null) {
      state = Object.assign(state, newState || defaultTokenState())
    }
  }
}

const defaultUserState = _ => ({
  email: null,
  avatar: null,
  name: null,
  nickname: 'test',
})
const user = {
  namespaced: true,
  state: defaultUserState(),
  mutations: {
    SET_OR_RESET(state, newState = null) {
      state = Object.assign(state, newState || defaultUserState())
    }
  },
}

// Base Module
const defaultAuthState = _ => ({
  //
})

const getters = {
  //
}

const mutations = {

}
// let types = Object.entries(mutations).reduce((acc, [key, value]) => ({ ...acc, [key]: key }), {})

const actions = {
  setAuthTokens({ commit }, tokens) {
    commit('tokens/SET_OR_RESET', tokens)
    sessionStorage.setItem('auth.tokens', JSON.stringify(tokens));
  },

  setUserDetails({ commit }, user) {

    commit('user/SET_OR_RESET', user)
  },

  checkSessionStorageForAuthentication({ commit }) {
    let tokens = sessionStorage.getItem('auth.tokens');
    if(tokens) {
      commit('tokens/SET_OR_RESET', JSON.parse(tokens))
    }
  },

  logout({ commit }) {
    commit('tokens/SET_OR_RESET')
    commit('user/SET_OR_RESET')
    sessionStorage.clear()
  }
}

export default {
  namespaced: true,
  state: defaultAuthState(),
  getters,
  mutations,
  actions,
  modules: {
    tokens,
    user
  }
}