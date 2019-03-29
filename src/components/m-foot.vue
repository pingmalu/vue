<template>
  <div id="malukepfoot">
    Copyright © 2010-2019
    <a href="http://www.miitbeian.gov.cn/" target="_blank">苏ICP备15011663</a> |
    <a href="http://cdn.malu.me/map/">分布</a> |
    <a href="http://cdn.malu.me/mon/">监控</a> |
    <a href="http://cdn.malu.me/searchmap/">爬虫</a> |
    <a href="https://s.malu.me/">搜索</a> |
    <a href="mailto:malu@malu.me">malu@malu.me</a>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#malukepfoot {
  position: fixed;
  bottom: 0;
  background: #000;
  width: 100%;
  opacity: 0.9;
  filter: alpha(opacity=90);
  _bottom: auto;
  _width: 100%;
  _position: absolute;
  _top: expression(
    eval(
      document.documentElement.scrollTop +
        document.documentElement.clientHeight-this.offsetHeight-(
          parseInt(this.currentStyle.marginTop, 10) ||0
        )- (parseInt(this.currentStyle.marginBottom, 10) ||0)
    )
  );
  -webkit-box-shadow: 1px 0 5px #000;
  -moz-box-shadow: 1px 0 5px #000;
  box-shadow: 1px 0 5px #000;
  left: 0;
  font-family: Lato, "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    "微软雅黑", sans-serif;
  color: #999;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  padding: 5px;
}
#malukepfoot a {
  color: #bebebe;
}
</style>
