<template>
  <div class="root">
    <d1 class="d1"></d1>
    <d2 class="d2"></d2>
    <d3 class="d3"></d3>
    <d4 class="d4"></d4>
  </div>
</template>
 
<script>
import d1 from "@/components/d1";
import d2 from "@/components/d2";
import d3 from "@/components/d3";
import d4 from "@/components/d4";

export default {
  components: {
    d1,
    d2,
    d3,
    d4
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
