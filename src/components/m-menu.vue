<template>
  <el-menu
    :default-active="this.$store.state.route.path"
    class="el-menu-malu"
    :router="true"
    :mode="moo"
    @select="handleSelect"
    background-color="#000"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/">
      <i class="el-icon-location-outline" v-if="!moo"></i>
      <span slot="title">实验室</span>
    </el-menu-item>
    <el-menu-item index="/show">
      <i class="el-icon-menu" v-if="!moo"></i>
      <span slot="title">项目</span>
    </el-menu-item>
    <el-submenu index="2" :show-timeout="100">
      <template slot="title">
        <i class="el-icon-tickets" v-if="!moo"></i>
        <span slot="title">数据</span>
      </template>
      <el-menu-item index="/d1d0">文字</el-menu-item>
      <el-menu-item index="/d2d0">雷达图</el-menu-item>
      <el-menu-item index="/d2d1">网站状态</el-menu-item>
      <el-menu-item index="/d2d2">步数</el-menu-item>
    </el-submenu>
    <el-submenu index="3" :show-timeout="100">
      <template slot="title">
        <i class="el-icon-tickets" v-if="!moo"></i>
        <span slot="title">3D</span>
      </template>
      <el-menu-item index="/d3d0">多边形</el-menu-item>
      <el-menu-item index="/d3d1">圆柱体</el-menu-item>
      <el-menu-item index="/d3d2">正方体</el-menu-item>
      <el-menu-item index="/d4d0">图片切换</el-menu-item>
    </el-submenu>
    <el-menu-item index="/test">
      <i class="el-icon-message" v-if="!moo"></i>
      <span slot="title">测试</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    // console.log(this.$store.state.route.path);
    return {
      // activeIndex: "/"
      // activeIndex: this.$route.path
    };
  },
  props: { moo: String },
  methods: {
    handleSelect(key, keyPath) {
      // this.activeIndex = this.$store.state.route.path;
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
  z-index: 1;
}
.el-submenu .el-menu-item {
  min-width: 100px !important;
}
ul > li:hover {
  background-color: #303030 !important;
}
</style>
