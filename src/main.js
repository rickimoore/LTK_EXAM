import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    files: null
  },
  mutations: {
    storeFiles (state, payload) {
      state.files = payload.files;
    },
    clearFiles(state) {
      state.files = null;
    }
  }
})


import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
