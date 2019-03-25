<template>
    <Mmenulist></Mmenulist>
</template>

<script>
import Mmenulist from "@/components/m-menu-list";

export default {
  data() {
    // console.log(this.$route.path);
    return {
      // activeIndex: "/"
      activeIndex: this.$route.path
    };
  },
  components: {
    Mmenulist
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
</style>
