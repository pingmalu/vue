<template>
  <div class="hello">
    <div id="bitcoin">
      <h1>实时比特币价格指数</h1>

      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <div v-else v-for="currency in info" :key="currency.value" class="currency">
          {{ currency.code | tochinese }}:
          <span class="lighten">{{ currency.rate_float | currencydecimal }}</span>
        </div>
      </section>
    </div>
    <!-- <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      msg: "Welcome to Your Vue.js App"
    };
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
    tochinese(value) {
      switch (value) {
        case "USD":
          return "美元";
        case "GBP":
          return "英镑";
        case "EUR":
          return "欧元";
      }
    }
  },
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => {
        this.info = response.data.bpi;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#bitcoin{
      margin-top: 20px;
    /* width: 300px; */
    padding: 0 40px 40px;
    /* background: #2F242C; */
    border-radius: 5px;
    color: #B3BFB8;
}
</style>
