<template>
  <div class="root">
    <!-- <d4d0 class="d2" :style="{width: '820px'}"></d4d0> -->
    <transition name="el-fade-in" appear>
      <d1d0 class="d1d0"></d1d0>
    </transition>
    <!-- <d3d0 class="d1"></d3d0> -->
    <!-- <d2d1 class="d3"></d2d1> -->
    <!-- <d3d1 class="d4"></d3d1> -->
    <!-- <d2d0 class="d5"></d2d0> -->
    <!-- <div class="box" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <d2d4 class="d2d4">
        <s1></s1>访问量TOP
      </d2d4>
    </div>-->
    <!-- <el-button @click="show = !show">Click Me</el-button> -->

    <div class="box" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <transition name="el-zoom-in-center" appear>
        <d2d3 class="d2d3" :url="url1" v-show="show">RedisLabs</d2d3>
      </transition>
    </div>
    <div class="box" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <transition name="el-zoom-in-center" appear>
        <d2d3 class="d2d3" :url="url2" v-show="show">SSH</d2d3>
      </transition>
    </div>
    <div class="box" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <transition name="el-zoom-in-center" appear>
        <d2d3 class="d2d3" :url="url3" v-show="show">HOME</d2d3>
      </transition>
    </div>

    <!-- <div class="box" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <d2d3 class="d2d3" :url="url2">SSH</d2d3>
    </div>
    <div class="box" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <d2d3 class="d2d3" :url="url3">HOME</d2d3>
    </div>-->

    <!-- <d2d2 class="d4" :style="{width: '720px'}"></d2d2> -->
  </div>
</template>
 
<script>
var i = 0;
var styleEl = document.createElement("style");
document.head.appendChild(styleEl);
styleEl.sheet.insertRule(
  ".box1:before,.box1:after{background:linear-gradient(" +
    i +
    "deg, #89ff00, #060c21, #00bcd4)}",
  0
);

function draw() {
  requestAnimationFrame(draw);
  // console.log(i);
  i += 2;
  styleEl.sheet.deleteRule(0);
  styleEl.sheet.insertRule(
    ".box1:before,.box1:after{background:linear-gradient(" +
      i +
      "deg, #89ff00, #060c21, #00bcd4)}",
    0
  );
}
draw();

// import d1d0 from "@/components/d1d0";
// import d2d0 from "@/components/d2d0";
// import d3d0 from "@/components/d3d0";
// import d4d0 from "@/components/d4d0";
// import d2d1 from "@/components/d2d1";
// import d3d1 from "@/components/d3d1";
// import d2d2 from "@/components/d2d2";
// import d2d3 from "@/components/d2d3";
var routes = {};
let routes_arr = new Set();
routes_arr.add("d1d0");
routes_arr.add("d2d0");
routes_arr.add("d3d0");
routes_arr.add("d4d0");
// routes_arr.add("d2d1");
// routes_arr.add('d2d2');
routes_arr.add("d2d3");
routes_arr.add("d2d4");
routes_arr.add("s1");
// routes_arr.add('d3d1');
// routes_arr.add('d3d2');
routes_arr.forEach(v => {
  routes[v] = require("@/components/demo/" + v).default;
});
// console.log(routes);
export default {
  data() {
    return {
      url1: "//c1.malu.me/api/loglist",
      url2: "//c1.malu.me/api/loglist/ssh",
      url3: "//c1.malu.me/api/loglist/d",
      show: true
    };
  },
  methods: {
    changeActive($event) {
      $event.currentTarget.className = "box box1";
    },
    removeActive($event) {
      $event.currentTarget.className = "box";
    }
  },
  mounted() {
    // setTimeout(() => {
    //   console.log("执行了");
    // }, 1);
    //     setTimeout(() => {
    //   console.log("执行了");
    //   this.show = true;
    // }, 1000);
    //     setTimeout(() => {
    //   console.log("执行了");
    //   this.show = true;
    // }, 5000);
  },
  components: routes
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
.d1d0 {
  width: 100%;
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

.box {
  position: relative;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  background-color: #262629;
  margin: 64px 44px;
  padding: 10px;
  /* width: 320px; */
  /* height: 442px; */
  backface-visibility: hidden;
}
/* 用box的伪元素添加一个面积比box略大的矩形,并通过改变层叠次序,置于box的下层,达到给box设置边框的效果 */
.box::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  /* background: #fff; */
  z-index: -1;
}
/* 与上面类似,做一个面积比box略大的矩形,并通过改变层叠次序,置于box的下层,达到给box设置边框的效果 */
.box::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  /* background: #fff; */
  z-index: -2;
  /* 滤镜属性  给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，所以值越大越模糊；如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。 */
  filter: blur(40px);
}

/*动画1：hover动画*/
/* .box::before,
.box::after {
  transition: background 2s;
  background: linear-gradient(215deg, #89ff00, #060c21, #00bcd4);
}

.box:hover::before,
.box:hover::after {
  background: linear-gradient(265deg, #89ff00, #060c21, #00bcd4);
} */

/*动画2：hover动画*/
/* .box::before, */
/* .box::after { */
/* background: linear-gradient(215deg, #89ff00, #060c21, #00bcd4); */
/* animation: blinds 3s ease-in-out infinite alternate; */
/* } */

/* .box:hover::before,
.box:hover::after {
  background: linear-gradient(265deg, #89ff00, #060c21, #00bcd4);
} */

/* .box::after {
  animation: blinds 3s ease-in-out infinite alternate;
} */

@keyframes blinds {
  from {
    /* transform: rotate(-20deg); */
    background: linear-gradient(265deg, #89ff00, #060c21, #00bcd4);
  }
  to {
    /* transform: rotate(20deg); */
    background: linear-gradient(125deg, #89ff00, #060c21, #00bcd4);
  }
  /* 10% {
    background: linear-gradient(226deg, #89ff00, #060c21, #00bcd4);
  }
  20% {
    background: linear-gradient(227deg, #89ff00, #060c21, #00bcd4);
  }
  30% {
    background: linear-gradient(228deg, #89ff00, #060c21, #00bcd4);
  }
  40% {
    background: linear-gradient(229deg, #89ff00, #060c21, #00bcd4);
  }
  50% {
    background: linear-gradient(230deg, #89ff00, #060c21, #00bcd4);
  }
  60% {
    background: linear-gradient(231deg, #89ff00, #060c21, #00bcd4);
  }
  70% {
    background: linear-gradient(232deg, #89ff00, #060c21, #00bcd4);
  }
  80% {
    background: linear-gradient(233deg, #89ff00, #060c21, #00bcd4);
  }
  90% {
    background: linear-gradient(234deg, #89ff00, #060c21, #00bcd4);
  }
  100% {
    background: linear-gradient(235deg, #89ff00, #060c21, #00bcd4);
  } */
}

/* @keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
} */
</style>
