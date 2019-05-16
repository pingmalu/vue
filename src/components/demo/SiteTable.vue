<template>
    <table id="sitetable" :style="{width: '300px'}">
      <!-- <button v-on:click="shuffle">Shuffle</button> -->
      <!-- <el-table
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        empty-text=" "
        :data="info.children"
        stripe
        height="430"
        :row-key="info.children.key"
        style="width: 100%"
        is="transition-group"
      >
          <el-table-column sortable prop="name" label="日期" width="140"></el-table-column>
          <el-table-column sortable prop="value" label="事件" width="180" align="center"></el-table-column>
        </transition-group>
      </el-table>-->
      <thead>
        <tr>
          <th @click="sort('value')">
            可用率
            <span class="caret-wrapper" :class="tablesort['value']">
              <!-- <i class="el-icon-top" v-show="tablesort['value']"></i> -->
              <!-- <i class="el-icon-bottom" v-show="!tablesort['value']"></i> -->
              <i class="sort-caret ascending"></i>
              <i class="sort-caret descending"></i>
            </span>
          </th>
          <th @click="sort('name')">
            网站
            <span class="caret-wrapper" :class="tablesort['name']">
              <i class="sort-caret ascending"></i>
              <i class="sort-caret descending"></i>
            </span>
          </th>
          <th @click="sort('status')">
            状态
            <span class="caret-wrapper" :class="tablesort['status']">
              <i class="sort-caret ascending"></i>
              <i class="sort-caret descending"></i>
            </span>
          </th>
        </tr>
      </thead>
      <transition-group tag="tbody" name="flip-list" id="el">
        <tr v-for="(item) in info.children" :key="item.name">
          <td>
            <VCPB :p="Math.floor(item.value)" svgwidth="40px"></VCPB>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </transition-group>
    </table>
</template>

<script>
import axios from "axios";
let _ = require("lodash");

import VCPB from "@/components/demo/VueCircleProgressBars";

export default {
  data() {
    return {
      loading: true,

      shape: [],
      ids: 1,
      getRowKeys(row) {
        console.log(row);
        return row;
      },
      info: {
        name: "网站状态",
        value: 100,
        label: { color: "rgb(238, 197, 102)" },
        children: [{"name":"malu.me","value":"100","label":{"color":"#92be82"},"status":"2"},{"name":"s.malu.me","value":"100","label":{"color":"#92be82"},"status":"2"},{"name":"ip.malu.me","value":"99.68","label":{"color":"#92be82"},"status":"2"},{"name":"ai.malu.me","value":"84.92","label":{"color":"#92be82"},"status":"2"},{"name":"im.malu.me","value":"81.26","label":{"color":"rgb(238, 197, 102)"},"status":"9"},{"name":"www.malu.me","value":"100","label":{"color":"#92be82"},"status":"2"},{"name":"cdn.malu.me","value":"99.97","label":{"color":"#92be82"},"status":"2"},{"name":"git.malu.me","value":"99.95","label":{"color":"#92be82"},"status":"2"},{"name":"web.malu.me","value":"0","label":{"color":"rgb(238, 197, 102)"},"status":"9"},{"name":"ssh.malu.me","value":"0","label":{"color":"rgb(238, 197, 102)"},"status":"9"},{"name":"blog.malu.me","value":"100","label":{"color":"#92be82"},"status":"2"},{"name":"mcms.malu.me","value":"99.79","label":{"color":"#92be82"},"status":"2"},{"name":"lost.malu.me","value":"99.79","label":{"color":"#92be82"},"status":"2"},{"name":"photo.malu.me","value":"100","label":{"color":"#92be82"},"status":"2"},{"name":"github.malu.me","value":"100","label":{"color":"#92be82"},"status":"2"}]
      },
      tablesort: { value: "", name: "", status: "" }
    };
  },
  computed: {
    // 计算属性的 getter
    radom_num: function() {
      return Math.random();
    }
  },
  components: {
    VCPB
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
          this.info.children[i].label = { color: "rgb(238, 197, 102)" };
        } else {
          this.info.children[i].label = { color: "#92be82" };
        }
        this.info.children[i].status = e[1];
        // this.info.children[i]=["value":e[2]];
        i++;
      });
    },
    sort: function(key) {
      // this.tablesort[key] = "ascending";
      // this.testtag = key;
      // console.log(this.tablesort)
      // return;
      // console.log(e.currentTarget.firstElementChild)
      // this.tablesort = {};
      console.log(this.tablesort);
      for (var i in this.tablesort) {
        console.log(i)
        if (i != key) {
          this.tablesort[i] = "";
        }
      }
      console.log(this.tablesort[key]);

      if (typeof this.tablesort[key] == "undefined" || this.tablesort[key] == "" || this.tablesort[key] == "bbq") {
        this.tablesort[key] = "ascending";
        this.info.children.sort(function(a, b) {
          if (isNaN(parseFloat(a[key]))) {
            // 字符串看长度
            return a[key].length - b[key].length;
          }
          return parseFloat(a[key]) - parseFloat(b[key]);
        });
      } else if (this.tablesort[key] == "ascending") {
        // delete(this.tablesort[key]);
        this.tablesort[key] = "descending";
        // console.log("2", this.tablesort[key]);
        this.info.children
          .sort(function(a, b) {
            if (isNaN(parseFloat(a[key]))) {
              // 字符串看长度
              return a[key].length - b[key].length;
            }
            return parseFloat(a[key]) - parseFloat(b[key]);
          })
          .reverse();
        // console.log(this.tablesort[key]);
      } else if (this.tablesort[key] == "descending") {
        this.tablesort[key] = "bbq";
        // this.info.children
        //   .sort(function(a, b) {
        //     if (isNaN(parseFloat(a[key]))) {
        //       // 字符串看长度
        //       return a[key].length - b[key].length;
        //     }
        //     return parseFloat(a[key]) - parseFloat(b[key]);
        //   })
        //   .reverse();
      }
      //  else {
      //   this.tablesort[key] = "bbq";
      //   this.info.children.sort(function(a, b) {
      //     if (isNaN(parseFloat(a[key]))) {
      //       // 字符串看长度
      //       return a[key].length - b[key].length;
      //     }
      //     return parseFloat(a[key]) - parseFloat(b[key]);
      //   });
      // }
      // console.log(this.tablesort[key]);
      // if (this.tablesort[key]) {
      // } else {
      // }
    }
    // shuffle: function() {
    //   this.info.children = _.shuffle(this.info.children);
    // }
  },
  mounted() {
    axios
      .get("//malu.me/api/websitestatus")
      .then(response => {
        // this.info = response.data.data;
        this.shape = response.data.data;
        // this.info.children = this.shape
        // console.log(this.info);
        this.format_status_data();
        // console.log(this.info);
        // console.log(response.data.data);
        // console.log(JSON.stringify(this.info));
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style scoped lang="scss">
// #sitetable {
//   margin: 0 auto;
// }
tr {
  height: 60px;
  th {
    cursor: pointer;
  }
  td:nth-child(1),
  th:nth-child(1) {
    text-align: left;
    width: 200px;
  }
  // td:nth-child(2) {
  //   text-align: right;
  // }
  td:nth-child(3) {
    width: 200px;
  }
}

.caret-wrapper {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
.sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 5px;
}
.ascending .sort-caret.ascending {
  border-bottom-color: #409eff;
}
.sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 7px;
}
.descending .sort-caret.descending {
  border-top-color: #409eff;
}
.sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
