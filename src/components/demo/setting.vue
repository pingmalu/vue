  <template>
  <div id="setting">
    <el-table
      :data="tableData.filter(data => !search || data.url.value.toLowerCase().includes(search.toLowerCase()))"
      @cell-dblclick="celledit"
    >
      <el-table-column prop="url" label="URL">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.url.edit"
            ref="url"
            size="mini"
            v-model="scope.row.url.value"
            @blur="scope.row.url.edit = false;handleBlur()"
          ></el-input>
          <span v-else>{{ scope.row.url.value }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="handleAdd()">添加</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          url: "http://malu.me"
        },
        {
          url: "http://www.malu.me"
        }
      ],
      search: ""
    };
  },
  created() {
    this.formatData();
  },
  methods: {
    //表格数据格式化成我们想要的数据
    /* {
          date: {
            value: '',
            edit: false//编辑状态
          }
        } */
    formatData() {
      this.tableData.forEach(item => {
        for (let key in item) {
          console.log(item);
          item[key] = {
            value: item[key],
            edit: false
          };
        }
      });
      console.log(this.tableData);
    },
    celledit(row, column, cell, event) {
      if (row[column.property]) {
        row[column.property].edit = true;
        this.$nextTick(item => {
          this.$refs[column.property].focus();
        });
        // setTimeout(() => {
        // this.$refs[column.property].focus();
        // }, 20);
      }
    },
    handleBlur() {
      localStorage.urllist = JSON.stringify(this.tableData);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.tableData.splice(index, 1);
      localStorage.urllist = JSON.stringify(this.tableData);
    },
    handleAdd() {
      let url = { value: "http://malu.me", edit: false };
      this.tableData.push({ url });
      localStorage.urllist = JSON.stringify(this.tableData);

      // localStorage.urllist = JSON.stringify(this.tableData);
      // console.log(localStorage.urllist);
    }
  },
  mounted() {
    this.tableData = JSON.parse(localStorage.urllist);

    window.onbeforeunload = e => {
      //刷新时弹出提示
      // localStorage.lastname = this.upurl ? this.upurl : "";
      // localStorage.urllist = this.tableData ? this.tableData : [];
      localStorage.urllist = JSON.stringify(this.tableData);

      //   return "aa";
    };
  }
};
</script>

<style scoped>
#setting >>> .el-table--border::after,
#setting >>> .el-table--group::after,
#setting >>> .el-table::before {
  display: none;
}
#setting >>> .el-table td,
#setting >>> .el-table th.is-leaf {
  border-bottom: 1px solid #494949;
}
#setting >>> .el-table th,
#setting >>> .el-table tr {
  background-color: #262629;
}
#setting >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #3c3c41;
}
#setting >>> .el-table {
  color: #b5b6b8;
}
</style>