<template>
  <div id="test123">
    <div v-if="$slots.default">
      <span class="title-span">
      <i class="el-icon-location"></i>
        <slot></slot>
      </span>
    </div>
    <el-table :data="tableData" stripe height="440" style="width: 100%">
      <el-table-column sortable prop="add" label="地区" width="180"></el-table-column>
      <el-table-column sortable prop="count" label="数值" width="100"></el-table-column>
      <el-table-column sortable prop="ip" label="IP" width="100"></el-table-column>
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
        console.log(this.tableData);
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
/* #test123 {
  width: 400px;
} */
.title-span {
  float: left;
  /* text-align: left; */
  background-color: #d9d9d9;
  color: #2d2d30;
  /* width: 180px; */
  display: inline;
  padding: 2px 10px;
  font-weight: 900;
  font-size: 14px;
  border-radius: 2px;
}
#test123 >>> .el-table,
#test123 >>> .el-table__expanded-cell {
  color: #fff;
  background-color: rgba(255, 255, 255, 0);
}

#test123 >>> tr,
#test123 >>> th {
  background-color: rgba(255, 255, 255, 0);
  /* border-bottom: 1px solid rgba(255, 255, 255, 0) !important; */
}
#test123 >>> .el-table td,
#test123 >>> .el-table th.is-leaf {
  padding: 2px 0;
  font-size: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}
#test123 >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f5f7fa1f;
}
#test123 >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #2d2d30;
}
#test123
  >>> .el-table--striped
  .el-table__body
  tr.el-table__row--striped:hover
  td {
  background-color: #f5f7fa1f;
}
#test123 >>> .el-table::before {
  display: none;
}
#test123 >>> .warning-row {
  background-color: #ff5722 !important;
}
#test123 >>> .el-table--striped .el-table__body tr.warning-row td {
  background-color: #ff7950ca !important;
}
#test123 >>> .el-table--striped .el-table__body tr.warning-row:hover td {
  background-color: #ff5722 !important;
}
#test123 >>> .success-row {
  background-color: #f0f9eb !important;
}
#test123 >>> ::-webkit-scrollbar {
  width: 0.45em;
  height: 0.25em;
  position: absolute;
}

#test123 >>> ::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

#test123 >>> ::-webkit-scrollbar-track {
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