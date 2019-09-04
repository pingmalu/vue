<template>
  <div>
    <canvas id="canvas" width="600" height="250"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawit() {}
  },
  mounted() {
    let waves = [];

    // Draw the output of sharkFin on the canvas
    var canvas = document.getElementById("canvas");

    // 监听点击事件
    canvas.addEventListener("mousemove", function(event) {
      getMousePos(canvas, event);
    });

    canvas.addEventListener("touchmove", function(event) {
      getTouchPos(canvas, event);
    });

    function getMousePos(canvas, event) {
      //1
      var rect = canvas.getBoundingClientRect();
      //2
      var x = event.clientX - rect.left * (canvas.width / rect.width);
      var y = event.clientY - rect.top * (canvas.height / rect.height);
      console.log("x:" + x + ",y:" + y);
      MYV = y;
    }

    function getTouchPos(canvas, event) {
      event.preventDefault();
      var touch = event.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      var y = Number(touch.pageY); //页面触点Y坐标
      var text = "TouchMove事件触发：（" + x + ", " + y + "）";
      console.log(text);
      MYV = y < 0 ? 0 : y > canvas.height ? canvas.height : y;
    }

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    for (var x = 0; x < 1 * canvas.width; x++) {
      waves.push(200);
    }
    var MYV = 200;

    function draw() {
      ctx.clearRect(0, 0, 600, 300);
      ctx.beginPath();
      for (var x = 0; x < 600; x++) {
        ctx.lineTo(x, waves[x]);
      }
      ctx.stroke();
      ctx.closePath();
      waves.shift();
      waves.push(MYV);
      requestAnimationFrame(draw);
    }

    draw();
  }
};
</script>
<style scoped>
/* #canvas {
  background: hsla(210, 100%, 20%, 1) !important;
} */
</style>