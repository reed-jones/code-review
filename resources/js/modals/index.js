import Vue from 'vue';
import VueModals, { Modals } from 'Vuem';
import 'Vuem/dist/vue-modals.css'
Vue.use(VueModals);

// available modal identifiers
const modalNamespace = 'code-review/modals';
export const modals = {
  LOGIN_MODAL: `${modalNamespace}/LoginModal`
};

// modal component instances
export default new Modals({
  modals: {
    [modals.LOGIN_MODAL]: _ => import(/* webpackChunkName: "chunks/modals.auth" */ './modals/Auth/LoginModal')
  }
});

