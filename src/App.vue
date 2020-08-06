<template>
  <div id="app">
    <div id='report'>
      <TransactionList />
    </div>
  </div>
</template>

<script>
import TransactionList from './components/transactions/TransactionList.vue';

export default {
  name: 'App',
  components: {
    TransactionList,
  },
  data() {
    return {
      operations: [],
    };
  },
  created() {
    // fetch
  },
};
</script>

<style lang='scss'>

#report {
  margin: 40px 0;
}

</style>
