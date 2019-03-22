<template>
  <div id="app">
    <el-row>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="5">
        <div class="grid-content"></div>
      </el-col>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
        <Mmenu></Mmenu>
      </el-col>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="5">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import Mmenu from "@/components/m-menu";

export default {
  components: {
    Mmenu
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  background-color: #262629;
}

a {
  text-decoration: none;
}

.grid-content {
  background-color: #000000;
  /* border-bottom: solid 1px #e6e6e6; */
  height: 60px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cbcbcb;
}
</style>
