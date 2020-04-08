<template>
  <div id="box">
    <a :href="clear_url" @click="needrenewf()">
      <span class="title-span">刷新</span>
    </a>
    <textarea
      id="text"
      name="c"
      rows="1"
      cols="150"
      @keypress="handleKeyCode($event)"
      v-model="text"
      :class="[pending]"
    ></textarea>
    <!-- <button id="send" @click="get_text()">Send</button> -->
    <a id="send" @click="get_text()">
      <span class="title-span">{{btn_text}}</span>
    </a>
    <a @click="clear()">
      <span class="title-span">Clear</span>
    </a>
    <input id="tag" v-model="tag" />
    <a href="https://heroku-m1.herokuapp.com/heroku/manage" target="_blank">
      <span class="title-span">登录</span>
    </a>
    <a href="https://devcenter.heroku.com/articles/heroku-cli-commands" target="_blank">
      <span class="title-span">Help</span>
    </a>
    <textarea id="pre" cols="160" v-show="pre_text" v-model="pre_text"></textarea>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :row-class-name="rowClassName"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @cell-click="showinfo"
    >
      <el-table-column sortable prop="name" label="name" width="180">
        <!-- <template scope="scope"><span :class="scope.row.state">{{scope.row.name}}</span></template> -->
      </el-table-column>
      <el-table-column sortable prop="buildpack_provided_description" label="类型" width="75"></el-table-column>
      <el-table-column sortable prop="region" label="地区" align="center" width="70"></el-table-column>
      <el-table-column sortable prop="web_url" label="web_url" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column sortable prop="slug_size" label="代码量" align="right" width="100">
        <template slot-scope="scope">{{scope.row.slug_size | btom}}</template>
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
        <template slot-scope="scope">{{scope.row.app_used | stoh}}</template>
      </el-table-column>
      <el-table-column sortable prop="quota_used" label="使用" align="center" width="70">
        <template slot-scope="scope">{{scope.row.quota_used | stoh}}</template>
      </el-table-column>
      <el-table-column sortable prop="account_quota" label="所有" align="center" width="70">
        <template slot-scope="scope">{{scope.row.account_quota | stoh}}</template>
      </el-table-column>
      <el-table-column
        sortable
        prop="created_at"
        label="创建时间"
        align="right"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" close-delay="0" width="100" content="添加">
            <div slot="reference">{{scope.row.created_at}}</div>
          </el-popover>
        </template>-->
      </el-table-column>
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

// var text = document.getElementById("text");

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
      loading: true,
      burl: decodeURIComponent(getQueryVariable("url")), // 请求地址
      clear_url:
        decodeURIComponent(getQueryVariable("url")) + "heroku/clear_cache",
      needrenew: localStorage.heroku_needrenew,
      text: "",
      tag: "",
      pending: "",
      pre_text: "",
      btn_text: "Send"
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
    },
    needrenewf: function() {
      console.log("needrenew");
      localStorage.heroku_needrenew = true;
    },
    showinfo(row, column, event, cell) {
      console.log(row);
      console.log(column);
      console.log(event);
      console.log(cell);
      switch (column.property) {
        case "buildpack_provided_description":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku logs -a " +
            row.name;
          break;
        case "updated_at":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku logs -a " +
            row.name;
          break;
        case "name":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku " +
            this.tag +
            " -a " +
            row.name;
          break;
        case "region":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku apps";
          break;
        case "web_url":
          this.text = "ssh://git@heroku.com/" + row.name + ".git";
          break;
        case "created_at":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku apps:create " +
            this.tag +
            " && heroku access:add malu@malu.me -a " +
            this.tag;
          break;
        case "email":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku apps:create " +
            this.tag +
            " && heroku access:add malu@malu.me -a " +
            this.tag;
          break;
        case "released_at":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku apps:destroy -a " +
            row.name;
          break;
        case "stack":
          this.text =
            "echo 'machine api.heroku.com password " +
            row.token +
            "'>.netrc && heroku apps:stacks -a " +
            row.name;
          break;
        default:
          break;
      }
      // console.log(this.text);
    },
    handleKeyCode: function(event) {
      console.log(event);
      if (event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault();
        this.get_text();
      }
    },
    get_text() {
      console.log(text.value);

      var data = text.value;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      // 把内容清空并把命令设置成黄色
      this.pending = "pending";
      // document.getElementById("pre").innerHTML = "";
      this.pre_text = "";
      this.btn_text = "........";

      // this对象传递给匿名函数
      var _this = this;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          _this.pending = "";
          console.log(this.responseText);
          if (this.status == 200) {
            // document.getElementById("pre").innerHTML = this.responseText;
            _this.pre_text = this.responseText ? this.responseText : "null";
          } else if (this.status == 0) {
            _this.pre_text = "Need login";
          } else {
            _this.pre_text = "error: " + this.status;
            // document.getElementById("pre").innerHTML = "error";
          }
          _this.btn_text = "Send";
        }
        // console.log(this.readyState);
        // }else{
        // }
      });

      xhr.open("POST", "https://heroku-m1.herokuapp.com/heroku/manage");

      xhr.send(data);
    },
    clear() {
      this.text = "";
      this.pre_text = "";
    }
  },
  mounted() {
    console.log("Api", this.burl);
    // localStorage.heroku_needrenew = true;
    // console.log(typeof(this.needrenew));
    if (this.url) {
      this.burl = this.url;
    }

    var getopt = { withCredentials: true };

    if (this.needrenew != "false") {
      var boj = {
        "Cache-Control": "no-cache"
      };
      getopt.headers = { ...getopt.headers, ...boj };
    }
    // console.log(getopt);
    // return;

    // axios.defaults.withCredentials = true;
    axios
      // .create({
      //   headers: {
      //     // 'Cache-Control': 'no-cache',
      //     // 'token' : 'erblbo2h87vh490uk94ul35du5',
      //     'Content-Type': 'application/json; charset=utf-8',
      //   },
      //   withCredentials: true
      // })
      .get(this.burl + "heroku", getopt)
      .then(response => {
        // console.log(response.data.data);
        this.tableData = response.data.data;
        // this.loading = false;
      })
      .catch(error => {
        console.log(error);
        console.log("ddd");
        window.location.href =
          this.burl + "login?URL=" + window.btoa(window.location.href);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
        localStorage.heroku_needrenew = false;
      });
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

button#send {
  padding: 3px;
  margin: 0;
  font-size: 15px;
  color: #bdbdbd;
  height: 23px;
  width: 70px;
  background-color: #262629;
  cursor: pointer;
  border: 1px solid #acacac;
  float: left;
}

textarea#text {
  height: 17px;
  float: left;
  background: #262629;
  color: aliceblue;
  margin: 0 5px;
  min-height: 17px;
}

input#tag {
  background: #262629;
  color: aliceblue;
  border: 1px solid #acacac;
  float: left;
  height: 19px;
  padding: 1px 5px;
  margin: 0 5px;
}

#text:focus,
#send:focus,
#tag:focus {
  outline: 0;
  color: #17c57d;
  border-color: #65c89f;
}
#pre:focus {
  color: #6a9e89;
}
#pre {
  padding: 0;
  text-align: left;
  float: left;
  /* width: 100%; */
  /* left: 0px; */
  /* right: 0px; */
  /* margin: 10px; */
  border: none;
  min-width: 500px;
  min-height: 100px;
  /* top: 10px; */
  display: block;
  margin-top: 10px;
  background: #323232;
  color: #b6b7b7;
}
.pending {
  color: yellow !important;
}
a:hover {
  cursor: pointer;
}
</style>