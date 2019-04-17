<template>
  <div>
    <div id="d5">
      <div class="wrapper">
        <svg width="100%" height="140">
          <text text-anchor="middle" x="50%" y="50%" class="text text-1">实验室</text>
          <text text-anchor="middle" x="50%" y="50%" class="text text-2">实验室</text>
          <text text-anchor="middle" x="50%" y="50%" class="text text-3">实验室</text>
          <text text-anchor="middle" x="50%" y="50%" class="text text-4">实验室</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "d5",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
#d5 {
  margin: 0 auto;
}


.wrapper{
    margin-top: 60px;
}
.text{
    font-size: 64px;
    font-weight: bold;
    text-transform: uppercase;
    fill: none;
    stroke-width: 2px;
    stroke-dasharray: 90 310;
    animation: stroke 6s infinite linear;
}
.text-1{
    stroke: #3498db;
    text-shadow: 0 0 5px #3498db;
    animation-delay: -1.5s;
}
.text-2{
    stroke: #f39c12;
    text-shadow: 0 0 5px #f39c12;
    animation-delay: -3s;
}
.text-3{
    stroke: #e74c3c;
    text-shadow: 0 0 5px #e74c3c;
    animation-delay: -4.5s;
}
.text-4{
    stroke: #9b59b6;
    text-shadow: 0 0 5px #9b59b6;
    animation-delay: -6s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
</style>
