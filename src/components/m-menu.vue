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
      <i class="el-icon-s-home" v-if="!moo"></i>
      <span slot="title">实验室</span>
    </el-menu-item>
    <el-menu-item index="/show">
      <i class="el-icon-s-opportunity" v-if="!moo"></i>
      <span slot="title">状态</span>
    </el-menu-item>
    <el-menu-item index="/test">
      <i class="el-icon-thumb" v-if="!moo"></i>
      <span slot="title">测试</span>
    </el-menu-item>
    <el-submenu index="2" :show-timeout="100">
      <template slot="title">
        <i class="el-icon-s-data" v-if="!moo"></i>
        <span slot="title">数据</span>
      </template>
      <el-menu-item index="/mqtt2">实时折线图2</el-menu-item>
      <el-menu-item index="/f2d0">实时折线图</el-menu-item>
      <el-menu-item index="/d1d0">文字</el-menu-item>
      <el-menu-item index="/d2d0">雷达图</el-menu-item>
      <el-menu-item index="/sitetree">网站状态</el-menu-item>
      <el-menu-item index="/sitetable">网站状态2</el-menu-item>
      <el-menu-item index="/car">车辆</el-menu-item>
      <el-menu-item index="/d2d2">步数</el-menu-item>
      <el-menu-item index="/d2d3">预警</el-menu-item>
      <el-menu-item index="/d2d4">访问量TOP</el-menu-item>
      <el-menu-item index="/upload">批量上传</el-menu-item>
      <el-menu-item index="/mqtt">协作画图</el-menu-item>
    </el-submenu>
    <el-submenu index="3" :show-timeout="100">
      <template slot="title">
        <i class="el-icon-crop" v-if="!moo"></i>
        <span slot="title">3D</span>
      </template>
      <el-menu-item index="/d3d0">多边形</el-menu-item>
      <el-menu-item index="/d3d1">圆柱体</el-menu-item>
      <el-menu-item index="/d3d2">正方体</el-menu-item>
      <el-menu-item index="/d4d0">图片切换</el-menu-item>
    </el-submenu>
    <el-menu-item index="/setting">
      <i class="el-icon-thumb" v-if="!moo"></i>
      <span slot="title">配置</span>
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
      // console.log(key, keyPath);
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
ul.el-menu > li:hover {
  background-color: #303030 !important;
}
</style>
