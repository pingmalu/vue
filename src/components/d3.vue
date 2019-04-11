<template>
  <div>
    <div id="d3" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/tree"); // 引入树状图
require("echarts/lib/component/tooltip"); // 提示框组件
require("echarts/lib/component/title"); // 标题组件

import axios from "axios";
// import "../plugins/echarts_theme.js";

export default {
  name: "d3",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      shape: [],
      loading: null,
      info: {
        name: "网站状态",
        value: 100,
        label: { color: "rgb(255, 208, 75)" },
        children: [
          {
            name: "malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "www.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "blog.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "ip.malu.me",
            value: "99.06",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "photo.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "mcms.malu.me",
            value: "99.78",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "s.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "lost.malu.me",
            value: "99.78",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "ai.malu.me",
            value: "82.79",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "github.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "cdn.malu.me",
            value: "99.97",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "im.malu.me",
            value: "85.98",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "git.malu.me",
            value: "99.94",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "web.malu.me",
            value: "0",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "ssh.malu.me",
            value: "0",
            label: { color: "rgb(255, 208, 75)" }
          }
        ]
      }
    };
  },
  methods: {
    format_status_data: function() {
      // console.log(this.shape);
      this.info.children = [];
      var i = 0;
      this.shape.forEach(e => {
        // console.log(e[0]);
        this.info.children[i] = { name: e[0] };
        this.info.children[i].value = e[2];
        if (e[1] != 2) {
          this.info.children[i].label = { color: "#f28601" };
        } else {
          this.info.children[i].label = { color: "#a1f201" };
        }
        // this.info.children[i]=["value":e[2]];
        i++;
      });
    },
    init: function() {
      // echarts.registerTheme("halloween", this.config);
      // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(document.getElementById("root2"), "halloween");
      var myChart = echarts.init(document.getElementById("d3"));
      // console.log("test");

      myChart.showLoading();
      start_run(this.info);
      axios
        .get("//malu.me/api/websitestatus")
        .then(response => {
          this.shape = response.data.data;
          // this.info.children = this.shape
          // console.log(this.info);
          this.format_status_data();
          // console.log(JSON.stringify(this.info));
          start_run(this.info);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

      function start_run(data) {
        myChart.hideLoading();
        // console.log(data);
        /*
            echarts.util.each(data.children, function (datum, index) {
                index % 2 === 0 && (datum.collapsed = true);
            });
            */

        myChart.setOption({
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
          },
          backgroundColor: "rgba(238, 197, 102, 0)",

          // textStyle: {
          //   color: "#fff"
          // },
          // lineStyle: {
          //   color: "#fff"
          // },

          series: [
            {
              type: "tree",

              data: [data],

              top: "1%",
              left: "90px",
              bottom: "1%",
              right: "100px",

              symbolSize: 7,
              initialTreeDepth: -1,

              label: {
                normal: {
                  // formatter: ["{a|{b}}"].join(),
                  // rich: {
                  //   a: {
                  //     color: "rgb(255, 208, 75)"
                  //     // lineHeight: 10
                  //   }
                  // },
                  position: "left",
                  verticalAlign: "middle",
                  align: "right",
                  fontSize: 12,
                  color: "#ddd"
                }
              },
              itemStyle: {
                color: "#ddd",
                borderColor: "#ddd",
                borderWidth: 5
              },
              lineStyle: {
                color: "#ddd"
              },

              leaves: {
                label: {
                  normal: {
                    // formatter: ["{b|{c}}"].join(),
                    //   rich: {
                    //     b: {
                    //       color: "green"
                    //       // lineHeight: 10
                    //     }
                    //   },
                    position: "right",
                    verticalAlign: "middle",
                    align: "left"
                  }
                }
              },
              tooltip: {
                formatter: "{b0}  可用率 {c0}%"
              },

              expandAndCollapse: true,
              animationDuration: 100,
              animationDurationUpdate: 100
            }
          ]
        });
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
#d3 {
  margin: 0 auto;
}
</style>
