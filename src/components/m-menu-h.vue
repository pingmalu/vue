<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-malu"
    :router="true"
    :mode="moo"
    @select="handleSelect"
    background-color="#000"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/show">项目</el-menu-item>
    <el-submenu index="2">
      <template slot="title">下拉项目</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    // console.log(this.$route.path);
    return {
      // activeIndex: "/"
      activeIndex: this.$route.path
    };
  },
  props: { moo: String },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("show_off");
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
.el-menu {
  border-right: none !important;
}
</style>
