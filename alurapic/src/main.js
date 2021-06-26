import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
//Esse tem nome diferente por não ser export default que temos em routes.js
import {routes} from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);

//Crio um roteador para ser usado na aplicação:
const router = new VueRouter({ 
  routes,
  mode: 'history' 
});


new Vue({
  el: '#app',
  router, //Por ter o mesmo nome posso colocar só um no lugar de `router:router,`
  render: h => h(App)
})
