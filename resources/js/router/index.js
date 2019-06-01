import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const routesReducer = context => [
  (acc, cur) => ([ ...acc, ...context(cur).default ]), []
];
const fileLoader = files=> files.keys().reduce(...routesReducer(files));

const router = new Router({
  routes: fileLoader(require.context('./routes', false, /\.js$/i)),

  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});

// router.beforeResolve((to, from, next) => {
//   if (from.name) {
//     NProgress.start();
//   }
//   next();
// });

// router.afterEach(_ => {
//   NProgress.done();
// });

export default router;
