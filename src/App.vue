<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col class="row-width-1140 hidden-xs-only">
            <Mmenuh moo="horizontal"></Mmenuh>
          </el-col>
          <el-col class="display-xs-only" v-clickoutside="handleClose">
            <div
              class="row-24"
              aria-expanded="false"
              title="主菜单"
              role="button"
              tabindex="0"
              @click="show = !show"
            >
              <svg focusable="false" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </div>
            <div v-show="show">
              <Mmenuh v-on:show_off="handleClose"></Mmenuh>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>foot</el-footer>
    </el-container>
  </div>
</template>

<script>
import Mmenuh from "@/components/m-menu-h";

const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};

export default {
  data: () => ({
    show: false
  }),

  components: {
    Mmenuh
  },
  directives: { clickoutside },
  methods: {
    handleClose(e) {
      this.show = false;
    }
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

.row-width-1140 {
  width: 1140px !important;
}

.el-header {
  padding: 0 !important;
  background-color: #000;
}

.row-24 {
  /* width: 24px; */
  /* padding: 10px; */
  /* width: 24px; */
  /* height: 24px; */
  -webkit-border-radius: 50%;
  border-radius: 50%;
  /* display: inline-block; */
  margin: 4px 4px 0 4px;
  padding: 12px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  height: 24px;
  width: 24px;
  -webkit-user-select: none;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
}

.row-24:hover {
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
}

.row-24:focus {
  outline: none;
}

.row-24 svg {
  color: #fefefe;
  fill: currentColor;
  width: 24px;
}

@media only screen and (min-width: 767px) {
  .display-xs-only {
    display: none !important;
  }
}

@media only screen and (max-width: 767px) {
  .display-xs-only {
    display: block !important;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cbcbcb;
}
</style>
