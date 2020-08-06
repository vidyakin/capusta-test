<template>
  <div class="items">
    <template v-if="loaded">
      <div v-for="(trans, date) in transactionsByDate" :key="date">
        <div>
          <span>{{date}}</span>
        </div>
        <ul>
          <ListItem v-for="transaction in trans"
            :key='transaction.event_id'
            :transaction='transaction'
          />
        </ul>
      </div>
    </template>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
// import dayjs from 'dayjs';

import { mapGetters } from 'vuex';
import ListItem from './list-components/ListItem.vue';

/**
 * Функция определяющая по дате это сегодня, вчера или просто дата
 */
function dateFromNow() {
  const now = new Date();
  now.setHours(0);
  return (d) => {
    const date = new Date(d);
    date.setHours(0);
    if (date === now) return 'Сегодня';
    if (now - date < 24 * 3600 * 1000) return 'Вчера';
    return d;
  };
}

/**
 * Группировка по дате
 */
const groupBy = (arr) => {
  const res = {};
  const toWord = dateFromNow();
  arr.forEach((el) => {
    const date = toWord(el.created_at.substr(0, 10));
    if (res[date] === undefined) res[date] = [];
    res[date].push(el);
  });
  return res;
};

export default {
  components: {
    ListItem,
  },
  computed: {
    ...mapGetters(['transactions']),
    transactionsByDate() {
      return groupBy(this.transactions);
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  beforeMount() {
    this.$store.dispatch('GET_TRANSACTIONS').then(() => {
      setTimeout(() => {
        this.loaded = true;
      }, 1000);
    });
  },
};
</script>

<style lang="scss">
#report .items {
  div > div {
    padding: 0 10px;
    text-align: left;
    color: #848497;
  }
  & ul li:before,
  & ul li:after {
    content: "";
    position: absolute;
  }
}
</style>
