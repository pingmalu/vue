<template>
  <div class="root">
    <!-- <d4d0 class="d2" :style="{width: '820px'}"></d4d0> -->
    <d1d0 class="d1d0"></d1d0>
    <!-- <d3d0 class="d1"></d3d0> -->
    <!-- <d2d1 class="d3"></d2d1> -->
    <!-- <d3d1 class="d4"></d3d1> -->
    <!-- <d2d0 class="d5"></d2d0> -->
    <div class="box">
      <d2d4 class="d2d4">
        <s1></s1>访问量TOP
      </d2d4>
    </div>
    <div class="box">
      <d2d3 class="d2d3" :url="url1">RedisLabs</d2d3>
    </div>
    <div class="box">
      <d2d3 class="d2d3" :url="url2">SSH</d2d3>
    </div>
    <div class="box">
      <d2d3 class="d2d3" :url="url3">HOME</d2d3>
    </div>

    <!-- <d2d2 class="d4" :style="{width: '720px'}"></d2d2> -->
  </div>
</template>
 
<script>
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
routes_arr.add("d2d1");
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
      url3: "//c1.malu.me/api/loglist/d"
    };
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #262629;
  margin: 64px 44px;
  padding: 10px;
}
/* 用box的伪元素添加一个面积比box略大的矩形,并通过改变层叠次序,置于box的下层,达到给box设置边框的效果 */
.box::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -1;
}
/* 于上面类似,做一个面积比box略大的矩形,并通过改变层叠次序,置于box的下层,达到给box设置边框的效果 */
.box::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -2;
  /* 滤镜属性  给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，所以值越大越模糊；如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。 */
  filter: blur(40px);
}
.box::before,
.box::after {
  /* linear-gradient() 函数用于创建一个线性渐变的 "图像"。 参数1:用角度值指定渐变的方向（或角度）  12点钟方向为0deg*/
  background: linear-gradient(235deg, #89ff00, #060c21, #00bcd4);
}
</style>
