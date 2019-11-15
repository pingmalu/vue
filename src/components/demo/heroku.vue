<template>
  <div id="box">
    <a :href="clear_url">
      <span class="title-span">刷新</span>
    </a>
    <el-table :data="tableData" stripe style="width: 100%" :row-class-name="rowClassName">
      <el-table-column sortable prop="name" label="name" width="180">
        <!-- <template scope="scope"><span :class="scope.row.state">{{scope.row.name}}</span></template> -->
      </el-table-column>
      <el-table-column sortable prop="buildpack_provided_description" label="类型" width="75"></el-table-column>
      <el-table-column sortable prop="region" label="地区" align="center" width="70"></el-table-column>
      <el-table-column sortable prop="web_url" label="web_url" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column sortable prop="slug_size" label="代码量" align="right" width="100">
        <template scope="scope">{{scope.row.slug_size | btom}}</template>
      </el-table-column>
      <el-table-column
        sortable
        prop="stack"
        label="stack"
        align="right"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="email"
        label="email"
        align="right"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column sortable prop="app_used" label="当前" align="center" width="70">
        <template scope="scope">{{scope.row.app_used | stoh}}</template>
      </el-table-column>
      <el-table-column sortable prop="quota_used" label="使用" align="center" width="70">
        <template scope="scope">{{scope.row.quota_used | stoh}}</template>
      </el-table-column>
      <el-table-column sortable prop="account_quota" label="所有" align="center" width="70">
        <template scope="scope">{{scope.row.account_quota | stoh}}</template>
      </el-table-column>
      <el-table-column
        sortable
        prop="created_at"
        label="创建时间"
        align="right"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="released_at"
        label="释放时间"
        align="right"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="updated_at"
        label="更新时间"
        align="right"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";

// 从URL传参或值
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

//功能：将浮点数四舍五入，取小数点后2位
function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
}

export default {
  data() {
    return {
      tableData: [],
      burl: decodeURIComponent(getQueryVariable("url")), // 请求地址
      clear_url:
        decodeURIComponent(getQueryVariable("url")) + "heroku/clear_cache"
    };
  },
  props: ["url"],
  filters: {
    stoh: function(s) {
      if (s) {
        return toDecimal(s / 3600) + "h";
      } else {
        return s;
      }
    },
    btom: function(s) {
      if (s) {
        return toDecimal(s / 1024 / 1024) + "m";
      } else {
        return s;
      }
    }
  },
  methods: {
    rowClassName: function(row) {
      return row.row.state;
    }
  },
  mounted() {
    console.log("Api", this.burl);
    if (this.url) {
      this.burl = this.url;
    }
    axios
      .get(this.burl + "heroku", { withCredentials: true })
      .then(response => {
        // console.log(response.data.data);
        this.tableData = response.data.data;
      })
      .catch(error => {
        console.log(error);
        console.log("ddd");
        window.location.href =
          this.burl + "login?URL=" + window.btoa(window.location.href);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
<style scoped>
.title-span {
  float: left;
  background-color: #939393;
  color: #2d2d30;
  display: inline;
  padding: 2px 10px;
  font-weight: 900;
  font-size: 14px;
  border-radius: 2px;
  margin: 0 0 0 10px;
}
#box >>> .el-table,
#box >>> .el-table__expanded-cell {
  color: #fff;
  background-color: rgba(255, 255, 255, 0);
}

#box >>> tr,
#box >>> th {
  background-color: rgba(255, 255, 255, 0);
}
#box >>> .el-table td,
#box >>> .el-table th.is-leaf {
  padding: 2px 0;
  font-size: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}
#box >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f5f7fa1f;
}
#box >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #2d2d30;
}
#box >>> .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
  background-color: #f5f7fa1f;
}
#box >>> .el-table::before {
  display: none;
}
#box >>> .warning-row {
  background-color: #ff5722 !important;
}
#box >>> .el-table--striped .el-table__body tr.warning-row td {
  background-color: #ff7950ca !important;
}
#box >>> .el-table--striped .el-table__body tr.warning-row:hover td {
  background-color: #ff5722 !important;
}
#box >>> .success-row {
  background-color: #f0f9eb !important;
}
#box >>> ::-webkit-scrollbar {
  width: 0.45em;
  height: 0.25em;
  position: absolute;
}

#box >>> ::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

#box >>> ::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.4);
}
#box >>> tr.awake {
  color: #8bc34a !important;
}
#box >>> tr.sleeping {
  color: #bbbbbb;
}
#box >>> tr.empty {
  color: #858585;
}
</style>