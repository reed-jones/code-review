import Vue from 'vue'

// App entry template
import App from './views/App.vue'

// Vue plugins
import router from './router'
import store from './store'
import modals from './modals'

// restores previously saved auth tokens if needed
// might be nice to have a vuex plugin that auto
// syncs certain modules to sessionStorage instead of
// manually grabbing the values we need
store.dispatch('auth/checkSessionStorageForAuthentication')

// base app element to replace
const el = '#app'

// base render function
const render = h => h(App)

// Vue Configuration Settings
const VueConfig = {
    el,
    router,
    store,
    modals,
    render
}

// instantiate new Vue app
new Vue(VueConfig);
