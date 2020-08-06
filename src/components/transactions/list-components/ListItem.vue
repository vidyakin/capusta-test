<template>
  <li class='transaction'>
    <details>
      <summary>
        <div class='order'>{{opType}}: <b>{{transaction.event_id}}</b></div>
        <div class='time'><time :datetime='getTransDate'>{{getTransTime}}</time></div>
        <div class='account'>{{transaction.account_number | cardNumber }}</div>
        <div :class='amountClasses'>{{transaction.amount}}</div>
      </summary>
      <p class='description'>{{transaction.description}}</p>
    </details>
  </li>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      default() {
        return {
          operation: 'no',
        };
      },
    },
  },
  computed: {
    opType() {
      const { event_name, type } = this.transaction;
      if (event_name === 'REFUND') return 'Возврат';
      if (event_name === 'NEW_TRANSACTION') {
        if (type === 'PURCHASE') return 'Заказ';
        if (type === 'PURCHASE_BILL') return 'Счет';
        return 'no';
      }
      return 'no';
    },
    amountClasses() {
      const curr = {
        RUB: 'rubles',
        USD: 'dollars',
        EUR: 'euros',
      };
      const classes = ['amount'];
      classes.push(curr[this.transaction.currency]);
      classes.push(curr[this.transaction.amount > 0 ? 'positive' : 'negative']);
      return classes.join(' ');
    },
    getTransDate() {
      return this.transaction.created_at.substr(0, 16);
    },
    getTransTime() {
      return this.transaction.created_at.substr(11, 5);
    },
  },
  filters: {
    cardNumber(val) {
      const res = [];
      [0, 4, 8, 12].forEach((i) => res.push(val.substr(i, 4)));
      return res.join(' ').replace(/x/g, '*');
    },
  },
};
</script>

<style lang='scss'>
#report {
  ul {
    li {
      position: relative;
      background: #27283C;
      margin-top: 10px;
      padding: 10px;
      &:before {
        width: 40px;
        height: 40px;
        left: 10px;
        top: 16px;
        border-radius: 50%;
        background-color: #24A84D;
      }
      &:after {
        width: 36px;
        height: 36px;
        left: 12px;
        top: 18px;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3207673/credit-card--white.svg);
      }
      summary {
        padding-left: 50px;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
        &::-webkit-details-marker {
          display: none;
        }
      }
      div {
        line-height: 26px;
      }
      p {
        text-align: left;
        color: #587d6c;
      }
      .order {
        order: 1;
        flex-basis: 55%;
        text-align: left;
      }
      .amount {
        order: 2;
        font-size: 18px;
        font-weight: 800;
        flex-basis: 45%;
        text-align: right;
        color: #FFF;
        &.negative {
          color: #D87822;
          &:before {
            content: "- ";
          }
        }
        &.positive {
          color: #39b27c;
          &:before {
            content: "+ ";
          }
        }
        &.rubles:after {
          content: " ₽";
        }
      }
      .time {
        order: 3;
        flex-basis: 30%;
        text-align: left;
      }
      .account {
        order: 4;
        flex-basis: 70%;
        text-align: right;
      }
    }
    .description {
      margin-top: 10px;
      padding-bottom: 10px;
      padding: 10px;
      background-color: #CCC;
      border-radius: 4px;
      overflow: hidden;
      color: #212121;
      div {
        padding: 10px;
        &:first-child {
          background-color: #58B4B4;
        }
      }
      a {
        color: #9B51E0;
      }
    }
  }
}

</style>
