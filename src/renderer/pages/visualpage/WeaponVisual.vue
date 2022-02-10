<template>
  <div>
  <div id="header">
    <h1>Excel可视化系统</h1>
    <span class="fileinput-button" id="btnLine">
		<span>选择文件（线、柱）</span>
		<input type="file" id="inputLine"
               accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
               @change="excelToECharts($event)" onclick="this.value=''">
	</span>
    <span class="fileinput-button" id="btnPie">
		<span>选择文件（饼图）</span>
		<input type="file" id="inputPie"
               accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
               @change="excelToECharts($event)" onclick="this.value=''">
	</span>
</div>

<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
<div id="ECharts_main">
    <div id="select_tip">请选择文件</div>
</div>

</div>

</template>

<script>
import download from '../../utils/download';
import echarts   from 'echarts';
import XLSX from 'XLSX';


export default {
    name: 'ss',
    data(){
        return{};
    },
    created(){

    },
    methods:{


// 数据处理入口
 excelToECharts(event) {

    this.excelToData(event);
},
// 读取Excel转换为json
 excelToData(event) {
     console.log('this');
     console.log(this);
    // 获取input标签的id，用这个来控制显示什么图咯
    let inputId = event.srcElement.id;
    // 获取文件对象
    let files = event.target.files;
    // 如果有文件
    if (files.length) {
        // 初始化一个FileReader实例
        let reader = new FileReader();
        let file = files[0];
        // 看下文件是不是xls或者xlsx的
        let fullName = file.name;   // 全名
        let filename = fullName.substring(0, fullName.lastIndexOf("."));    // 文件名
        let fixName = fullName.substring(fullName.lastIndexOf("."), fullName.length);   // 后缀名
        var _this = this;
        // 处理excel表格
        if (fixName == ".xls" || fixName == ".xlsx") {
            reader.onload = function (ev) {
                let data = ev.target.result;
                // 获取到excel
                let excel = XLSX.read(data, {type: 'binary'});
                // 获取第一个标签页名字
                let sheetName = excel.SheetNames[0];
                // 根据第一个标签页名，获取第一个标签页的内容
                let sheet = excel.Sheets[sheetName];
                // 转换为JSON
                let sheetJson = XLSX.utils.sheet_to_json(sheet);

                // 转换成json后，根据对应的图，转成对应的格式
                if (inputId == 'inputLine') {
                    // 线图
                    _this.getLineChartFromJson(sheetJson, filename);
                } else if (inputId == 'inputPie') {
                    // 饼图
                    _this.getPieChartFromJson(sheetJson, filename);
                }

            }
        } else {
            alert("起开，只支持excel")
        }
        reader.readAsBinaryString(file);
    }
},

// 通过表格数据的json，获取列名，返回列名的数组
getColName(sheetJson) {
    // 遍历json的第一行，获取key
    let keys = [];
    for (let key in sheetJson[0]) {
        keys.push(key)
    }
    return keys;
},

// 饼图的数据封装及显示
getPieChartFromJson(sheetJson, filename) {
    // 获取所有列名
    let keys = this.getColName(sheetJson);
    // 获取所有项目
    let items = [];
    for (let i in sheetJson) {
        items.push(sheetJson[i][keys[0]]);
    }
    // 获取所有数据
    let sheetData = [];
    for (let i in sheetJson) {
        sheetData.push({'name': sheetJson[i][keys[0]], 'value': sheetJson[i][keys[1]]});
    }
    // 构造series要的数据
    let datas = {};
    datas.name = keys[0];           // 名字
    datas.type = 'pie';             // 饼图
    datas.radius = '55%';           // 图形大小
    datas.center = ['40%', '50%'];  // 图的位置
    datas.data = sheetData;         // 图的数据
    datas.itemStyle = {             // 项目样式，鼠标移到上面的阴影
        emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };
    this.dataToPieChart(filename, items, datas);
},

// 饼图数据展现
dataToPieChart(title, items, datas) {
    // 发现每次执行init的时候会在给的div标签中加入一个_echarts_instance_的属性，后面再init的话就不行了
    // 所以每次先看下有没有这个属性，删掉他
    // console.log(document.getElementById('ECharts_main').getAttribute("_echarts_instance_"))
    document.getElementById('ECharts_main').innerHTML = "";
    document.getElementById('ECharts_main').removeAttribute('_echarts_instance_');
    // document.getElementById('ECharts_main').removeAttribute("document.getElementById('_echarts_instance_')");

    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('ECharts_main'));

    // 指定图表的配置项和数据
    let option = {
        title: {
            text: title,
            x: 'center',
            y: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 30,
            bottom: 20,
            data: items,
        },
        series: datas,
        toolbox: {
            show: true,
            left: 'right',
            feature: {
                dataView: {},
                magicType: {},
                saveAsImage: {}
            }
        }
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
},

// 线图的数据封装及显示
getLineChartFromJson(sheetJson, filename) {

    // 如果有结果，处理结果
    if (sheetJson.length) {
        // 获取所有列名
        let keys = this.getColName(sheetJson);

        // 处理一下作为x轴的列名和数据
        let xZhou = {};
        xZhou.name = keys.splice(0, 1);
        let xDatas = [];
        for (let i in sheetJson) {
            xDatas.push(sheetJson[i][xZhou.name]);
        }
        xZhou.data = xDatas;

        // 处理主体数据
        let datas = [];
        for (let i in keys) {
            let one = {};       // 一组
            one.name = keys[i]; // 名称
            one.type = 'line';  // 图表类型
            one.smooth = true;  // 平滑的线
            let point = [];     // 记录这一组的所有点
            for (let idx in sheetJson) {
                // 把这组的点push到数组中
                point.push(sheetJson[idx][one.name]);
            }
            one.data = point;
            // 把这组数据添加到主体数据中
            datas.push(one)
        }

        // 调用展现的方法
        this.dataToLineChart(filename, keys, xZhou, datas);

    }
},

// 线图数据展现
dataToLineChart(title, keys, xZhou, datas) {
    // 发现每次执行init的时候会在给的div标签中加入一个_echarts_instance_的属性，后面再init的话就不行了
    // 所以每次先看下有没有这个属性，删掉他
    // console.log(document.getElementById('ECharts_main').getAttribute("_echarts_instance_"))
    document.getElementById('ECharts_main').innerHTML = "";
    document.getElementById('ECharts_main').removeAttribute('_echarts_instance_');
    // document.getElementById('ECharts_main').removeAttribute("document.getElementById('_echarts_instance_')");

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ECharts_main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: title,
            x: 'center',
            y: 'bottom'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: keys,
            orient: 'vertical',
            x: 'right',
            y: 'center'
        },
        xAxis: xZhou,
        yAxis: {},
        series: datas,
        toolbox: {
            show: true,
            left: 'right',
            feature: {
                dataView: {},
                magicType: {
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                saveAsImage: {}
            }
        }
    };

    console.log(option);
    // debugger;
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
},
    },
};



</script>
<style lang="less" scoped>
html, body {
    height: 100%;
    margin: 0;
}

/*图表的样式*/
#ECharts_main {
    width: 90%;
    height: 600px;
    border: 1px solid #666666;
    margin: 5px auto;
    padding: 10px 0;
    position: relative;
}

#select_tip {
    width: 300px;
    height: 70px;
    font-size: 3em;
    font-weight: 700;
    color: #aaaaaa;
    border: 3px dotted;
    text-align: center;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

#header {
    width: 70%;
    height: 100px;
    margin: 0px auto;
}

#footer {
    width: 70%;
    margin: 0px auto;
}



.fileinput-button {
    position: relative;
    display: inline-block;
    overflow: hidden;
    border: 1px solid #eaeaea;
    padding: 7px 10px;
    border-radius: 4px;
    background: #950904;
    color: #fff;
    font-weight: bold;
}

.fileinput-button input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    // -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
}

.fileinput-button :hover {
    cursor: pointer;
}
</style>

