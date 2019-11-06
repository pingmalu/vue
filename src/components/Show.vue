<template>
  <div class="m-show">
    <SiteTree class="sitetree"></SiteTree>
    <SiteTable class="sitetable"></SiteTable>
  </div>
</template>
 
<script>
var routes = {};
let routes_arr = new Set();

routes_arr.add("SiteTable");
routes_arr.add("SiteTree");

routes_arr.forEach(v => {
  routes[v] = require("@/components/demo/" + v).default;
});

export default {
  components: routes
};
</script>

<style lang="scss" scoped>
.m-show {
  display:flex;
  margin: 0 auto;
  justify-content: center;
  flex-wrap: wrap;
  align-items: end;
  .sitetree {
    margin-right: 5%;
  }
}
.sitetree {
  margin-top: 23px;
}
</style>
