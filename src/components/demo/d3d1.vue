<template>
  <div>
    <div id="d3d1"></div>
  </div>
</template>
 
<script>
import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  CylinderBufferGeometry,
  MeshNormalMaterial,
  Mesh,
  PointLight,
  CameraHelper
} from "three";

// import OrbitControls from "three/examples/js/controls/OrbitControls";
import { OrbitControls } from "three-orbitcontrols-ts";

export default {
  name: "d3d1",
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
    // this.animate();
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);

    window.onresize = () => {
      // 通过捕获系统的onresize事件触发我们需要执行的事件
      let container = document.getElementById("d3d1");
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      // this.init();
      // this.animate();
    };
  },
  // created(){
  //   this.init()
  // },
  methods: {
    init: function() {
      let container = document.getElementById("d3d1");

      //创建颜色对象
      let blue = new Color(0x7658ef);
      let pink = new Color(0xfca4c5);

      let THREE = {
        Scene,
        Color,
        PerspectiveCamera,
        WebGLRenderer,
        IcosahedronGeometry,
        CylinderBufferGeometry,
        MeshNormalMaterial,
        Mesh,
        PointLight,
        CameraHelper
      };

      //创建场景对象
      this.scene = new THREE.Scene();

      //透视投影相机对象
      this.camera = new THREE.PerspectiveCamera(
        90,
        container.clientWidth / container.clientHeight,
        0.01,
        120
      );
      this.camera.position.z = 1;

      //生成渲染器对象（{ alpha: true }背景色透明  antialias:抗锯齿）
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      //指定渲染器的高宽，与可视窗口大小一致
      this.renderer.setSize(container.clientWidth, container.clientHeight);

      //将创建的canvas元素（此处的canvas元素为THREE.js创建）添加到文档当中
      container.appendChild(this.renderer.domElement);

      var orbit = new OrbitControls(this.camera, this.renderer.domElement);

      // var shape = [];

      //IcosahedronGeometry(radius,detail) 多面几何合体图形对象
      // let geometry = new THREE.IcosahedronGeometry(2.5, 0);
      let geometry = new THREE.CylinderBufferGeometry(5, 5, 20, 32);

      //MeshNormalMaterial({ color: 0x0000ff}) 网格材料映射 RGB 颜色。

      // let material = new THREE.MeshNormalMaterial({ color: 0x0000ff });
      let material = new THREE.MeshNormalMaterial();

      //Mesh(geometry,material)网格对象的基础类，第二个值是可选值
      this.shape[0] = new THREE.Mesh(geometry, material); //第一个几何体
      // this.shape[1] = new THREE.Mesh(geometry, material); //第二个几何体
      // this.shape[2] = new THREE.Mesh(geometry, material); //第三个几何体

      //三个几何体位置 x y z
      this.shape[0].position.set(3, 5, -10);
      // this.shape[1].position.set(3, 5, 0);
      // this.shape[2].position.set(3, 5, 0);

      //将三个几何体添加到场景中
      // this.scene.add(this.shape[0], this.shape[1], this.shape[2]);
      this.scene.add(this.shape[0]);

      //光源点 PointLight(hex, intensity, distance, decay)

      var light = new THREE.PointLight(0xfca4c5);

      //光源点位置 x y z
      light.position.set(0, 250, 0);

      //将光源点添加到场景中
      this.scene.add(light);

      var helper = new THREE.CameraHelper(this.camera);
      this.scene.add(helper);

      //透视投影相机位置 x y z
      this.camera.position.set(3, 5, 10);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      //旋转改变几何形状的（x,y,z）位置
      this.shape[0].rotation.x += 0.005;
      this.shape[0].rotation.y -= 0.005;
      // this.shape[1].rotation.y += 0.015;
      // this.shape[1].rotation.z -= 0.005;
      // this.shape[2].rotation.z -= 0.025;
      // this.shape[2].rotation.x += 0.005;
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style scoped>
#d3d1 {
  height: 600px;
  width: 600px;
  margin: 0 auto;
}
</style>
