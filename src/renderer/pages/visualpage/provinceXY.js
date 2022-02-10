//省份位置数据
const provinceLocData = {
    '福建': [118.306239, 26.775302],
    '山西': [112.549248, 37.857014],
    '浙江': [120.153576, 30.287459],
    '海南': [110.33119, 20.031971],
    '甘肃': [103.823557, 36.058039],
    '湖北': [114.298572, 30.584355],
    '河南': [113.665412, 34.757975],
    '重庆': [106.504962, 29.533155],
    '广西': [108.320004, 22.82402],
    '吉林': [125.3245, 43.886841],
    '河北': [115.302461, 39.045474],
    '青海': [101.778916, 36.623178],
    '北京': [116.405285, 40.704989],
    '黑龙江': [126.642464, 45.756967],
    '江苏': [119.867413, 33.041544],
    '江西': [115.892151, 28.676493],
    '新疆': [87.617733, 43.792818],
    '云南': [102.712251, 25.040609],
    '天津': [117.190182, 38.725596],
    '内蒙古': [111.670801, 40.818311],
    '西藏': [91.132212, 29.660361],
    '四川': [104.065735, 30.659462],
    '陕西': [108.948024, 34.263161],
    '湖南': [112.982279, 28.19409],
    '广东': [113.280637, 24.125178],
    '辽宁': [123.429096, 41.796767],
    '山东': [117.000923, 36.675807],
    '宁夏': [106.278179, 38.46637],
    '上海': [121.472644, 31.231706],
    '澳门': [113.543873, 22.198745],
    '贵州': [106.713478, 26.578343],
    '安徽': [117.283042, 31.86119]
}

const provinceLocDataList = {
        '福建省': [118.306239, 26.775302],
        '山西省': [112.549248, 37.857014],
        '浙江省': [120.153576, 30.287459],
        '海南省': [110.33119, 20.031971],
        '甘肃省': [103.823557, 36.058039],
        '湖北省': [114.298572, 30.584355],
        '河南省': [113.665412, 34.757975],
        '重庆市': [106.504962, 29.533155],
        '广西壮族自治区': [108.320004, 22.82402],
        '吉林省': [125.3245, 43.886841],
        '河北省': [115.302461, 39.045474],
        '青海省': [101.778916, 36.623178],
        '北京市': [116.405285, 40.704989],
        '黑龙江省': [126.642464, 45.756967],
        '江苏省': [119.867413, 33.041544],
        '江西省': [115.892151, 28.676493],
        '新疆维吾尔自治区': [87.617733, 43.792818],
        '云南省': [102.712251, 25.040609],
        '天津市': [117.190182, 38.725596],
        '内蒙古自治区': [111.670801, 40.818311],
        '西藏自治区': [91.132212, 29.660361],
        '四川省': [104.065735, 30.659462],
        '陕西省': [108.948024, 34.263161],
        '湖南省': [112.982279, 28.19409],
        '广东省': [113.280637, 24.125178],
        '辽宁省': [123.429096, 41.796767],
        '山东省': [117.000923, 36.675807],
        '宁夏回族自治区': [106.278179, 38.46637],
        '上海市': [121.472644, 31.231706],
        '澳门特别行政区': [113.543873, 22.198745],
        '贵州省': [106.713478, 26.578343],
        '安徽省': [117.283042, 31.86119],
        '香港特别行政区': [114.109497, 22.396428],
    }
    //市-县位置数据
const cityLocData = {
    "北川羌族自治县": [104.3615856, 31.9630841],
    "句容": [119.168695, 31.944999],
    "大理": [100.267638, 25.606486],
    "新郑": [113.740529, 34.395562],
    "舞阳": [113.610565, 33.436279],
    "邹平": [117.736809, 36.878029],
    "长葛": [113.819888, 34.194136],
    "国外": [
        133.320583, 37.071861
    ],
    "烟台": [
        121.391382,
        37.539297
    ],
    "北海": [
        109.119254,
        21.473343
    ],
    "澎湖县": [
        119.5793157,
        23.5711899
    ],
    "延边朝鲜族自治州": [
        129.513228,
        42.904823
    ],
    "普洱": [
        100.972344,
        22.777321
    ],
    "舟山": [
        122.106863,
        30.016028
    ],
    "双鸭山": [
        131.157304,
        46.643442
    ],
    "云林县": [
        120.4313373,
        23.7092033
    ],
    "荆州": [
        112.23813,
        30.326857
    ],
    "绵阳": [
        104.741722,
        31.46402
    ],
    "衡阳": [
        112.607693,
        26.900358
    ],
    "福建": [
        119.306239,
        26.075302
    ],
    "陵水黎族自治县": [
        110.037218,
        18.505006
    ],
    "阿克苏地区": [
        80.265068,
        41.170712
    ],
    "内江": [
        105.066138,
        29.58708
    ],
    "台南市": [
        120.2268758,
        22.9998999
    ],
    "河源": [
        114.697802,
        23.746266
    ],
    "安庆": [
        117.053571,
        30.524816
    ],
    "白沙黎族自治县": [
        109.452606,
        19.224584
    ],
    "西宁": [
        101.778916,
        36.623178
    ],
    "台中市": [
        120.6736482,
        24.1477358
    ],
    "陇南": [
        104.929379,
        33.388598
    ],
    "衢州": [
        118.87263,
        28.941708
    ],
    "渭南": [
        109.502882,
        34.499381
    ],
    "深圳": [
        114.085947,
        22.547
    ],
    "郴州": [
        113.032067,
        25.793589
    ],
    "驻马店": [
        114.024736,
        32.980169
    ],
    "株洲": [
        113.151737,
        27.835806
    ],
    "张掖": [
        100.455472,
        38.932897
    ],
    "镇江": [
        119.452753,
        32.204402
    ],
    "枣庄": [
        117.557964,
        34.856424
    ],
    "廊坊": [
        116.713873,
        39.529244
    ],
    "新竹市": [
        120.9674752,
        24.8138297
    ],
    "包头": [
        109.840405,
        40.658168
    ],
    "山西": [
        112.549248,
        37.857014
    ],
    "楚雄彝族自治州": [
        101.546046,
        25.041988
    ],
    "梧州": [
        111.316229,
        23.472309
    ],
    "武威": [
        102.634697,
        37.929996
    ],
    "花莲县": [
        121.6015714,
        23.9871589
    ],
    "山南地区": [
        91.766529,
        29.236023
    ],
    "定西": [
        104.626294,
        35.579578
    ],
    "南阳": [
        112.540918,
        32.999082
    ],
    "开封": [
        114.341447,
        34.797049
    ],
    "宣城": [
        118.757995,
        30.945667
    ],
    "石嘴山": [
        106.376173,
        39.01333
    ],
    "克孜勒苏柯尔克孜自治州": [
        76.172825,
        39.713431
    ],
    "济源": [
        112.590047,
        35.090378
    ],
    "芜湖": [
        118.376451,
        31.326319
    ],
    "大连": [
        121.618622,
        38.91459
    ],
    "铁岭": [
        123.844279,
        42.290585
    ],
    "庆阳": [
        107.638372,
        35.734218
    ],
    "德宏傣族景颇族自治州": [
        98.578363,
        24.436694
    ],
    "定安县": [
        110.323959,
        19.699211
    ],
    "郑州": [
        113.665412,
        34.757975
    ],
    "湘西土家族苗族自治州": [
        109.739735,
        28.314296
    ],
    "成都": [
        104.065735,
        30.659462
    ],
    "南昌": [
        115.892151,
        28.676493
    ],
    "杭州": [
        120.153576,
        30.287459
    ],
    "邯郸": [
        114.490686,
        36.612273
    ],
    "江门": [
        113.094942,
        22.590431
    ],
    "营口": [
        122.235151,
        40.667432
    ],
    "巴中": [
        106.753669,
        31.858809
    ],
    "辽阳": [
        123.18152,
        41.269402
    ],
    "南通": [
        120.864608,
        32.016212
    ],
    "绍兴": [
        120.582112,
        29.997117
    ],
    "汉中": [
        107.028621,
        33.077668
    ],
    "云浮": [
        112.044439,
        22.929801
    ],
    "金昌": [
        102.187888,
        38.514238
    ],
    "昌都": [
        97.178452,
        31.136875
    ],
    "东营": [
        118.4963,
        37.461266
    ],
    "银川": [
        106.278179,
        38.46637
    ],
    "漯河": [
        114.026405,
        33.575855
    ],
    "通化": [
        125.936501,
        41.721177
    ],
    "浙江": [
        120.153576,
        30.287459
    ],
    "攀枝花": [
        101.716007,
        26.580446
    ],
    "秦皇岛": [
        119.586579,
        39.942531
    ],
    "汕头": [
        116.708463,
        23.37102
    ],
    "南京": [
        118.767413,
        32.041544
    ],
    "金华": [
        119.649506,
        29.089524
    ],
    "伊犁哈萨克自治州": [
        81.317946,
        43.92186
    ],
    "石家庄": [
        114.502461,
        38.045474
    ],
    "湘潭": [
        112.925083,
        27.846725
    ],
    "屯昌县": [
        110.102773,
        19.362916
    ],
    "吴忠": [
        106.199409,
        37.986165
    ],
    "常德": [
        111.691347,
        29.040225
    ],
    "韶关": [
        113.591544,
        24.801322
    ],
    "台东县": [
        121.0713702,
        22.7972447
    ],
    "三门峡": [
        111.194099,
        34.777338
    ],
    "滨州": [
        118.016974,
        37.383542
    ],
    "海南": [
        110.33119,
        20.031971
    ],
    "葫芦岛": [
        120.856394,
        40.755572
    ],
    "商丘": [
        115.650497,
        34.437054
    ],
    "信阳": [
        114.075031,
        32.123274
    ],
    "林芝": [
        94.362348,
        29.654693
    ],
    "拉萨": [
        91.132212,
        29.660361
    ],
    "阜阳": [
        115.819729,
        32.896969
    ],
    "淮北": [
        116.794664,
        33.971707
    ],
    "文昌": [
        110.753975,
        19.612986
    ],
    "滁州": [
        118.316264,
        32.303627
    ],
    "呼伦贝尔": [
        119.758168,
        49.215333
    ],
    "桂林": [
        110.299121,
        25.274215
    ],
    "珠海": [
        113.552724,
        22.255899
    ],
    "塔城地区": [
        82.985732,
        46.746301
    ],
    "茂名": [
        110.919229,
        21.659751
    ],
    "甘肃": [
        103.823557,
        36.058039
    ],
    "张家界": [
        110.479921,
        29.127401
    ],
    "白山": [
        126.427839,
        41.942505
    ],
    "琼中黎族苗族自治县": [
        109.839996,
        19.03557
    ],
    "太原": [
        112.549248,
        37.857014
    ],
    "榆林": [
        109.741193,
        38.290162
    ],
    "大庆": [
        125.11272,
        46.590734
    ],
    "和田地区": [
        79.92533,
        37.110687
    ],
    "钦州": [
        108.624175,
        21.967127
    ],
    "固原": [
        106.285241,
        36.004561
    ],
    "宜昌": [
        111.290843,
        30.702636
    ],
    "东方": [
        108.653789,
        19.10198
    ],
    "屏东县": [
        120.5487597,
        22.5519759
    ],
    "湛江": [
        110.405529,
        21.195338
    ],
    "日喀则": [
        88.884874,
        29.263792
    ],
    "湖北": [
        114.298572,
        30.584355
    ],
    "焦作": [
        113.238266,
        35.23904
    ],
    "黔南布依族苗族自治州": [
        107.517156,
        26.258219
    ],
    "襄阳": [
        112.144146,
        32.042426
    ],
    "宁波": [
        121.549792,
        29.868388
    ],
    "三亚": [
        109.508268,
        18.247872
    ],
    "甘南藏族自治州": [
        102.911008,
        34.986354
    ],
    "泸州": [
        105.443348,
        28.889138
    ],
    "高雄市": [
        120.3014353,
        22.6272784
    ],
    "嘉峪关": [
        98.277304,
        39.786529
    ],
    "锡林郭勒盟": [
        116.090996,
        43.944018
    ],
    "岳阳": [
        113.132855,
        29.37029
    ],
    "自贡": [
        104.773447,
        29.352765
    ],
    "荆门": [
        112.204251,
        31.03542
    ],
    "河南": [
        113.665412,
        34.757975
    ],
    "萍乡": [
        113.852186,
        27.622946
    ],
    "南宁": [
        108.320004,
        22.82402
    ],
    "重庆": [
        106.504962,
        29.533155
    ],
    "保亭黎族苗族自治县": [
        109.70245,
        18.636371
    ],
    "基隆市": [
        121.7391833,
        25.1276033
    ],
    "本溪": [
        123.770519,
        41.297909
    ],
    "安顺": [
        105.932188,
        26.245544
    ],
    "松原": [
        124.823608,
        45.118243
    ],
    "海口": [
        110.33119,
        20.031971
    ],
    "益阳": [
        112.355042,
        28.570066
    ],
    "濮阳": [
        115.041299,
        35.768234
    ],
    "广西": [
        108.320004,
        22.82402
    ],
    "长春": [
        125.3245,
        43.886841
    ],
    "朝阳": [
        120.451176,
        41.576758
    ],
    "忻州": [
        112.733538,
        38.41769
    ],
    "吉林": [
        125.3245,
        43.886841
    ],
    "五指山": [
        109.516662,
        18.776921
    ],
    "德阳": [
        104.398651,
        31.127991
    ],
    "呼和浩特": [
        111.670801,
        40.818311
    ],
    "马鞍山": [
        118.507906,
        31.689362
    ],
    "阿勒泰地区": [
        88.13963,
        47.848393
    ],
    "肇庆": [
        112.472529,
        23.051546
    ],
    "新竹县": [
        121.0177246,
        24.8387226
    ],
    "宜兰县": [
        121.7377502,
        24.7021073
    ],
    "眉山": [
        103.831788,
        30.048318
    ],
    "鹤岗": [
        130.277487,
        47.332085
    ],
    "扬州": [
        119.421003,
        32.393159
    ],
    "晋中": [
        112.736465,
        37.696495
    ],
    "晋城": [
        112.851274,
        35.497553
    ],
    "白银": [
        104.173606,
        36.54568
    ],
    "青岛": [
        120.369557,
        36.094406
    ],
    "许昌": [
        113.826063,
        34.022956
    ],
    "鄂尔多斯": [
        109.99029,
        39.817179
    ],
    "福州": [
        119.306239,
        26.075302
    ],
    "资阳": [
        104.641917,
        30.122211
    ],
    "大理白族自治州": [
        100.240037,
        25.592765
    ],
    "泉州": [
        118.589421,
        24.908853
    ],
    "台北市": [
        121.5654268,
        25.0329636
    ],
    "河北": [
        114.502461,
        38.045474
    ],
    "泰州": [
        119.915176,
        32.484882
    ],
    "宜宾": [
        104.630825,
        28.760189
    ],
    "池州": [
        117.489157,
        30.656037
    ],
    "漳州": [
        117.661801,
        24.510897
    ],
    "中山": [
        113.382391,
        22.521113
    ],
    "宜春": [
        114.391136,
        27.8043
    ],
    "绥化": [
        126.99293,
        46.637393
    ],
    "琼海": [
        110.466785,
        19.246011
    ],
    "青海": [
        101.778916,
        36.623178
    ],
    "阜新": [
        121.648962,
        42.011796
    ],
    "毕节": [
        105.28501,
        27.301693
    ],
    "来宾": [
        109.229772,
        23.733766
    ],
    "丹东": [
        124.383044,
        40.124296
    ],
    "兴安盟": [
        122.070317,
        46.076268
    ],
    "潜江": [
        112.896866,
        30.421215
    ],
    "盐城": [
        120.139998,
        33.377631
    ],
    "黄山": [
        118.317325,
        29.709239
    ],
    "周口": [
        114.649653,
        33.620357
    ],
    "广州": [
        113.280637,
        23.125178
    ],
    "鹤壁": [
        114.295444,
        35.748236
    ],
    "宝鸡": [
        107.14487,
        34.369315
    ],
    "六盘水": [
        104.846743,
        26.584643
    ],
    "玉溪": [
        102.543907,
        24.350461
    ],
    "昌吉回族自治州": [
        87.304012,
        44.014577
    ],
    "新北市": [
        121.4627868,
        25.0169826
    ],
    "香港": [
        114.109497,
        22.396428
    ],
    "北京": [
        116.405285,
        39.904989
    ],
    "甘孜藏族自治州": [
        101.963815,
        30.050663
    ],
    "嘉兴": [
        120.750865,
        30.762653
    ],
    "柳州": [
        109.411703,
        24.314617
    ],
    "南充": [
        106.082974,
        30.795281
    ],
    "四平": [
        124.370785,
        43.170344
    ],
    "日照": [
        119.461208,
        35.428588
    ],
    "合肥": [
        117.283042,
        31.86119
    ],
    "汕尾": [
        115.364238,
        22.774485
    ],
    "乌海": [
        106.825563,
        39.673734
    ],
    "清远": [
        113.036779,
        23.704188
    ],
    "龙岩": [
        117.02978,
        25.091603
    ],
    "百色": [
        106.616285,
        23.897742
    ],
    "商洛": [
        109.939776,
        33.868319
    ],
    "邵阳": [
        111.467791,
        27.238893
    ],
    "阿坝藏族羌族自治州": [
        102.221374,
        31.899792
    ],
    "黑龙江": [
        126.642464,
        45.756967
    ],
    "巴彦淖尔": [
        107.416959,
        40.757402
    ],
    "铜陵": [
        117.816576,
        30.929935
    ],
    "鸡西": [
        130.975966,
        45.300046
    ],
    "苗栗县": [
        120.8214265,
        24.560159
    ],
    "邢台": [
        114.508851,
        37.0682
    ],
    "果洛藏族自治州": [
        100.242143,
        34.4736
    ],
    "盘锦": [
        122.06957,
        41.124484
    ],
    "阿里地区": [
        80.105498,
        32.503187
    ],
    "景德镇": [
        117.214664,
        29.29256
    ],
    "莆田": [
        119.007558,
        25.431011
    ],
    "临汾": [
        111.517973,
        36.08415
    ],
    "西安": [
        108.948024,
        34.263161
    ],
    "通辽": [
        122.263119,
        43.617429
    ],
    "海东": [
        102.10327,
        36.502916
    ],
    "连云港": [
        119.178821,
        34.600018
    ],
    "江苏": [
        118.767413,
        32.041544
    ],
    "丽水": [
        119.921786,
        28.451993
    ],
    "防城港": [
        108.345478,
        21.614631
    ],
    "咸阳": [
        108.705117,
        34.333439
    ],
    "哈尔滨": [
        126.642464,
        45.756967
    ],
    "那曲地区": [
        92.060214,
        31.476004
    ],
    "河池": [
        108.062105,
        24.695899
    ],
    "哈密地区": [
        93.51316,
        42.833248
    ],
    "抚州": [
        116.358351,
        27.98385
    ],
    "桃园市": [
        121.3009798,
        24.9936281
    ],
    "咸宁": [
        114.328963,
        29.832798
    ],
    "七台河": [
        131.015584,
        45.771266
    ],
    "苏州": [
        120.619585,
        31.299379
    ],
    "莱芜": [
        117.677736,
        36.214397
    ],
    "中国": [
        104.166,
        36.894402
    ],
    "辽源": [
        125.145349,
        42.902692
    ],
    "菏泽": [
        115.469381,
        35.246531
    ],
    "九江": [
        115.992811,
        29.712034
    ],
    "伊春": [
        128.899396,
        47.724775
    ],
    "西双版纳傣族自治州": [
        100.797941,
        22.001724
    ],
    "红河哈尼族彝族自治州": [
        103.384182,
        23.366775
    ],
    "黄石": [
        115.077048,
        30.220074
    ],
    "澄迈县": [
        110.007147,
        19.737095
    ],
    "铜川": [
        108.963122,
        34.90892
    ],
    "昭通": [
        103.717216,
        27.336999
    ],
    "安阳": [
        114.352482,
        36.103442
    ],
    "曲靖": [
        103.797851,
        25.501557
    ],
    "乌鲁木齐": [
        87.617733,
        43.792818
    ],
    "宿州": [
        116.984084,
        33.633891
    ],
    "德州": [
        116.307428,
        37.453968
    ],
    "上饶": [
        117.971185,
        28.44442
    ],
    "吉安": [
        114.986373,
        27.111699
    ],
    "鄂州": [
        114.890593,
        30.396536
    ],
    "阳江": [
        111.975107,
        21.859222
    ],
    "怒江傈僳族自治州": [
        98.854304,
        25.850949
    ],
    "万宁": [
        110.388793,
        18.796216
    ],
    "江西": [
        115.892151,
        28.676493
    ],
    "武汉": [
        114.298572,
        30.584355
    ],
    "神农架林区": [
        110.671525,
        31.744449
    ],
    "连江县": [
        119.9516652,
        26.160243
    ],
    "台州": [
        121.428599,
        28.661378
    ],
    "昆明": [
        102.712251,
        25.040609
    ],
    "台湾": [
        120.7120023,
        22.6158015
    ],
    "孝感": [
        113.926655,
        30.926423
    ],
    "黄冈": [
        114.879365,
        30.447711
    ],
    "吉林市": [
        126.55302,
        43.843577
    ],
    "梅州": [
        116.117582,
        24.299112
    ],
    "巴音郭楞蒙古自治州": [
        86.150969,
        41.768552
    ],
    "文山壮族苗族自治州": [
        104.24401,
        23.36951
    ],
    "吐鲁番": [
        89.184078,
        42.947613
    ],
    "雅安": [
        103.001033,
        29.987722
    ],
    "淄博": [
        118.047648,
        36.814939
    ],
    "新疆": [
        87.617733,
        43.792818
    ],
    "南投县": [
        120.9718638,
        23.9609981
    ],
    "黔西南布依族苗族自治州": [
        104.897971,
        25.08812
    ],
    "云南": [
        102.712251,
        25.040609
    ],
    "天津": [
        117.190182,
        39.125596
    ],
    "喀什地区": [
        75.989138,
        39.467664
    ],
    "淮南": [
        117.025449,
        32.645947
    ],
    "内蒙古": [
        111.670801,
        40.818311
    ],
    "唐山": [
        118.175393,
        39.635113
    ],
    "厦门": [
        118.11022,
        24.490474
    ],
    "惠州": [
        114.412599,
        23.079404
    ],
    "六安": [
        116.507676,
        31.752889
    ],
    "长沙": [
        112.982279,
        28.19409
    ],
    "天门": [
        113.165862,
        30.653061
    ],
    "西藏": [
        91.132212,
        29.660361
    ],
    "丽江": [
        100.233026,
        26.872108
    ],
    "平凉": [
        106.684691,
        35.54279
    ],
    "承德": [
        117.939152,
        40.976204
    ],
    "保山": [
        99.167133,
        25.111802
    ],
    "彰化县": [
        120.5161352,
        24.0517963
    ],
    "嘉义县": [
        120.2554615,
        23.4518428
    ],
    "鞍山": [
        122.995632,
        41.110626
    ],
    "黑河": [
        127.499023,
        50.249585
    ],
    "崇左": [
        107.353926,
        22.404108
    ],
    "洛阳": [
        112.434468,
        34.663041
    ],
    "博尔塔拉蒙古自治州": [
        82.074778,
        44.903258
    ],
    "海北藏族自治州": [
        100.901059,
        36.959435
    ],
    "朔州": [
        112.433387,
        39.331261
    ],
    "赣州": [
        114.940278,
        25.85097
    ],
    "佳木斯": [
        130.361634,
        46.809606
    ],
    "三明": [
        117.635001,
        26.265444
    ],
    "四川": [
        104.065735,
        30.659462
    ],
    "陕西": [
        108.948024,
        34.263161
    ],
    "随州": [
        113.37377,
        31.717497
    ],
    "湖南": [
        112.982279,
        28.19409
    ],
    "玉树藏族自治州": [
        97.008522,
        33.004049
    ],
    "济宁": [
        116.587245,
        35.415393
    ],
    "阳泉": [
        113.583285,
        37.861188
    ],
    "蚌埠": [
        117.36237,
        32.934037
    ],
    "广安": [
        106.633369,
        30.456398
    ],
    "黄南藏族自治州": [
        102.019988,
        35.517744
    ],
    "迪庆藏族自治州": [
        99.706463,
        27.826853
    ],
    "吕梁": [
        111.134335,
        37.524366
    ],
    "运城": [
        111.003957,
        35.022778
    ],
    "广东": [
        113.280637,
        23.125178
    ],
    "辽宁": [
        123.429096,
        41.796767
    ],
    "遵义": [
        106.937265,
        27.706626
    ],
    "济南": [
        117.000923,
        36.675807
    ],
    "临沂": [
        118.326443,
        35.065282
    ],
    "淮安": [
        119.021265,
        33.597506
    ],
    "金门县": [
        118.3766352,
        24.4493726
    ],
    "石河子": [
        86.041075,
        44.305886
    ],
    "潮州": [
        116.632301,
        23.661701
    ],
    "东莞": [
        113.760234,
        23.048884
    ],
    "长治": [
        113.113556,
        36.191112
    ],
    "聊城": [
        115.980367,
        36.456013
    ],
    "山东": [
        117.000923,
        36.675807
    ],
    "宁夏": [
        106.278179,
        38.46637
    ],
    "沧州": [
        116.857461,
        38.310582
    ],
    "上海": [
        121.472644,
        31.231706
    ],
    "泰安": [
        117.129063,
        36.194968
    ],
    "永州": [
        111.608019,
        26.434516
    ],
    "中卫": [
        105.189568,
        37.514951
    ],
    "乐东黎族自治县": [
        109.175444,
        18.74758
    ],
    "阿拉善盟": [
        105.706422,
        38.844814
    ],
    "澳门": [
        113.543873,
        22.198745
    ],
    "乐山": [
        103.761263,
        29.582024
    ],
    "天水": [
        105.724998,
        34.578529
    ],
    "铜仁": [
        109.191555,
        27.718346
    ],
    "大同": [
        113.295259,
        40.09031
    ],
    "新余": [
        114.930835,
        27.810834
    ],
    "克拉玛依": [
        84.873946,
        45.595886
    ],
    "娄底": [
        112.008497,
        27.728136
    ],
    "湖州": [
        120.102398,
        30.867198
    ],
    "黔东南苗族侗族自治州": [
        107.977488,
        26.583352
    ],
    "抚顺": [
        123.921109,
        41.875956
    ],
    "常州": [
        119.946973,
        31.772752
    ],
    "赤峰": [
        118.956806,
        42.275317
    ],
    "宿迁": [
        118.293328,
        33.945154
    ],
    "锦州": [
        121.135742,
        41.119269
    ],
    "酒泉": [
        98.510795,
        39.744023
    ],
    "威海": [
        122.116394,
        37.509691
    ],
    "新乡": [
        113.883991,
        35.302616
    ],
    "凉山彝族自治州": [
        102.258746,
        27.886762
    ],
    "儋州": [
        109.576782,
        19.517486
    ],
    "衡水": [
        115.665993,
        37.735097
    ],
    "白城": [
        122.841114,
        45.619026
    ],
    "玉林": [
        110.154393,
        22.63136
    ],
    "达州": [
        107.502262,
        31.209484
    ],
    "宁德": [
        119.527082,
        26.65924
    ],
    "乌兰察布": [
        113.114543,
        41.034126
    ],
    "大兴安岭地区": [
        124.711526,
        52.335262
    ],
    "临沧": [
        100.08697,
        23.886567
    ],
    "亳州": [
        115.782939,
        33.869338
    ],
    "兰州": [
        103.823557,
        36.058039
    ],
    "恩施土家族苗族自治州": [
        109.48699,
        30.283114
    ],
    "齐齐哈尔": [
        123.953486,
        47.348079
    ],
    "平顶山": [
        113.307718,
        33.735241
    ],
    "揭阳": [
        116.355733,
        23.543778
    ],
    "广元": [
        105.829757,
        32.433668
    ],
    "张家口": [
        114.884091,
        40.811901
    ],
    "保定": [
        115.482331,
        38.867657
    ],
    "昌江黎族自治县": [
        109.053351,
        19.260968
    ],
    "南平": [
        118.178459,
        26.635627
    ],
    "临夏回族自治州": [
        103.212006,
        35.599446
    ],
    "贵阳": [
        106.713478,
        26.578343
    ],
    "鹰潭": [
        117.033838,
        28.238638
    ],
    "潍坊": [
        119.107078,
        36.70925
    ],
    "温州": [
        120.672111,
        28.000575
    ],
    "安康": [
        109.029273,
        32.6903
    ],
    "遂宁": [
        105.571331,
        30.513311
    ],
    "贵州": [
        106.713478,
        26.578343
    ],
    "临高县": [
        109.687697,
        19.908293
    ],
    "海西蒙古族藏族自治州": [
        97.370785,
        37.374663
    ],
    "十堰": [
        110.785239,
        32.647017
    ],
    "贺州": [
        111.552056,
        24.414141
    ],
    "徐州": [
        117.184811,
        34.261792
    ],
    "仙桃": [
        113.453974,
        30.364953
    ],
    "牡丹江": [
        129.618602,
        44.582962
    ],
    "沈阳": [
        123.429096,
        41.796767
    ],
    "贵港": [
        109.602146,
        23.0936
    ],
    "怀化": [
        109.97824,
        27.550082
    ],
    "无锡": [
        120.301663,
        31.574729
    ],
    "佛山": [
        113.122717,
        23.028762
    ],
    "嘉义市": [
        120.4491113,
        23.4800751
    ],
    "延安": [
        109.49081,
        36.596537
    ],
    "海南藏族自治州": [
        100.619542,
        36.280353
    ],
    "安徽": [
        117.283042,
        31.86119
    ]
}

export default {
    provinceLocData,
    cityLocData,
    provinceLocDataList
}