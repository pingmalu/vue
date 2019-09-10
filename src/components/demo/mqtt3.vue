<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FLOW: [1, 2, 3, 4]
    };
  },
  methods: {
    drawit(id, w, h) {
      var c = document.getElementById(id);
      var MYDATA = this.FLOW;

      // 监听鼠标移动事件
      c.addEventListener("mousemove", event => {
        var rect = c.getBoundingClientRect();
        var y = event.clientY;
        var x = event.clientX;

        x = x - rect.left * (c.width / rect.width);
        y = y - rect.top * (c.height / rect.height) - 50;
        // console.log("x:" + x + ",y:" + y);
        this.FLOW[0] = y;
        this.FLOW[1] = x;
      });

      // 监听触摸移动
      c.addEventListener("touchmove", event => {
        event.preventDefault();
        var rect = c.getBoundingClientRect();
        var touch = event.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标

        x = x - rect.left * (c.width / rect.width);
        y = y - rect.top * (c.height / rect.height) - 50;
        // var text = "TouchMove事件触发：（" + x + ", " + y + "）";
        // console.log(text);
        this.FLOW[0] = y;
        this.FLOW[1] = x;
      });

      var ctx = c.getContext("2d");
      const maxValue = h / 10;
      var rightX = 0; // 左边距
      var leftX = 5; // 右边距
      const graphWidth = w - leftX - rightX;
      const graphHeight = maxValue;
      //   let curY = h / 2 - graphHeight / 2;

      let waves = [];
      let tick = 0;

      var DFLOW = [[], [], [], []];

      DFLOW.forEach(function(val, index) {
        for (var x = 0; x < graphWidth; x++) {
          DFLOW[index].push(1);
        }
      });

      function Main() {
        c.width = w;
        c.height = h;
        this.init();
      }

      Main.prototype = {
        init: function() {
          /**
           * Initialize the waveforms and push them into 'waves'.
           * The first argument is the display name,
           * the second the function that takes 1 argument (i)
           * which is the value to evaluate the function to.
           */
          waves.push(
            new WaveForm(
              "Y轴",
              //   i => i % maxValue
              //   i => (DFLOW[0][i] > maxValue ? maxValue : DFLOW[0][i])
              i => (DFLOW[0][i] > 60 ? 60 : DFLOW[0][i])
            )
          );

          waves.push(
            new WaveForm(
              "X轴",
              //  i => (i % maxValue) * 2 < maxValue ? maxValue : 0
              i => (DFLOW[1][i] > 60 ? 60 : DFLOW[1][i])
            )
          );

          waves.push(
            new WaveForm("triangle", i =>
              Math.abs((i % (maxValue * 2)) - maxValue)
            )
          );

          waves.push(
            new WaveForm(
              "sine",
              i => (maxValue / 2) * Math.sin(i / 24.5) + maxValue / 2
              // the divider ( / 24.5) is only added to spread the graph, you can leave it out or change the value to whatever you like
            )
          );

          this.draw();
          //   this.request = requestAnimationFrame(() => this.draw());
          //   window.addEventListener("resize", () => this.resize());
        },
        draw: function() {
          this.request = requestAnimationFrame(() => this.draw());

          // 注入数据
          DFLOW[0].shift();
          DFLOW[0].push(MYDATA[0]);
          DFLOW[1].shift();
          DFLOW[1].push(MYDATA[1]);

          ctx.clearRect(0, 0, w, h);

          ctx.strokeStyle = "white";
          //   ctx.lineWidth = 3;
          ctx.lineCap = "round";
          waves.forEach(wave => wave.draw());
        }
      };

      function WaveForm(name, fn) {
        this.name = name;
        this.fn = fn;
        this.x = rightX; // x轴起始点
        this.y = 50 + waves.length * (graphHeight + 50);
      }

      WaveForm.prototype = {
        draw: function() {
          // plot the entire graph first
          this.plotGraph();

          // then draw a little circle at the head
          this.drawPosition();

          // draw the title
          ctx.font = "12px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(this.name, this.x, this.y - 20);
        },
        plotGraph: function() {
          ctx.beginPath();
          for (var i = 0; i < graphWidth; i++)
            ctx.lineTo(this.x + i, this.y + this.fn(i));
          ctx.stroke();
          ctx.closePath();
          //   console.log(i - 1);
        },
        drawPosition: function() {
          ctx.fillStyle = `hsla(0,0%,100%,${Math.abs(
            ((this.fn(graphWidth - 1) / 100) % 2) - 1
          ) + 0.05})`;
          ctx.beginPath();
          ctx.arc(
            this.x + graphWidth,
            this.y + this.fn(graphWidth - 1),
            5,
            0,
            Math.PI * 2
          );
          ctx.closePath();
          ctx.fill();
        }
      };

      const main = new Main();
    }
  },
  mounted() {
    function getWidth() {
      return parseInt(
        window.innerWidth -
          (window.innerWidth < 600 ? window.innerWidth / 10 : 100)
      );
    }

    this.drawit("canvas", getWidth(), 450);
    window.addEventListener("resize", () => {
      this.drawit("canvas", getWidth(), 450);
    });
  }
};
</script>
<style scoped>
/* #canvas {
  background: hsla(210, 100%, 20%, 1) !important;
} */
</style>