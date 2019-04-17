<template>
  <div class="root">
    <d4d0 class="d2" :style="{width: '820px'}"></d4d0>
    <d1d0 class="d6"></d1d0>
    <d2d0 class="d5"></d2d0>
    <d3d0 class="d1"></d3d0>
    <d2d1 class="d3"></d2d1>
    <!-- <d3d1 class="d4"></d3d1> -->
    <d2d2 class="d4"></d2d2>
  </div>
</template>
 
<script>
import d1d0 from "@/components/d1d0";
import d2d0 from "@/components/d2d0";
import d3d0 from "@/components/d3d0";
import d4d0 from "@/components/d4d0";
import d2d1 from "@/components/d2d1";
import d3d1 from "@/components/d3d1";
import d2d2 from "@/components/d2d2";

export default {
  components: {
    d1d0,
    d2d0,
    d3d0,
    d4d0,
    d2d1,
    d3d1,
    d2d2
  }
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
