<template>
  <div id="echartsContainer" class="echarts_container">
    <!-- 标题盒子 -->
    <el-row :gutter="20" style="width:98%;margin-left: 1.125rem">
      <el-col :span="8">
        <div class="grid-content bg-purple1">
          <h1 class="up_class">XXXXXX</h1>
          <h1 class="down_class">人员总计</h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple2">
          <h1 class="up_class">XXXXXX</h1>
          <h1 class="down_class">单位总计</h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple3">
          <h1 class="up_class">XXXXXX</h1>
          <h1 class="down_class">物资总计</h1>
        </div>
      </el-col>
    </el-row>
    <!-- 地图可视化 -->
    <div id="MapEcharts" class="map_class">
      <!-- <CampVisual></CampVisual> -->
    </div>
    <!-- 大盒子包裹两个柱状图 -->
    <div class="combinatin_class">
      <!-- 单柱可视化 -->
      <div id="BarEcharts" class="bar_class"></div>
      <!-- 双柱可视化 -->
      <div id="DoubleBarEcharts" class="double_bar_class"></div>
    </div>
    <!-- 剩余两个饼图与环图按照行内块元素排列 -->
    <!-- 饼图可视化 -->
    <div id="PieEcharts" class="pie_class"></div>
    <!-- 环图可视化 -->
    <div id="RingEcharts" class="ring_class"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
import china from "../../assets/json/china.json";
import CampVisual from './CampVisual.vue';
import "echarts-wordcloud/dist/echarts-wordcloud"
import "echarts-wordcloud/dist/echarts-wordcloud.min";
echarts.registerMap("china", china);

export default {
  components: {
    CampVisual,
  },
  data() {
    return {
      // screenHeight:0,
    }
  },
  mounted() {
    //尺寸变化时触发事件（目前使用不到）
    // const dom = document.getElementById("MapEcharts");
    // this.myecharts = echarts.init(dom);
    // const _this = this;
    // window.addEventListener('resize',()=>{
    //   var canvasWidth = document.getElementById('echartsContainer').offsetWidth;
    //   _this.myecharts.resize({width:canvasWidth})
    // })
    //获取屏幕高度
    // this.screenHeight = window.screen.height;
    this.init();
  },
  methods: {
    init() {
      this.mychart = echarts.init(document.getElementById('BarEcharts'));
      this.mychart.setOption(this.$ec.oneBarOption);
      this.mychart = echarts.init(document.getElementById('DoubleBarEcharts'));
      this.mychart.setOption(this.$ec.twoBarOption);
      this.mychart = echarts.init(document.getElementById('MapEcharts'));
      this.mychart.setOption(this.$ec.LoginMapOption);
      this.mychart = echarts.init(document.getElementById('PieEcharts'));
      this.mychart.setOption(this.$ec.ringOption);

      // const tempOption = this.$ec.relationOption;
      // const tableData = this.$val.relationData;

      // tableData.nodes.forEach((node) => {
      //   // console.log(node.category);
      //   switch (node.category) {
      //     case 0:
      //       node.symbolSize = 100;
      //       break;
      //     case 1:
      //       node.symbolSize = 70;
      //       break;
      //     case 2:
      //       node.symbolSize = 60;
      //       break;
      //     case 3:
      //       node.symbolSize = 50;
      //       break;
      //   }
      // });

      // tempOption.series[0].data = tableData.nodes;
      // tempOption.series[0].links = tableData.links;    
      this.mychart = echarts.init(document.getElementById('RingEcharts'));
      this.mychart.setOption(this.$ec.cloudWorldOption);
    }
  },
}
</script>
<style scoped>
@import "./VisualPageCss.css";
</style>