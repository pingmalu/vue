<template>
  <div>
    <div id="d3" :style="{width: '300px', height: '600px'}">
      <button v-on:click="shuffle">Shuffle</button>

      <ul id="e1">
        <transition-group tag="ul" name="flip-list">
          <li v-for="item in info.children" :key="item.name">{{ item.name }} | {{ item.value }}</li>
        </transition-group>
      </ul>
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
      shape: [],
      info: {
        name: "网站状态",
        value: 100,
        label: { color: "rgb(238, 197, 102)" },
        children: [
          {
            name: "blog.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "photo.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "github.malu.me",
            value: "100",
            label: { color: "rgb(255, 208, 75)" }
          },
          {
            name: "im.malu.me",
            value: "85.98",
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

<style scoped>
#d3 {
  margin: 0 auto;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
