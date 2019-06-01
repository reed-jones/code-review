import Vue from 'vue';
import Vuex, { Store, fileLoader } from 'VuexMerge';
Vue.use(Vuex);

export default new Store.mergeState(
  window.__INITIAL_STATE__,
  {
    // automatically import all files in modules folder as vuex modules.
    // to load the files require.context must match the format laid out here:
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    modules: fileLoader(require.context('./modules', false, /\.js$/i))
  }
);

