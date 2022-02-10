<template>
<div>
    <el-select v-model="value1" placeholder="请选择可视化类型" class="viewSelect" clearable @change="controlType" filterable @clear="controlBoth">
      <el-option v-for="item in selectOption" :key="item.value" :label="item.value" :value="item.value" >
      </el-option>
    </el-select>

    <el-select v-model="value2" placeholder="请选择单位" :display="false" class="viewDepartment" clearable v-if="controlDisplay" filterable @change="getSelectValue">
      <el-option v-for="item in departmentOption" :key="item.value" :label="item.value" :value="item.value"></el-option>
    </el-select>
    <el-cascader
        :options="this.$val.mapSelectOptions"
        v-model="value3"
        :props="props"
        @change="handleChange"
        clearable
        class = "mulSelect"
        :show-all-levels="false"
        filterable
        v-if="controlDisplay2"
        placeholder="请选择可视化筛选项"
        >
    </el-cascader>
    <div ref="piebox" class="boxone" v-if="true" id = "pieBox">

    </div >

    <!-- 这里控制显示与隐藏不能用v-if -->
    <div id="main_bottom" v-show="textShow">

    </div>
</div>
</template>

<script>
import echarts from 'echarts';
import china from "../../assets/json/china.json";
echarts.registerMap("china", china);
export default {
  name: 'Meigui',
  data(){
      return{
        controlDisplay2:true,
        props:{ expandTrigger: 'hover',multiple:true},
        //省级地名数据
        provinces: [
        "shanghai",
        "hebei",
        "shanxi",
        "neimenggu",
        "liaoning",
        "jilin",
        "heilongjiang",
        "jiangsu",
        "zhejiang",
        "anhui",
        "fujian",
        "jiangxi",
        "shandong",
        "henan",
        "hubei",
        "hunan",
        "guangdong",
        "guangxi",
        "hainan",
        "sichuan",
        "guizhou",
        "yunnan",
        "xizang",
        "shanxi1",
        "gansu",
        "qinghai",
        "ningxia",
        "xinjiang",
        "beijing",
        "tianjin",
        "chongqing",
        "xianggang",
        "aomen",
        "taiwan",
        ],
        //名字对应索引
        provincesText: [
        "上海",
        "河北",
        "山西",
        "内蒙古",
        "辽宁",
        "吉林",
        "黑龙江",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "海南",
        "四川",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "北京",
        "天津",
        "重庆",
        "香港",
        "澳门",
        "台湾",
        ],


        //控制单位选择框是否显示
        controlDisplay:false,
        //可视化内容选择框
        selectOption:[
            {value:'单位人员编制可视化'},
            {value:'联勤保障力量可视化'}
            ],
        departmentOption:[{value:'选项2'}],
        value1:null,
        value2:null,
        value3:[],
        //控制文本是否显示
        textShow:true,
        outPutData:[],
      }
  },
  mounted() {
    this.getdata();
    //新添加
    //在DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    //可视化筛选项选择时触发事件
    handleChange(param){
        this.getGuaranteeData(param);
    },
    //当可视化类型筛选项清空时，下方条件筛选框全部隐藏。
    controlBoth(){
        this.controlDisplay = false;
        this.controlDisplay2 = false;
    },
    //获取联勤保障力量省份信息数据
    getGuaranteeData(param){
      const departmentType = [];
      for(let i = 0;i <param.length;i++){
          if(param[i][0]=="单位类别"){
              departmentType.push(param[i][1]);
          }
      }
      var GuaranteeSQL = '';
      if(departmentType.length == 0){
          GuaranteeSQL = 'SELECT * from associatehelp where isdel = 0 and province != "" and class = ""';
      }else if(departmentType.length == 1){
          GuaranteeSQL = `SELECT * from associatehelp where isdel = 0 and province != "" and class = "${departmentType[0]}"`;
      }else if(departmentType.length ==2){
          GuaranteeSQL = `SELECT * from associatehelp where isdel = 0 and province != "" and (class = "${departmentType[0]}" or class = "${departmentType[1]}")`;
      }else{
           GuaranteeSQL = 'SELECT * from associatehelp where isdel = 0 and province != ""';
          for(let i = 0;i<departmentType.length;i++){
              if(i == 0){
              GuaranteeSQL +=`and (class = "${departmentType[i]}"`;

              } else if(i == (departmentType.length-1)){
                  GuaranteeSQL +=` or class = "${departmentType[i]}")`;
              }else{
                  GuaranteeSQL +=` or class = "${departmentType[i]}"`;
              }
          }
      }
      //数据存储容器
      const guaranteeData = [];
      //单位数据存储容器
      //省份名称；编制人员数量
      this.$db.all(GuaranteeSQL, (err, restemp) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            desc: err,
          });
        } else {
            if(restemp.length == 0){
                    const option = this.getMapOpt();
                    option.series.data = guaranteeData;
                    this.map.setOption(option, true);
            } else{
                for(let i = 0;i <restemp.length;i++){
                    var temObj = {name:'',value:[],label:'',type:'',fun:'',depName:''};
                    temObj.name = restemp[i].province;
                    (temObj.value).push(this.$xy.provinceLocDataList[restemp[i].province][0]);
                    (temObj.value).push(this.$xy.provinceLocDataList[restemp[i].province][1]);
                    (temObj.value).push(parseInt(restemp[i].bianzhi));
                    temObj.type = restemp[i].class;
                    temObj.depName = restemp[i].name;
                    guaranteeData.push(temObj);
                }
                    const option = this.getMapOpt();
                    option.series.data = guaranteeData;
                    this.map.setOption(option, true);
            }
        }
      });
    },


    //地图配置相关
    getMapOpt(place) {
      const option = {
        backgroundColor: "#404a59", // 地图背景颜色
        title: {
          text: "地图可视化",
          subtext: "联勤保障力量可视化",
          left: "center",
          itemGap: 0,
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: (param) => {
                  var str = `单位名称：${param.data.depName} <br/> 级别：${param.data.type} <br/> 编制人数：${param.data.value[2]}`
                  return str;
          },
        },
        geo: {
          map: place ? place : "china",
          label: {
            emphasis: {
              show: false,
            },
            // 不需要显示地名可直接删除normal此项
            normal: {
              show: false, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0)",
              },
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderWidth: 0.5,
              // areaColor: '#013C62', // 地图颜色
              borderColor: "#111", // 地图边线颜色
            },
            emphasis: {
              areaColor: "#f7fafb", // 鼠标移入颜色
            },
          },
        },
        series: {
          name: "营区实力信息",
          type: "effectScatter",
          coordinateSystem: "geo",
          data: this.locationlist,
          symbolSize: 12,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: (param) => {  
                  return param.name;
              },
              position: "right",
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: "#f4e925",
              shadowBlur: 10,
              shadowColor: "#333",
            },
          },
          zlevel: 1,
          data: []
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
    getProvinceMapOpt(provinceAlphabet,realName) {
      // console.log("realName");
      // console.log(realName);
      // this.map.dispose();
      const data = require("../../assets/json/province/" +
        provinceAlphabet +
        ".json");
      echarts.registerMap(provinceAlphabet, data);
      const option = this.getMapOpt(provinceAlphabet);
      this.map.setOption(option, true);
    },
    // 初始化地图
    initMap() {
      const dom = document.getElementById("pieBox");
      this.map = echarts.init(dom);
      const option = this.getMapOpt();
      if (option && typeof option === "object") {
        this.map.setOption(option, true);
      }
      this.map.on("click", (param) => {
        event.stopPropagation(); // 阻止冒泡
        if (param.componentType === "series" && this.vischoose === "保障力量") {
          this.campvalue = [param.data.value[5], param.data.name];
          this.dialogFormVisible = true;
        } else if (param.componentType === "geo") {
          // 找到省份名
          const provinceIndex = this.provincesText.findIndex((x) => {
            return param.name === x;
          });
          if (provinceIndex === -1) return;
          const provinceAlphabet = this.provinces[provinceIndex];

          // 重新渲染各省份地图
          this.getProvinceMapOpt(provinceAlphabet,param.name);
        }
      });
      var _this = this;
      this.map.on('contextmenu',function(param){
            //   const option = _this.getMapOpt();
              _this.map.setOption(option, true);

      })
    },
    //根据选中单位获取单位三类别人员编制数量和现有数量
    getSelectValue(params){

        const peopleSQL = `SELECT * FROM department WHERE isdel = 0 and name = '${params}'`;
        this.$db.all(peopleSQL,(err,restemp)=>{
            if(err){
                this.$logger(err);
                this.$Notice.error({
                    title:'单位人员信息查询失败',
                    desc:err,
                });
            }else{
                var firstDis=[
                    {name:'军官编制',value:restemp[0].jgbianzhi},
                    {name:'士兵编制',value:restemp[0].shibingbianzhi},
                    {name:'文职编制',value:restemp[0].wenzhibianzhi},
                ];

                var secondDis = [
                    {name:'军官实有',value:restemp[0].jgshiyou},
                    {name:'士兵实有',value:restemp[0].shibingshiyou},
                    {name:'文职实有',value:restemp[0].wenzhishiyou},
                ]
                this.$ec.pieOption.series[0].data = firstDis;
                this.$ec.pieOption.series[1].data = secondDis;
                this.init();
                var str = '<div style="font-size:12px;color: black"><h1 style="display: inline-block;">'+restemp[0].name+ 
                '现有编制额：'+restemp[0].bianzhi+'人；实有人员数量：'+restemp[0].shiyou+'人</h1></div><div>';

                var str = '<div style="font-size:12px;"><h1 style="display: inline-block;color: red;">' + restemp[0].name +
                '<h1 style="display: inline-block;">现有编制额：</h1>' + '<h1 style="display: inline-block;color: red;">' + restemp[0].bianzhi + '</h1>' +
                '<h1 style="display: inline-block;">人；实有人员数量：</h1>' + '<h1 style="display: inline-block;color:red">' + restemp[0].shiyou + '</h1>' +
                '<h1 style="display: inline-block;">人。</h1>'
                + '</div>'
                document.getElementById('main_bottom').innerHTML = str;
            }
        })
    },
    //当选择单位人员可视化时，加载单位选择下来列表
    controlType(params){
        const dom = document.getElementById("pieBox");
        this.map = echarts.init(dom);
        if(params == "单位人员编制可视化"){
            this.textShow = true;
            this.controlDisplay = true;
            this.controlDisplay2 = false;
            this.map.clear();
            this.init();
        }
        if(params == "联勤保障力量可视化"){
            this.textShow = false;
            this.controlDisplay = false;
            this.controlDisplay2 = true;
            // document.getElementById('pieBox').innerHTML = '';
            this.map.clear();
            // this.mychart = echarts.init(this.$refs.piebox);
            // this.mychart.setOption(this.$ec.mapOption);
            this.initMap();
        }
    },
    init() {
      this.mychart = echarts.init(this.$refs.piebox);
      this.mychart.setOption(this.$ec.pieOption);
    },

    //获取单位信息，并回传至“viewDepartment”下拉框
    getdata(){
      const departmentOption = [];
      const campSQL = 'SELECT * from department WHERE isdel = 0';
      this.$db.all(campSQL, (err, restemp) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '单位信息查询失败',
            desc: err,
          });
        } else {
            for(let i = 0;i<restemp.length;i++){
                const obj = { value: 0, name: '' };
                obj.value=restemp[i].name;
                departmentOption.push(obj);
            }
            this.departmentOption = departmentOption;
        }
      });
    },
  },
};
</script>
<style scoped>
.boxone {
  width: 70%;
  height: 850px;
  /* background-color: pink; */
  margin: auto;
  /* border: 2px solid aquamarine; */
  position: relative;
  /* z-index: 2; */
}
.viewSelect{
    width: 190px;
    position: absolute;
    top:15%
}
.viewDepartment{
    width: 190px;
    position: absolute;
    top:20%;
}
.mulSelect{
    /* left:3%;  */
    top: 20%;
    width: 190px;
    position: absolute;
    /* z-index:99; */
}
div,h1{
  color: black;
}
</style>

