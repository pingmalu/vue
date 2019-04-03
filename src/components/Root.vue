<template>
  <div class="root">
    <root1 class="root1"></root1>
    <root2 class="root2"></root2>
  </div>
</template>
 
<script>
import root1 from "@/components/Root_1";
import root2 from "@/components/Root_2";

export default {
  components: {
    root1,
    root2
  }
};
</script>
<style scoped>
.root {
  width: 100%;
  max-width: 1140px;
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
