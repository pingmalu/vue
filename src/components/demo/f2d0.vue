<template>
  <div>
    <canvas v-bind:id="f2id"></canvas>
  </div>
</template>
<script>
const F2 = require("@antv/f2");
export default {
  props: { color: { default: "l(0) 0:#262629 0.15:#7ec2f3 1:#1890ff" }, f2id:{default:"f4"} },
  methods: {
    datachart() {
      // 自定义线图变更动画
      F2.Animate.registerAnimation("lineUpdate", function(
        updateShape,
        animateCfg
      ) {
        var cacheShape = updateShape.get("cacheShape"); // 该动画 shape 的前一个状态
        var cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
        var oldPoints = cacheAttrs.points; // 上一个状态的关键点
        var newPoints = updateShape.attr("points"); // 当前 shape 的关键点

        var oldLength = oldPoints.length;
        var newLength = newPoints.length;
        var deltaLength = newLength - oldLength;

        var lastPoint = newPoints[newPoints.length - 1];
        for (var i = 0; i < deltaLength; i++) {
          oldPoints.push(lastPoint);
        }

        updateShape.attr(cacheAttrs);
        updateShape.animate().to({
          attrs: {
            points: newPoints
          },
          duration: 800,
          easing: animateCfg.easing
        });
      });

      var data = [];
      var move_data_tag = false;
      // 添加数据，模拟数据，可以指定当前时间的偏移的秒
      function getRecord(offset) {
        offset = offset || 0;
        return {
          time: new Date().getTime() + offset * 1000,
          value: Math.random() * 90 + 10
        };
      }

      data.push(getRecord(-2));
      data.push(getRecord(-1));
      data.push(getRecord());

      var chart = new F2.Chart({
        id: this.f2id,
        pixelRatio: window.devicePixelRatio,
        height: 110
      });

      var defs = {
        time: {
          type: "timeCat",
          mask: "HH:mm:ss",
          range: [0, 1]
        },
        value: {
          tickCount: 3,
          min: 8
        }
      };
      chart.source(data, defs);
      chart.axis("value", {
        line: {
          lineWidth: 1,
          stroke: "#262629",
          top: true // 展示在最上层
        },
        tickLine: {
          // lineWidth: 1,
          stroke: "#262629"
          // length: 5 // 刻度线长度
        },
        grid: (text, index, total) => {
          return {
            lineWidth: 1,
            stroke: "#262629"
          };
        }
      });
      chart.axis("time", {
        line: {
          lineWidth: 1,
          stroke: "#262629",
          top: true // 展示在最上层
        }, // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线，图形属性
        // labelOffset: 20, // 坐标轴文本距离轴线的距离
        tickLine: {
          // lineWidth: 1,
          stroke: "#262629"
          // length: 5 // 刻度线长度
        }, // 坐标点对应的线，null 不显示，图形属性
        label: function label(text, index, total) {
          var textCfg = {
            text: ""
          };
          if (index === 0) {
            textCfg.textAlign = "left";
            textCfg.text = text;
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
            textCfg.text = text;
          }
          return textCfg;
        }
      });

      chart
        .line()
        .position("time*value")
        .color(this.color)
        .animate({
          update: {
            animation: "lineUpdate"
          }
        });

      chart.render();

      setInterval(function() {
        data.push(getRecord());
        if (move_data_tag) {
          data.shift();
          chart.changeData(data);
          return;
        }
        if (data.length > 100) {
          move_data_tag = true;
          data.shift();
        }
        chart.changeData(data);
      }, 17);
    }
  },
  mounted() {
    console.log(this.color);
    this.datachart();
  }
};
</script>
<style scoped>
</style>
