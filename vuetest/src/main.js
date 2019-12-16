// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {fetch,url} from '@/api'
import '@/api/interceptors'
//import 'element-theme-chalk'
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$fetch = fetch
Vue.prototype._url = url
Vue.component('App1', {template: '<label>123</label>'})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App}
})
