import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
FastClick.attach(document.body);

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading:require('./assets/img/common/placeholder.png')
})

import Toast from 'components/common/toast'
Vue.use(Toast);

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
