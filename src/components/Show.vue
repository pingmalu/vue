<template>
  <div class="show">
    <h1>{{ msg }}</h1>

    <div id="d1d2"></div>

    <img src="https://ws1.sinaimg.cn/large/a83bb572gy1g18125erxug20go0971df.gif">
  </div>
</template>

<script>
import * as THREE from "three";
import "../plugins/TweenMax.min.js";
import BAS from "../plugins/bas.js";


export default {
  name: "Mshow",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.init();
    // this.animate();
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);

    window.onresize = () => {
      // 通过捕获系统的onresize事件触发我们需要执行的事件
      let container = document.getElementById("d1d1");
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      // this.init();
      // this.animate();
    };
  },
  methods: {
    init: function() {

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
