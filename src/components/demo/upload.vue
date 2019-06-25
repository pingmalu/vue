<template>
  <div>
    <!-- <el-input v-model="upurl" placeholder="上传地址">
      <template slot="prepend">http://</template>
    </el-input>-->
    <el-select
      v-model="upurl"
      placeholder="请选择"
      style="width:500px"
      @change="save_selected_onchage"
    >
      <el-option
        v-for="item in tableData"
        :key="item.url.value"
        :label="item.url.value"
        :value="item.url.value"
      ></el-option>
    </el-select>
    <br>
    <br>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="upurl"
      name="b"
      :data="title"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="beforeAvatarUpload"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>
<script>
function time(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date
    .toJSON()
    .substr(0, 19)
    .replace("T", " ")
    .replace(/-/g, ".");
}
export default {
  data() {
    return {
      upurl: localStorage.lastname,
      title: {
        a: "vue"
      },
      fileList: [],
      tableData: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      // console.log(typeof this.urllist);
      // this.urllist.add(this.upurl);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      this.title.a = "[vue][" + time(file.raw.lastModified) + "]";
    },
    save_selected_onchage() {
      localStorage.lastname = this.upurl ? this.upurl : "";
    }
  },
  mounted() {
    this.tableData = JSON.parse(localStorage.urllist);

    // window.onbeforeunload = e => {
    //   //刷新时弹出提示
    //   localStorage.lastname = this.upurl ? this.upurl : "";
    //   // localStorage.urllist = this.urllist ? new Set() : new Set();
    //   //   return "aa";
    // };
  }
};
</script>
