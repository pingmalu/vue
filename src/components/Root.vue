<template>
  <div class="root">
    <d4d0 class="d2" :style="{width: '820px'}"></d4d0>
    <d1d0 class="d6"></d1d0>
    <d3d0 class="d1"></d3d0>
    <d2d1 class="d3"></d2d1>
    <!-- <d3d1 class="d4"></d3d1> -->
    <d2d0 class="d5"></d2d0>
    <d2d3 class="d2d3" :url="url1"></d2d3>
    <d2d3 class="d2d3" :url="url2"></d2d3>
    <d2d3 class="d2d3" :url="url3"></d2d3>
    <d2d2 class="d4" :style="{width: '720px'}"></d2d2>
  </div>
</template>
 
<script>
// import d1d0 from "@/components/d1d0";
// import d2d0 from "@/components/d2d0";
// import d3d0 from "@/components/d3d0";
// import d4d0 from "@/components/d4d0";
// import d2d1 from "@/components/d2d1";
// import d3d1 from "@/components/d3d1";
// import d2d2 from "@/components/d2d2";
// import d2d3 from "@/components/d2d3";
var routes = {};
let routes_arr = new Set();
routes_arr.add('d1d0');
routes_arr.add('d2d0');
routes_arr.add('d3d0');
routes_arr.add('d4d0');
routes_arr.add('d2d1');
routes_arr.add('d2d2');
routes_arr.add('d2d3');
routes_arr.add('d3d1');
// routes_arr.add('d3d2');
routes_arr.forEach(v => {
  routes[v] = require('@/components/demo/' + v).default;
});
console.log(routes);
export default {
    data() {
    return {
      url1: "//c1.malu.me/api/loglist",
      url2: "//c1.malu.me/api/loglist/ssh",
      url3: "//c1.malu.me/api/loglist/d",
    };
  },
  components: routes
};
</script>
<style scoped>
.root {
  width: 100%;
  /* max-width: 1140px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
/* @media only screen and (min-width: 767px) {
  .root {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}

@media only screen and (max-width: 767px) {
  .root {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
} 
*/
</style>
