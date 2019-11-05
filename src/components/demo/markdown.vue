<template>
  <div>
    <remote-script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></remote-script>

    <section v-if="errored">
      <p>加载失败，刷新重试</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div v-else-if="id" v-html="info" id="markdown"></div>

      <div v-else id="markdown-list">
        <el-table :data="list" @row-click="handlePreview" stripe style="width: 100%;">
          <el-table-column prop="id" label="ID" width="180"></el-table-column>
          <el-table-column prop="title" label="title"></el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "markdown",
  data() {
    return {
      info: null,
      list: null,
      loading: true,
      errored: false,
      id: this.$route.params.id,
      md_url: "http://c1.malu.me/api/markdown_share/"
    };
  },
  methods: {
    drawit() {
      //判断marked是否加载完成没有的话 继续判断
      if (typeof marked !== "function") {
        setTimeout(this.drawit, 500);
        return;
      }
      this.loading = true;
      axios
        .get(this.md_url + this.id)
        .then(response => {
          this.info = marked(response.data);
          this.errored = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    drawlist() {
      this.id = null;
      this.info = null;
      this.loading = true;

      axios
        .get(this.md_url)
        .then(response => {
          this.list = response.data.data;
          this.errored = false;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    handlePreview(row, event, column) {
      // console.log(row, event, column);
      console.log(row.id);
      // this.id = row.id;
      this.$router.push({ path: "/markdown/" + row.id });
      // this.drawit();
    }
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      console.log(to.path.substr("/markdown/".length));
      if (to.path == "/markdown/" || to.path == "/markdown") {
        this.drawlist();
      } else {
        this.id = to.path.substr("/markdown/".length);
        this.drawit();
      }
    }
  },
  mounted() {
    if (this.id) {
      // 进入详情页
      console.log("进入详情页" + this.id);
      this.drawit();
    } else {
      // 列表页
      console.log("列表页");
      this.drawlist();
    }
  }
};
</script>

<style>
#markdown {
  text-align: left;
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
  color: #bbbbbb;
}
a {
  color: #b1a7c5;
}
a:hover {
  color: #98b8c9;
}

#markdown-list {
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
}
#markdown-list .el-table--border::after,
#markdown-list .el-table--group::after,
#markdown-list .el-table::before {
  display: none;
}
#markdown-list .el-table td,
#markdown-list .el-table th.is-leaf {
  border-bottom: 1px solid #494949;
}
#markdown-list .el-table th,
#markdown-list .el-table tr {
  background-color: #262629;
}

#markdown-list tr.el-table__row--striped td {
  background: #262629;
}

#markdown-list .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #3c3c41;
}
#markdown-list .el-table {
  color: #b5b6b8;
}
</style>
