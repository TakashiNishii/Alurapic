import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
//Esse tem nome diferente por não ser export default que temos em routes.js
import {routes} from './routes';

import './directives/Transform';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';

import 'bootstrap/dist/css/bootstrap.css';

import './assets/css/teste.css';

import './assets/js/teste.js';

import 'bootstrap/dist/js/bootstrap.js';  

Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

// Vue.http.interceptors.push((req, next) => {

//   // é possível colocar informações no header antes do envio da requisição
//   req.headers.set('Authorization', 'informação de segurança aqui');
//   console.log('Lidando com o request');

//   next(res => {
//     console.log('Lidando com a resposta')
//     // é possível acessar os dados da reposta e realizar transformações antes
//     console.log(res.body);
//   });

// });

Vue.use(VueRouter);


//Crio um roteador para ser usado na aplicação:
const router = new VueRouter({ 
  routes,
  mode: 'history' 
});


extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: 'Este campo é obrigatório!'
});

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message:'O campo {_field_} deve possuir no mínimo {min} e no máximo {max} caracteres.'

});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  el: '#app',
  router, //Por ter o mesmo nome posso colocar só um no lugar de `router:router,`
  render: h => h(App)
})
