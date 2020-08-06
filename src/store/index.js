import Vue from 'vue';
import Vuex from 'vuex';

import { getTransactions } from '../services/transactions';

Vue.use(Vuex);

export default new Vuex.Store({
  store: {
    transactions: [],
    error: null,
  },
  actions: {
    GET_TRANSACTIONS: getTransactions,
  },
  mutations: {
    SET_TRANSACTIONS(state, data) {
      state.transactions = data;
    },
    SET_ERROR(state, data) {
      state.error = data;
    },
  },
  getters: {
    transactions(state) {
      return state.transactions;
    },
    error(state) {
      return state.error;
    },
  },
});
