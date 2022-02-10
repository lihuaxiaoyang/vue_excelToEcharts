<template>
  <div class="content row-flex-start" style="min-width:1000px;ovorflow-x:auto">
    <div class="left_map" id="left_map"  @click="showChinaMap"></div>
    <div class="right_opetate row-center" id="right_opetate">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
import china from '../../assets/json/china.json';
// import axios from 'axios';
echarts.registerMap('china', china);
// require('echarts/theme/macarons') // echarts theme
export default {
  data() {
    return {
      provinces: [ 'shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan' ],
      provincesText: [ '上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾' ],
      map: null,
    };
  },
  created() {
  },
  methods: {
    // 定义生成参数option方法
    getMapOpt(place) {
      const option = {
        backgroundColor: '#fff', // 地图背景颜色
        title: {
          text: '地图可视化',
          subtext: '可视化展示单位、营区、阵地的位置',
          left: 'center',
        },
        geo: {
          map: place ? place : 'china',
          label: {
            emphasis: {
              show: false,
            },
            // 不需要显示地名可直接删除normal此项
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0)',
              },
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#013C62',
              shadowColor: '#013C62',
              shadowBlur: 20,
              shadowOffsetX: -5,
              shadowOffsetY: 15,
              // areaColor: '#013C62', // 地图颜色
              borderColor: '#111', // 地图边线颜色
            },
            emphasis: {
              areaColor: '#f7fafb', // 鼠标移入颜色
            },
          },
        },
      };
      return option;
    },
    // 显示中国地图
    showChinaMap() {
      // this.map.dispose();
      const option = this.getMapOpt();
      this.map.setOption(option, true);
    },
    // 显示各省地图
    getProvinceMapOpt(provinceAlphabet) {
      // this.map.dispose();
      const data = require('../../assets/json/province/' + provinceAlphabet + '.json');
      echarts.registerMap(provinceAlphabet, data);
      const option = this.getMapOpt(provinceAlphabet);
      this.map.setOption(option, true);
    },
    // 初始化地图
    initMap() {
      const dom = document.getElementById('left_map');
      this.map = echarts.init(dom);
      const option = this.getMapOpt();
      if (option && typeof option === 'object') {
        this.map.setOption(option, true);
      }
      this.map.on('click', param => {
        event.stopPropagation(); // 阻止冒泡
        // 找到省份名
        const provinceIndex = this.provincesText.findIndex(x => {
          return param.name === x;
        });
        if (provinceIndex === -1) return;
        const provinceAlphabet = this.provinces[provinceIndex];
        // 重新渲染各省份地图
        this.getProvinceMapOpt(provinceAlphabet);
      });
    },
  },
  // 此时页面上的元素已经被渲染完毕了
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
};
</script>
<style scoped>
.left_map {
  width: 100%;
  height: 600px;
}
.right_opetate {
  flex: 1;
  height: 100%;
  background: #404a59
}
</style>
