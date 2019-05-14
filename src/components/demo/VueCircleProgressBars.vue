<template>
  <svg class="stat-circle" viewBox="1.6 1.6 16.8 16.8" :width="svgwidth">
    <defs>
      <linearGradient x1="1" y1="0" x2="0" y2="0" id="gradient">
        <stop offset="0%" stop-color="#4352f3"></stop>
        <stop offset="100%" stop-color="#ab5aea"></stop>
      </linearGradient>
    </defs>
    <circle class="bg" cx="10" cy="10" r="8"></circle>
    <circle class="progress" cx="10" cy="10" r="8" :data-percentage="p" stroke="url('#gradient')"></circle>
    <text x="62%" y="70%">{{ p }}%</text>
  </svg>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    p: {
      default: 90
    },
    svgwidth: {
      default: "45px"
    }
  },
  mounted: function() {
    var $statCircle = document.querySelectorAll(".stat-circle circle");
    for (var i = 0; i < $statCircle.length; i++) {
      var p = parseFloat($statCircle[i].dataset.percentage);
      var off = -51 - (51 / 100) * p;
      new TweenMax.to($statCircle[i], 0.8, {
        strokeDashoffset: off
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.stat-circle {
  //   width: 45px;
  circle.bg {
    fill: none;
    // stroke: #f0f1f550;
    stroke-width: 0.8;
  }
  circle.progress {
    fill: none;
    stroke-width: 0.8;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: round;
  }
  text {
    font-size: 5px;
    text-anchor: middle;
    fill: #fff;
  }
}
</style>
