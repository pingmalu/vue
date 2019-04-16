<template>
  <div>
    <div id="container"></div>
  </div>
</template>
 
<script>
import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  MeshNormalMaterial,
  Mesh,
  PointLight
} from "three";

export default {
  name: "d1",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      shape: []
    };
  },
  mounted() {
    this.init();
    this.animate();
    window.onresize = () => {
      // 通过捕获系统的onresize事件触发我们需要执行的事件
      let container = document.getElementById("container");
      if (container) {
        // console.log(container);
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        // this.init();
        // this.animate();
      }
    };
  },
  // created(){
  //   this.init()
  // },
  methods: {
    init: function() {
      let container = document.getElementById("container");

      //创建颜色对象
      let blue = new Color(0x7658ef);
      let pink = new Color(0xfca4c5);

      let Three = {
        Scene,
        Color,
        PerspectiveCamera,
        WebGLRenderer,
        IcosahedronGeometry,
        MeshNormalMaterial,
        Mesh,
        PointLight
      };

      //创建场景对象
      this.scene = new Three.Scene();

      //透视投影相机对象
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;

      //生成渲染器对象（{ alpha: true }背景色透明）
      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });

      //指定渲染器的高宽，与可视窗口大小一致
      this.renderer.setSize(container.clientWidth, container.clientHeight);

      //将创建的canvas元素（此处的canvas元素为three.js创建）添加到文档当中
      container.appendChild(this.renderer.domElement);

      // var shape = [];

      //IcosahedronGeometry(radius,detail) 多面几何合体图形对象
      let geometry = new Three.IcosahedronGeometry(2.5, 0);

      //MeshNormalMaterial({ color: 0x0000ff}) 网格材料映射 RGB 颜色。

      // let material = new Three.MeshNormalMaterial({ color: 0x0000ff });
      let material = new Three.MeshNormalMaterial();

      //Mesh(geometry,material)网格对象的基础类，第二个值是可选值
      this.shape[0] = new Three.Mesh(geometry, material); //第一个几何体
      this.shape[1] = new Three.Mesh(geometry, material); //第二个几何体
      this.shape[2] = new Three.Mesh(geometry, material); //第三个几何体

      //三个几何体位置 x y z
      this.shape[0].position.set(3, 5, 0);
      this.shape[1].position.set(3, 5, 0);
      this.shape[2].position.set(3, 5, 0);

      //将三个几何体添加到场景中
      this.scene.add(this.shape[0], this.shape[1], this.shape[2]);

      //光源点 PointLight(hex, intensity, distance, decay)

      var light = new Three.PointLight(0xfca4c5);

      //光源点位置 x y z
      light.position.set(0, 250, 0);

      //将光源点添加到场景中
      this.scene.add(light);

      //透视投影相机位置 x y z
      this.camera.position.set(3, 5, 10);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      //旋转改变几何形状的（x,y,z）位置
      this.shape[0].rotation.x += 0.035;
      this.shape[0].rotation.y -= 0.005;
      this.shape[1].rotation.y += 0.015;
      this.shape[1].rotation.z -= 0.005;
      this.shape[2].rotation.z -= 0.025;
      this.shape[2].rotation.x += 0.005;
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style scoped>
#container {
  height: 300px;
  width: 300px;
  margin: 0 auto;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
