<template>
  <div id="myEcharts" :style="{ width: '1200px', height: '400px' }"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
let myEcharts = echarts;

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  myEcharts.dispose;
});

function initChart() {
  let chart = myEcharts.init(document.getElementById("myEcharts"));
  chart.setOption({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["流量", "访问数"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "流量",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [
          0, 0, 4000, 19000, 38000, 56000, 62000, 37000, 16000, 38000, 63000,
          42000, 21000, 10000, 4000, 2000, 0, 0,
        ],
      },
      {
        name: "访问数",
        type: "line",
        stack: "Total",
        smooth: true,
        data: [
          0, 0, 0, 3000, 3500, 19000, 2000, 1500, 18000, 20000, 16000, 10000,
          8000, 2000, 1000, 0, 0, 0,
        ],
      },
    ],
  });
  window.onresize = function () {
    chart.resize();
  };
}
</script>
