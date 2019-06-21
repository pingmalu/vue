<template>
  <div>
    <transition name="el-zoom-in-center" appear>
      <C></C>
    </transition>
    <br>
    <br>
    <br>
    <upload></upload>
  </div>
</template>
 
<script>
import C from "@/components/demo/Car";
import upload from "@/components/demo/upload";
export default {
  components: {
    C,
    upload
  }
};
</script>

