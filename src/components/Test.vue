<template>
  <div class="hello">
    <div id="bitcoin">
      <h1>car</h1>

      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <div v-else>{{ info }}</div>
      </section>
    </div>
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
      errored: false
    };
  },
  mounted() {
    axios
      .get("http://c1.malu.me/api/stopcar")
      .then(response => {
        this.info = response.data.data;
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
#bitcoin {
  margin-top: 20px;
  /* width: 300px; */
  padding: 0 40px 40px;
  /* background: #2F242C; */
  border-radius: 5px;
  color: #b3bfb8;
}
</style>
