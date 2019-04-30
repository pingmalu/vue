<template>
  <div id="box">
    <div v-if="$slots.default">
      <span class="title-span">
        <slot></slot>
      </span>
    </div>
    <el-table :data="tableData" stripe height="430" style="width: 100%">
      <el-table-column sortable prop="add" label="地区" width="180"></el-table-column>
      <el-table-column sortable label="SIZE" width="75">
        <template slot-scope="scope">
          {{ scope.row.count | bytesToSize}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="ip" label="IP" width="100" align="right"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      logurl: "//c1.malu.me/qiniu/topip"
    };
  },
  props: ["url"],
  methods: {},
  mounted() {
    if (this.url) {
      this.logurl = this.url;
    }
    axios
      .get(this.logurl)
      .then(response => {
        // console.log(response.data.data);
        response.data.data.ips.forEach((element, index, arr) => {
          // let one;
          // console.log(element,index,arr);
          // this.tableData[index]['ip'] = element;
          this.tableData.push({
            ip: element,
            add: response.data.data.adds[index],
            count: response.data.data.traffic[index]
          });

          //  if(element.time && element.type){
          //  this.tableData.push(element);
          //  }
        });
        // console.log(this.tableData);
        // this.tableData = response.data.data;
      })
      .catch(error => {
        // console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
<style scoped>
/* #box {
  width: 400px;
} */
.title-span {
  float: left;
  /* text-align: left; */
  background-color: #939393;
  color: #2d2d30;
  /* width: 180px; */
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
  /* border-bottom: 1px solid rgba(255, 255, 255, 0) !important; */
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
/* .el-table th, .el-table tr {
  background-color: rgba(255, 255, 255, 0) !important;
}
.el-table,
.el-table__expanded-cell {
  background-color: rgba(255, 255, 255, 0) !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid rgba(255, 255, 255, 0) !important;
} */
</style>