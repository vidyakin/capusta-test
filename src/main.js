import Vue from 'vue';
import axios from 'axios';
import VuexAxios from 'vue-axios';
import App from './App.vue';

import store from './store';

const axiosObj = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
  },
});

Vue.use(VuexAxios, axiosObj);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
