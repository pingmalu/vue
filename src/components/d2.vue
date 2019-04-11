<template>
  <div>
    <div id="radar" :style="{width: '600px', height: '600px'}"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/radar"); // 雷达图
// 引入提示框和标题组件
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");

// import axios from "axios";
// import "../plugins/echarts_theme.js";

export default {
  name: "radar",
  data() {
    return {};
  },
  methods: {
    init: function() {
      var radar = echarts.init(document.getElementById("radar"));

      var dataSZ = [
        [91, 45, 125, 0.82, 34, 23, 1],
        [83, 60, 84, 1.09, 73, 27, 3],
        [109, 81, 121, 1.28, 68, 51, 4],
        [106, 77, 114, 1.07, 55, 51, 5],
        [109, 81, 121, 1.28, 68, 51, 6],
        [106, 77, 114, 1.07, 55, 51, 7],
        [89, 65, 78, 0.86, 51, 26, 8],
        [53, 33, 47, 0.64, 50, 17, 9],
        [80, 55, 80, 1.01, 75, 24, 10],
        [117, 81, 124, 1.03, 45, 24, 11],
        [99, 71, 142, 1.1, 62, 42, 12],
        [95, 69, 130, 1.28, 74, 50, 13],
        [116, 87, 131, 1.47, 84, 40, 14],
        [108, 80, 121, 1.3, 85, 37, 15],
        [134, 83, 167, 1.16, 57, 43, 16],
        [79, 43, 107, 1.05, 59, 37, 17],
        [97, 71, 113, 1.17, 88, 31, 19],
        [87, 63, 101, 0.9, 56, 41, 21],
        [104, 77, 119, 1.09, 73, 48, 22],
        [87, 62, 100, 1, 72, 28, 23],
        [168, 128, 172, 1.49, 97, 56, 24],
        [65, 45, 51, 0.74, 39, 17, 25],
        [39, 24, 38, 0.61, 47, 17, 26],
        [39, 24, 39, 0.59, 50, 19, 27],
        [93, 68, 96, 1.05, 79, 29, 28],
        [188, 143, 197, 1.66, 99, 51, 29],
        [174, 131, 174, 1.55, 108, 50, 30],
        [187, 143, 201, 1.39, 89, 53, 31]
      ];

      var lineStyle = {
        normal: {
          width: 1,
          opacity: 0.2
        }
      };

      radar.setOption({
        // backgroundColor: "#161627",
        tooltip: {},

        title: {
          text: "AQI - 苏州",
          left: "center",
          textStyle: {
            color: "#eee"
          }
        },
        radar: {
          indicator: [
            { name: "AQI", max: 300 },
            { name: "PM2.5", max: 250 },
            { name: "PM10", max: 300 },
            { name: "CO", max: 5 },
            { name: "NO2", max: 200 },
            { name: "SO2", max: 100 }
          ],
          shape: "circle",
          splitNumber: 5,
          name: {
            textStyle: {
              color: "rgb(238, 197, 102)"
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(238, 197, 102, 0.1)",
                "rgba(238, 197, 102, 0.2)",
                "rgba(238, 197, 102, 0.4)",
                "rgba(238, 197, 102, 0.6)",
                "rgba(238, 197, 102, 0.8)",
                "rgba(238, 197, 102, 1)"
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(238, 197, 102, 0.5)"
            }
          }
        },
        series: [
          {
            name: "苏州",
            type: "radar",
            lineStyle: lineStyle,
            data: dataSZ,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#B3E4A1"
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.05
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
div#radar {
  margin: 0 auto;
}
</style>
