<template>
  <div class="show">
    <h1>{{ msg }}</h1>

    <h2>SHOW</h2>
    <img src="https://ws1.sinaimg.cn/large/a83bb572gy1g18125erxug20go0971df.gif">

  </div>
</template>

<script>
export default {
  name: 'Mshow',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
