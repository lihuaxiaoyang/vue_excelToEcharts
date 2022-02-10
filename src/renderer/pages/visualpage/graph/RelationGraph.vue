<template>
  <div id="graph" :style="{ width: '100%', height: '700px' }"></div>
</template>


<script>
var echarts = require("echarts");
export default {
  data(){
    return{

    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      const tempOption = this.$ec.relationOption;
      const tableData = this.$val.relationData;

      tableData.nodes.forEach((node) => {
        // console.log(node.category);
        switch (node.category) {
          case 0:
            node.symbolSize = 100;
            break;
          case 1:
            node.symbolSize = 70;
            break;
          case 2:
            node.symbolSize = 60;
            break;
          case 3:
            node.symbolSize = 50;
            break;
        }
      });

      tempOption.series[0].data = tableData.nodes;
      tempOption.series[0].links = tableData.links; 
      
      this.myechart = echarts.init(document.getElementById('graph'));
      this.myechart.off("click");
      this.myechart.setOption(tempOption);

      let that = this;
      this.myechart.on("click", function (params) {
        console.log("params")
        console.log(params)
        that.$emit("listenclick", params.data);
      });
    }
  },
}
</script>

<style scoped>

</style>