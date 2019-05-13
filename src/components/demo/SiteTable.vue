<template>
  <div>
    <div id="d3" :style="{width: '300px', height: '600px'}">
      <button v-on:click="shuffle">Shuffle</button>
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

      <transition-group tag="tbody" name="flip-list" id="el">
        <tr v-for="(item) in info.children" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </transition-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let _ = require("lodash");

export default {
  name: "d3",
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
        children: [
          {
            name: "blog.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" },
            key: 1
          },
          {
            name: "photo.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" },
            key: 2
          },
          {
            name: "github.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" },
            key: 3
          },
          {
            name: "im.malu.me",
            value: "85.98",
            label: { color: "rgb(255, 208, 75)" },
            key: 4
          }
        ]
      }
    };
  },
  computed: {
    // 计算属性的 getter
    radom_num: function() {
      return Math.random();
    }
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
        // this.info.children[i]=["value":e[2]];
        i++;
      });
    },
    shuffle: function() {
      this.info.children = _.shuffle(this.info.children);
    }
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
        console.log(this.info);
        console.log(response.data.data);
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
#d3 {
  margin: 0 auto;
}
tr {
  height: 30px;
  td:nth-child(1) {
    text-align: left;
  }
}

tr td:nth-child(2) {
  text-align: right;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
