<template>
  <div>
    <h1>car</h1>

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div v-else>{{ info }}</div>
    </section>
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
      .get("//c1.malu.me/api/stopcar")
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

<style scoped>
</style>
