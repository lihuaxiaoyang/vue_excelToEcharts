// camp table 字段
const camptable = [{
    prop: 'departmentname',
    label: '单位名称',
    width: '150',
}, {
    prop: 'dempartmentaliasCode',
    label: '代号',
    width: '150',
}, {
    prop: 'nowpower',
    label: '级别',
    width: '150',
}, {
    prop: 'staydepartment',
    label: '驻营单位',
    width: '200',
}, {
    prop: 'camppeople',
    label: '营区保障对象总人数',
    width: '100',
}];
// position table 字段
const positiontable = [{
    prop: 'campname',
    label: '营区名称',
    width: '100',
}, {
    prop: 'positionname',
    label: '阵地名称',
    width: '100',
}, {
    prop: 'isbuild',
    label: '阵地类型',
    width: '80',
}, {
    prop: 'isauto',
    label: '值守方式',
    width: '80',
}, {
    prop: 'trafficstatus',
    label: '道路交通条件',
    width: '150',
}, {
    prop: 'aroundstates',
    label: '周边环境情况',
    width: '200',
}, {
    prop: 'colum1',
    label: '电源',
    width: '100',
}];
// 人员类别 table 字段
const peopletable = [{
    prop: 'name',
    label: '人员姓名',
    width: '100',
}, {
    prop: 'peopletype',
    label: '人员类别',
    width: '100',
}, {
    prop: 'peopleclass',
    label: '职级',
    width: '100',
}, {
    prop: 'peopledp',
    label: '部职别',
    width: '100',
}, {
    prop: 'homeplace',
    label: '籍贯',
    width: '100',
}, {
    prop: 'partintime',
    label: '入伍年月',
    width: '100',
}, {
    prop: 'phone',
    label: '联系电话',
    width: '100',
}, {
    prop: 'major',
    label: '主专业',
    width: '100',
}, {
    prop: 'othermajor',
    label: '其他专业',
    width: '120',
}, {
    prop: 'remark',
    label: '备注',
    width: '120',
}];
// 人员类别 Options
const peopleoptions = [{
    value: '军官',
}, {
    value: '文职人员',
}, {
    value: '士兵',
}];
// 专业类别 Options
const majoroptions1 = [{
    value: '战勤岗位',
}, {
    value: '财务岗位',
}, {
    value: '军需岗位',
}, {
    value: '能源岗位',
}, {
    value: '采购岗位',
}, {
    value: '卫生岗位',
}, {
    value: '军交岗位',
}, {
    value: '营房岗位',
}, {
    value: '仓储岗位',
}, {
    value: '其他',
}];
// 人员类别 Options
const majoroptions2 = [{
    value: '保障卡管理员',
}, {
    value: '出纳',
}, {
    value: '司务长',
}, {
    value: '炊事员',
}, {
    value: '给养员',
}, {
    value: '食堂管理员',
}, {
    value: '油料员',
}, {
    value: '油料化验员',
}, {
    value: '油料保管员',
}, {
    value: '采购员',
}, {
    value: '卫生员',
}, {
    value: '驾驶员',
}, {
    value: '汽车修理工',
}, {
    value: '动力电源维修工',
}, {
    value: '营房维修工',
}, {
    value: '电工',
}, {
    value: '各类保管员',
}, {
    value: '养殖员',
}, {
    value: '种植员',
}, {
    value: '其他岗位',
}];
// 资源类型 Options
const equipmentoptions = [{
    value: '通用车辆',
}, {
    value: '后勤装备',
}, {
    value: '后勤器材',
}, {
    value: '后勤物资',
}];
// 保存状态 Options
const savestatusoptions = [{
    value: '库存',
}, {
    value: '在用',
}, {
    value: '封存',
}];
// 资源状态 Options
const statusoptions = [{
    value: '新品',
}, {
    value: '堪用品',
}, {
    value: '待报废',
}];
// 资源情况 Table 字段
const equipmenttable = [{
    prop: 'equipmenttype',
    label: '资源类别',
    width: '100',
}, {
    prop: 'name',
    label: '名称',
    width: '120',
}, {
    prop: 'type',
    label: '型号',
    width: '120',
}, {
    prop: 'prenum',
    label: '编制数',
    width: '100',
}, {
    prop: 'num',
    label: '现有数',
    width: '100',
}, {
    prop: 'accounttype',
    label: '计量单位',
    width: '80',
}, {
    prop: 'savestatus',
    label: '保存状态',
    width: '150',
}, {
    prop: 'eqstatus',
    label: '资源状态',
    width: '150',
}];
// 资源情况 Table 字段
const pequipmenttable = [{
    prop: 'positionname',
    label: '阵地名称',
    width: '100',
}, {
    prop: 'equipmenttype',
    label: '资源类别',
    width: '100',
}, {
    prop: 'name',
    label: '名称',
    width: '120',
}, {
    prop: 'type',
    label: '型号',
    width: '120',
}, {
    prop: 'prenum',
    label: '编制数',
    width: '100',
}, {
    prop: 'num',
    label: '现有数',
    width: '100',
}, {
    prop: 'accounttype',
    label: '计量单位',
    width: '80',
}, {
    prop: 'savestatus',
    label: '保存状态',
    width: '150',
}, {
    prop: 'eqstatus',
    label: '资源状态',
    width: '150',
}];
// 社会化保障力量 选项
const typeoptions = [{
    value: '饮食',
}, {
    value: '医疗',
}, {
    value: '油料',
}, {
    value: '供水',
}, {
    value: '供电',
}, {
    value: '交通',
}];
// 机构及设施情况 Table 字段
const zsstatustable = [{
    prop: 'campname',
    label: '营区名称',
    width: '100',
}, {
    prop: 'type',
    label: '类型',
    width: '100',
}, {
    prop: 'project',
    label: '项目',
    width: '120',
}, {
    prop: 'describe',
    label: '描述',
    width: '200',
}];
// 营区 社会化保障力量 Table 字段
const societyhelptable = [{
    prop: 'type',
    label: '类别',
    width: '100',
}, {
    prop: 'corporatedepartment',
    label: '合同单位',
    width: '100',
}, {
    prop: 'servicescale',
    label: '服务范围',
    width: '100',
}, {
    prop: 'powerscale',
    label: '规模范围',
    width: '100',
}];
//保障单元 Table 字段
const baozhangdanyuan = [{
    prop: 'name',
    label: '名称',
    width: '100',
}, {
    prop: 'leixing',
    label: '类型',
    width: '100',
}, {
    prop: 'jibie',
    label: '级别',
    width: '100',
}, {
    prop: 'baozhangzhineng',
    label: '保障职能',
    width: '100',
}, {
    prop: 'baozhangnnegli',
    label: '保障能力',
    width: '100',
}, {
    prop: 'beizhu',
    label: '备注',
    width: '100',
}];
// 阵地 社会化保障力量 Table 字段
const societyhelptable1 = [{
    prop: 'positionname',
    label: '阵地名称',
    width: '100',
}, {
    prop: 'type',
    label: '类别',
    width: '100',
}, {
    prop: 'corporatedepartment',
    label: '合同单位',
    width: '100',
}];
// 周边可用支援力量 选项
const aroundtypeoptions = [{
    value: '银行机构',
}, {
    value: '物资补给',
}, {
    value: '医疗机构',
}, {
    value: '仓储物流',
}, {
    value: '运输投送',
}, {
    value: '军事设施',
}, {
    value: '其他',
}];
// 营区 周边可用支援力量 Table 字段
const aroundhelptable = [{
    prop: 'type',
    label: '类别',
    width: '120',
}, {
    prop: 'helpername',
    label: '支援单位名称',
    width: '160',
}, {
    prop: 'contact',
    label: '联系人',
    width: '100',
}, {
    prop: 'phone',
    label: '联系电话',
    width: '100',
}, {
    prop: 'relatedrules',
    label: '相关机制建立情况',
    width: '120',
}, {
    prop: 'remark',
    label: '备注',
    width: '120',
}];
// 阵地 周边可用支援力量 Table 字段
const aroundhelptable1 = [{
    prop: 'positionname',
    label: '阵地名称',
    width: '100',
}, {
    prop: 'type',
    label: '类别',
    width: '120',
}, {
    prop: 'helpername',
    label: '支援单位名称',
    width: '160',
}, {
    prop: 'contact',
    label: '联系人',
    width: '100',
}, {
    prop: 'phone',
    label: '联系电话',
    width: '100',
}];
// 联勤及其它军兵种力量 Table 字段
const associatehelptable = [{
    prop: 'type',
    label: '类别',
    width: '100',
}, {
    prop: 'name',
    label: '机构名称',
    width: '120',
}, {
    prop: 'contact',
    label: '联系人',
    width: '100',
}, {
    prop: 'phone',
    label: '联系电话',
    width: '100',
}, {
    prop: 'connectstates',
    label: '渠道畅通情况',
    width: '120',
}, {
    prop: 'province',
    label: '省',
    width: '80',
}, {
    prop: 'city',
    label: '市',
    width: '80',
}, {
    prop: 'area',
    label: '区',
    width: '80',
}, {
    prop: 'address',
    label: '详细地址',
    width: '100',
}];
// 国防动员力量 Table 字段
const countryhelptable = [{
    prop: 'campname',
    label: '营区名称',
    width: '100',
}, {
    prop: 'name',
    label: '机构名称',
    width: '100',
}, {
    prop: 'contact',
    label: '联系人',
    width: '120',
}, {
    prop: 'phone',
    label: '联系电话',
    width: '160',
}, {
    prop: 'relatedstate',
    label: '相关机制建立情况',
    width: '100',
}, {
    prop: 'address',
    label: '地址',
    width: '100',
}];
// 联勤及其它军兵种力量 选项
const associatehelpoptions = [{
    value: '联勤保障关系',
}, {
    value: '被装',
}, {
    value: '给养物资',
}, {
    value: '营房物资',
}, {
    value: '油料',
}, {
    value: '药材',
}, {
    value: '体系医院',
}, {
    value: '铁路',
}, {
    value: '航空',
}, {
    value: '公路',
}, {
    value: '水运',
}];
// 保障组 Table 字段
const backgroundtable = [{
    prop: 'groupname',
    label: '保障编组名称',
    width: '120',
}, {
    prop: 'peoplenum',
    label: '保障编组人数',
    width: '100',
}, {
    prop: 'groupnum',
    label: '保障分队数量',
    width: '100',
}];
// 保障分队 Table 字段
const minibackgroundtable = [{
    prop: 'backupscene',
    label: '保障场景',
    width: '120',
}, {
    prop: 'name',
    label: '保障分队名称',
    width: '100',
}, {
    prop: 'num',
    label: '人数',
    width: '100',
}, {
    prop: 'peoplefrom',
    label: '兵力来源',
    width: '100',
}, {
    prop: 'describe',
    label: '保障方式描述',
    width: '120',
}];
// 保障场景
const backupsceneoptions = [{
    value: '定点保障',
}, {
    value: '全程机动',
}, {
    value: '途中机动',
}, {
    value: '就地依托',
}, {
    value: '随机随舰',
}];
// 保障场景
const nowequipments = [{
    value: '加油车',
}, {
    value: '运水车',
}, {
    value: '运输车',
}, {
    value: '越野车',
}];
const mapSelectOptions = [{
    value: '人员数量',
    label: '人员数量',
    children: [
        { value: '编制数量', label: '编制数量' },
        { value: '实有数量', label: '实有数量' }
    ]
}, {
    value: '单位类别',
    label: '单位类别',
    children: [
        { value: '正师', label: '正师' },
        { value: '副师', label: '副师' },
        { value: '正团', label: '正团' },
        { value: '副团', label: '副团' },
    ]
}]

const relationData = {
    nodes: [{
            id: "00",
            name: "实力信息",
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
        }
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
        }
    ],
}


export default {
    camptable,
    positiontable,
    peopletable,
    peopleoptions,
    majoroptions1,
    majoroptions2,
    equipmentoptions,
    statusoptions,
    equipmenttable,
    typeoptions,
    zsstatustable,
    societyhelptable,
    aroundtypeoptions,
    aroundhelptable,
    societyhelptable1,
    aroundhelptable1,
    associatehelptable,
    countryhelptable,
    associatehelpoptions,
    backgroundtable,
    minibackgroundtable,
    backupsceneoptions,
    savestatusoptions,
    nowequipments,
    pequipmenttable,
    baozhangdanyuan,
    //地图可视化筛选项
    mapSelectOptions,
    //关系图谱基础数据
    relationData
};