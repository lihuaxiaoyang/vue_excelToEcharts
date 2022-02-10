//人员信息可视化-人员数量统计
const ringOption = {
    title: {
        text: '人员数量统计',
        subtext: '人员类别：军官、文职人员、士兵',
        textStyle: {
            fontSize: 22, //字体大小
            // color: '#CDDDF7' //字体颜色
            // color: 'black' //字体颜色
        },
    },
    // color:['#5470C6','#91CC75','#FAC858','#EE6666','#73C0DE'],
    color: ['#9a8ab9', '#DF97C7', '#8DD3E8'],
    tooltip: {
        trigger: 'item'
    },
    legend: {
        textStyle: {
            fontSize: 16, //字体大小
            // color: '#CDDDF7' //字体颜色
            // color: 'black' //字体颜色
        },
        top: '10%',
        left: 'center'
    },
    grid: {
        top: '80%'
    },
    series: [{
        name: '人员数量统计',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            // borderRadius: 10,
        },
        label: {
            show: false,
            position: 'center'
        },
        emphasis: {
            label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
            }
        },
        data: [
            { value: 580, name: '军官' },
            { value: 484, name: '文职人员' },
            { value: 300, name: '士兵' }
        ]
    }]
};

//人员信息可视化-岗位人员统计-士兵
const oneBarOption = {
    title: {
        text: '岗位人员统计',
        subtext: 'y轴为人员数量，x轴为岗位类型',
        textStyle: {
            fontSize: 22, //字体大小
            // color: '#CDDDF7' //字体颜色
            // color: 'black' //字体颜色
        },
    },

    // color: [
    //     "#f89588",
    //     "#63b2ee",
    //     "#00FF7F",
    //     "#f89588",
    //     "#63b2ee",
    //     "#00FF7F",
    // ],
    color: ['#8DD3E8'],

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                // color: '#999'
            }
        }
    },
    legend: {
        padding: [0, 0, 200, 0],
        textStyle: {
            fontSize: 10, //字体大小
            // color: '#CDDDF7' //字体颜色
        },
        data: ['士兵']
    },
    xAxis: [{
        type: 'category',
        // name:'岗位类别',
        axisLabel: { interval: 0, rotate: 40 },
        data: ['保障卡管理', '出纳', '司务长', '炊事员', '给养员', '食堂管理', '油料员', '油料化验员', '油料保管员', '采购员', '卫生员', '驾驶员', '汽车维修工', '动力电源维修工', '营房维修工', '电工', '各类保管员', '养殖员', '种植员', '其他'], //长度20
        axisPointer: {
            type: 'shadow'
        },
        axisLine: { //这是x轴文字颜色
            lineStyle: {
                // color: "#CDDDF7",
            }
        }
    }],
    grid: {
        y2: 100,
    },
    yAxis: [{
        type: 'value',
        // name: '人员数量',
        min: 0,
        axisLine: { //这是x轴文字颜色
            lineStyle: {
                // color: "#CDDDF7",
            }
        }
    }],
    series: [{
        name: '士兵',
        type: 'bar',
        data: [0, 1, 1, 13, 10, 22, 9, 4, 8, 13, 4, 5, 7, 7, 16, 13, 45, 7, 1, 45],
        label: {
            show: true
        },
    }, ],
}



//人员信息可视化-岗位人员统计-军官和文职人员
const twoBarOption = {
    title: {
        text: '岗位人员统计',
        subtext: 'y轴为人员数量，x轴为岗位类型',
        textStyle: {
            fontSize: 22, //字体大小
            // color: '#CDDDF7' //字体颜色
            // color: 'black' //字体颜色
        },
    },
    color: ['#9a8ab9', '#DF97C7'],

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                // color: '#999'
            }
        }
    },
    legend: {
        padding: [0, 0, 200, 0],
        textStyle: {
            fontSize: 10, //字体大小
            // color: '#CDDDF7' //字体颜色
        },
        data: ['军官', '文职人员']
    },
    xAxis: [{
        type: 'category',
        // name:'岗位类别',
        data: ['战勤', '财务', '军需', '能源', '采购', '卫生', '军交', '营房', '仓储', '其他'], //长度10
        axisPointer: {
            type: 'shadow'
        },
        axisLine: { //这是x轴文字颜色
            lineStyle: {
                // color: "#CDDDF7",
            }
        }
    }],
    yAxis: [{
        type: 'value',
        // name: '人员数量',
        min: 0,
        axisLine: { //这是x轴文字颜色
            lineStyle: {
                // color: "#CDDDF7",
            }
        }
    }],
    series: [{
            name: '军官',
            type: 'bar',
            data: [0, 1, 1, 13, 1, 12, 6, 4, 5, 22],
            label: {
                show: true
            },
        },
        {
            name: '文职人员',
            type: 'bar',
            data: [0, 2, 42, 32, 12, 4, 5, 7, 13, 45],
            label: {
                show: true
            },
        }
    ],
}

//单位营区可视化-单位人员编制可视化
const pieOption = {
    color: ['#5470C6', '#FAC858', '#91CC75', '#5470C6', '#FAC858', '#91CC75'],

    // color: ['yellow', 'red', '#00FF7F', 'yellow', '#00FF7F', 'red'],
    // color: [
    //     'red'
    // ],
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        textStyle: {
            fontSize: 16, //字体大小
            // color: '#CDDDF7' //字体颜色
            color: 'black' //字体颜色
        },
        data: ['军官编制', '军官实有', '士兵编制', '士兵实有', '文职编制', '文职实有']
    },
    series: [{
            name: '编制数量',
            type: 'pie',
            selectedMode: 'single',
            radius: ['0%', '40%'],
            // label: { 
            //     position: 'inner',
            //     fontSize: 10,
            // },
            label: {
                position: 'inner',
                fontSize: 16
            },
            labelLine: {
                show: false,
                length: 30,
            },
            data: [
                { name: '军官编制', value: '500', selected: true },
                { name: '士兵编制', value: '400' },
                { name: '文职编制', value: '300' },

            ]
        },
        {
            name: '实有数量',
            type: 'pie',
            // center: ['50%', '65%'],
            radius: ['50%', '70%'],
            labelLine: {
                length: 15,
            },
            label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,

                rich: {
                    a: {
                        color: '#6E7079',
                        lineHeight: 22,
                        align: 'center'
                    },
                    d: {
                        color: '#fff'
                    },
                    hr: {
                        borderColor: '#8C8D8E',
                        width: '100%',
                        borderWidth: 1,
                        height: 0
                    },
                    b: {
                        color: '#4C5058',
                        fontSize: 10,
                        fontWeight: 'bold',
                        lineHeight: 30
                    },
                    per: {
                        color: '#fff',
                        backgroundColor: '#4C5058',
                        padding: [3, 4],
                        borderRadius: 4
                    }
                }
            },
            // data: ['学员', '教职员工', '临聘人员', '现职军官学员', '生长军官学员', '有军籍研究生', '士官学员', '外军学员', '其他']
            data: [
                { name: '军官实有', value: '400' },
                { name: '士兵实有', value: '300' },
                { name: '文职实有', value: '200' },
            ]
        }
    ]
};


//单位营区可视化-单位位置可视化
const mapOption = {
    backgroundColor: "#404a59", //地图背景颜色
    title: {
        text: '单位位置可视化',
        subtext: "可视化展示单位位置及人员信息",
        left: 'center',
        itemGap: 0,
        textStyle: {
            // color: '#eee'
            color: '#fff'
        }
    },
    //控制鼠标悬浮内容
    tooltip: {
        //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        trigger: "item",
        formatter: (param) => {
            return "人员编制：" + '<br>100人'
        },
    },
    geo: { // 地图配置
        //控制地图显示
        show: true,
        map: 'china',
        //显示比例
        zoom: 1.2,
        //是否开启鼠标缩放和漫游
        // roam: true,
        label: {
            normal: {
                position: 'right',
                show: false,
                textStyle: {
                    color: '#fff',
                }
            },
            emphasis: {
                show: false
            }
        },
        regions: [{
            name: "南海诸岛",
            itemStyle: {
                // 隐藏地图
                normal: {
                    opacity: 1, // 为 0 时不绘制该图形
                }
            },
            label: {
                show: true, // 隐藏文字
            }
        }],
        itemStyle: {
            normal: {
                areaColor: '#323c48', //地图区域颜色
                borderWidth: 0.5,
                borderColor: '#111', //地图边线颜色
            },
            emphasis: {
                areaColor: '#6C6A83', //鼠标移入颜色
            }
        },
    },
    series: [{
        name: '人员分布',
        type: 'effectScatter',
        mapType: 'china',
        coordinateSystem: 'geo',
        zoom: 1.2,

        symbolSize: function(val) {
            if (val[2] == 0) {
                return 0;
            } else {
                return 5;
            }
        },
        roam: false,
        showEffectOn: 'render',
        rippleEffect: {
            period: 15,
            scale: 5,
            brushType: 'fill'
        },
        hoverAnimation: true,
        label: {
            normal: {
                color: '#fff',
                formatter: function(params) {
                    return params.name
                },
                position: 'bottom',
                offset: [-3, 3],
                show: true,
                fontSize: 13,
                fontWeight: 30,
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: 'rgba(129, 255, 186, 255)',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [{
            name: "福建",
            value: [118.306239, 26.775302, 11],
            label: 'xx单位'
        }]

    }, ]
};



//单位营区可视化-单位位置可视化
const LoginMapOption = {
    backgroundColor: "#FEFEFE", //地图背景颜色
    title: {
        text: '单位位置可视化',
        subtext: "可视化展示单位位置及人员信息",
        left: 'left',
        // itemGap: 0,//控制主标题和副标题之间的间距
        textStyle: {
            // color: '#eee'
            // color: '#fff'
        }
    },
    //控制鼠标悬浮内容
    tooltip: {
        //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        trigger: "item",
        formatter: (param) => {
            return "人员编制：" + '<br>100人'
        },
    },
    geo: { // 地图配置
        //控制地图显示
        show: true,
        map: 'china',
        //显示比例
        zoom: 1.1,
        //是否开启鼠标缩放和漫游
        // roam: true,
        label: {
            normal: {
                position: 'right',
                show: false,
                textStyle: {
                    color: 'black',
                }
            },
            emphasis: {
                show: false
            }
        },
        regions: [{
            name: "南海诸岛",
            itemStyle: {
                // 隐藏地图
                normal: {
                    opacity: 1, // 为 0 时不绘制该图形
                }
            },
            label: {
                show: true, // 隐藏文字
            }
        }],
        itemStyle: {
            normal: {
                areaColor: '#F5DBED', //地图区域颜色
                borderWidth: 0.5,
                borderColor: '#3B5077', //地图边线颜色
            },
            emphasis: {
                areaColor: '#ECFAFC', //鼠标移入颜色
            }
        },
    },
    series: [{
        name: '人员分布',
        type: 'effectScatter',
        mapType: 'china',
        coordinateSystem: 'geo',
        zoom: 1.2,

        symbolSize: function(val) {
            if (val[2] == 0) {
                return 0;
            } else {
                return 5;
            }
        },
        roam: false,
        showEffectOn: 'render',
        rippleEffect: {
            period: 15,
            scale: 5,
            brushType: 'fill'
        },
        hoverAnimation: true,
        label: {
            normal: {
                color: 'black',
                formatter: function(params) {
                    return params.name
                },
                position: 'bottom',
                offset: [-3, 3],
                show: true,
                fontSize: 13,
                fontWeight: 30,
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: 'rgba(129, 255, 186, 255)',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [{
            name: "福建",
            value: [118.306239, 26.775302, 11],
            label: 'xx单位'
        }]

    }, ]
};


const cloudWorldOption = {
    title: {
        text: "热爱祖国",
        subtext: '词云可视化',
        x: "left"
    },
    backgroundColor: "#fff",
    // tooltip: {
    //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    // },
    series: [{
        type: "wordCloud",
        //用来调整词之间的距离
        gridSize: 10,
        //用来调整字的大小范围
        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.
        sizeRange: [14, 60],
        // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
        //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
        // rotationRange: [-45, 0, 45, 90],
        // rotationRange: [ 0,90],
        rotationRange: [0, 0],
        //随机生成字体颜色
        // maskImage: maskImage,
        textStyle: {
            normal: {
                color: function() {
                    return (
                        "rgb(" +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ")"
                    );
                }
            }
        },
        //位置相关设置
        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.
        left: "center",
        top: "center",
        right: null,
        bottom: null,
        width: "200%",
        height: "200%",
        //数据
        data: [{
                name: "十九大精神",
                value: 15000
            },
            {
                name: "两学一做",
                value: 10081
            }, {
                name: "中华民族",
                value: 9386
            },
            {
                name: "马克思主义",
                value: 7500
            },
            {
                name: "民族复兴",
                value: 7500
            },
            {
                name: "社会主义制度",
                value: 6500
            },
            {
                name: "国防白皮书",
                value: 6500
            },
            {
                name: "创新",
                value: 6000
            },
            {
                name: "民主革命",
                value: 4500
            },
            {
                name: "文化强国",
                value: 3800
            },
            {
                name: "国家主权",
                value: 3000
            },
            {
                name: "伟大复兴",
                value: 2500
            },
            {
                name: "领土完整",
                value: 2300
            },
            {
                name: "安全",
                value: 2000
            },
            {
                name: "从严治党",
                value: 1900
            },
            {
                name: "现代化经济体系",
                value: 1800
            },
            {
                name: "国防动员",
                value: 1700
            },
            {
                name: "信息化战争",
                value: 1600
            },
            {
                name: "局部战争",
                value: 1500
            },
            {
                name: "教育",
                value: 1200
            },
            {
                name: "中国梦",
                value: 1100
            },
            {
                name: "孙子兵法",
                value: 900
            },
            {
                name: "一国两制",
                value: 800
            },
            {
                name: "特色社会主义思想",
                value: 700
            },
        ]
    }]
}

const relationOption = {
    title: {
        text: " ",
        subtext: "Default layout",
        top: "bottom",
        left: "right",
    },
    // tooltip: {
    // },
    // legend: [{
    //     // selectedMode: 'single',
    //     // data: categories.map(function (a) {
    //     //     return a.name;
    //     // })
    // }],
    animation: false,
    series: [{
        //  name: 'xxx',
        type: "graph",
        layout: "force",
        data: [{
                id: "00",
                name: "单位",
                view: "00",
                category: 0,
            },
            {
                id: "00-01",
                name: "营区",
                view: "department-camp-guanli-name-link",
                category: 1,
            },
            {
                id: "00-02",
                name: "保障机构",
                view: "department-jigou-baozhang-name-link",
                category: 1,
            },
            {
                id: "00-03",
                name: "关键设施",
                view: "guanjiansheshi-department-guanli-name-link",
                category: 1,
            },
            {
                id: "00-04",
                name: "人员",
                view: "people-department-name-link",
                category: 1,
            },
        ],
        links: [{
                source: "00",
                target: "00-01",
            },
            {
                source: "00",
                target: "00-02",
            },
            {
                source: "00",
                target: "00-03",
            },
            {
                source: "00",
                target: "00-04",
            },
        ],
        itemStyle: {
            normal: {
                color: function(params) {
                    var color = ["#C3B3B6", "#EAC1BB", "#a5c3d8", "#BBC9D3"];
                    return color[params.data.category];
                },
            },
        },

        //  categories: categories,
        roam: true,
        draggable: false,
        label: {
            show: true,
        },
        force: {
            repulsion: 1000,
            edgeLenth: 180,
            gravity: 0.03,
            layoutAnimation: true,
        },
    }, ],
};


export default {
    pieOption,
    mapOption,
    ringOption,
    oneBarOption,
    twoBarOption,
    LoginMapOption,
    cloudWorldOption,
    relationOption,
};