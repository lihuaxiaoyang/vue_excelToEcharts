<template>
<div>
    <div ref="mapbox" class="box">
    </div>
    <div class="top_box" id="first_bar"></div>
    <div class="bottom_box" id="second_bar"></div>
</div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'Meigui',
  data(){
      return{};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.mychart = echarts.init(this.$refs.mapbox);
      this.mychart.setOption(this.$ec.ringOption);
      this.mychart = echarts.init(document.getElementById('first_bar'));
      this.mychart.setOption(this.$ec.oneBarOption);
      this.mychart = echarts.init(document.getElementById('second_bar'));
      this.mychart.setOption(this.$ec.twoBarOption);
    },
  },
};
</script>

<style scoped>
.box {
  /* display: inline-flex; */
  float: left;
  width: 35%;
  height: 800px;
  /* background-color: pink; */
  margin: auto;
  /* border: 2px solid aquamarine; */
  /* background-color: pink; */
}
.top_box{
  display: inline-flex;
  width:65%;
  height: 350px;
  /* background-color: black; */
}
.bottom_box{
  display: inline-flex;
  /* background-color: red; */
  width: 65%;
  height: 450px;
}
</style>

