/* eslint-disable import/prefer-default-export */
import Vue from 'vue';

export const getTransactions = (context) => Vue.axios
  .get('/transactions/page/1').then((data) => {
    if (data.status === 200) {
      context.commit('SET_TRANSACTIONS', data.data.result);
    } else {
      context.commit('SET_ERROR', `Ошибка загрузки: код ${data.status}`);
    }
  });
