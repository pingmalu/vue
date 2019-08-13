<template>
  <div>
    <f2d0 color="l(0) 0:#262629 0.15:#7ec2f3 1:#1890ff" f2id="f1"></f2d0>
    <f2d0 color="l(0) 0:#262629 0.15:#8bf13c 1:#a6f16c" f2id="f2"></f2d0>
    <f2d0 color="l(0) 0:#262629 0.15:#ffef40 1:#fff373" f2id="f3"></f2d0>
    <transition name="el-zoom-in-center" appear>
      <!-- <C></C> -->
    </transition>
    <br />
    <br />
    <br />
    <upload></upload>
  </div>
</template>
 
<script>
import C from "@/components/demo/Car";
import upload from "@/components/demo/upload";
import f2d0 from "@/components/demo/f2d0";
export default {
  components: {
    C,
    upload,
    f2d0
  }
};
</script>

