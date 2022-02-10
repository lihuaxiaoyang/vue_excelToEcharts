import logger from './logger';
const test = db => {
    db.serialize(() => {
        /*
         * 单位表 department
         * 单位代码
         * 单位名称
         * 省
         * 市
         * 区
         * 详细地址
         * 邮编
         */
        db.run(`CREATE TABLE department (
  departmentcode VARCHAR (30) PRIMARY KEY NOT NULL, 
  departmentname VARCHAR (30) NOT NULL, 
  class VARCHAR (10) NOT NULL, 
  province VARCHAR (20) NOT NULL, 
  city VARCHAR (20) NOT NULL, 
  area VARCHAR (20) NOT NULL, 
  address VARCHAR (50) NOT NULL, 
  zip VARCHAR (20) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)`, err => {
            logger(err);
        });
        /**
         * 插入数据
         */
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-nJe6', '东部基地', '2', '江苏省', '南京市', '栖霞区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-vLXv', '南部基地', '2', '广东省', '广州市', '白云区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-Mo58', '西部基地', '2', '陕西省', '铜川市', '王益区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-0y8y', '北部基地', '2', '辽宁省', '沈阳市', '和平区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-aAk0', '中部基地', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-4eds', '网战基地', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-KF3K', '一局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-8F3G', '二局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-3EK9', '三局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-85ED', '七局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-1WDG', '八局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-09U7', '九局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-6TG7', '十局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-RFGT', '十一局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-P098', '十二局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-8UYT', '十三局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-1QAW', '十四局', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-76RV', '五十六研究所', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-LIO5', '五十七研究所', '2', '北京市', '北京市', '西城区', ' ', '000000','0')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO department (departmentcode, departmentname, class, province, city, area, address, zip, isdel) 
VALUES ('00-2W43', '信息工程大学', '2', '河南省', '郑州市', '中原区', '科学大道62号', '450001','0')`, err => {
            logger(err);
        });
        /*
         * 用户表 user
         * id
         * 用户名
         * 密码
         */
        db.run(`CREATE TABLE user (
id VARCHAR (30) PRIMARY KEY NOT NULL, 
username VARCHAR (40) NOT NULL, 
password VARCHAR (40) NOT NULL)`, err => {
            logger(err);
        });
        db.run(`INSERT INTO user (id, username, password) 
VALUES ('sdfg', 'admin', '1qaz!QAZ')`, err => {
            logger(err);
        });
        /*
         * 营区表 camp
         * 营区代码
         * 营区名称
         * 单位代码
         * 省
         * 市
         * 区
         * 详细地址
         * 营区现有后勤保障力量
         * 驻营单位
         * 营区保障对象总人数
         * 占地面积
         * 建筑面积
         * 空余场地面积
         * 空余营房面积
         * 医疗床位数量
         * 周边环境情况
         */
        db.run(`CREATE TABLE camp (
  campcode VARCHAR (30) NOT NULL PRIMARY KEY, 
  campname VARCHAR (30) NOT NULL, 
  departmentcode VARCHAR (30) NOT NULL, 
  province VARCHAR (20) NOT NULL, 
  city VARCHAR (20) NOT NULL, 
  area VARCHAR (20) NOT NULL, 
  address VARCHAR (50) NOT NULL,  
  nowpower VARCHAR (100) NOT NULL, 
  staydepartment VARCHAR (200) NOT NULL, 
  camppeople VARCHAR (20) NOT NULL,
  takearea VARCHAR (30) NOT NULL,
  buildarea VARCHAR (30) NOT NULL,
  groundarea VARCHAR (30) NOT NULL,
  groundhouse VARCHAR (30) NOT NULL,
  helpbed VARCHAR (30) NOT NULL,
  aroundstates VARCHAR (200) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)`, err => {
            logger(err);
        });
        /*
         * 阵地表 position
         * 阵地代码
         * 阵地名称
         * 营区代码
         * 阵地类型
         * 是否有人值守
         * 占地面积
         * 建筑面
         * 驻营单位
         * 后勤人数
         * 省
         * 市
         * 区
         * 详细地址
         * 保障能力情况
         * 周边环境情况
         * 交通条件描述
         * 军官
         * 士兵
         * 文职
         * 聘用人员
         * 电源
         * 营房
         * 床位
         * 水源
         * 坑道
         * 油料
         */
        db.run(`CREATE TABLE position (
  positioncode VARCHAR (30) NOT NULL PRIMARY KEY, 
  positionname VARCHAR (30) NOT NULL, 
  campcode VARCHAR (30) NOT NULL, 
  isbuild VARCHAR (30) NOT NULL, 
  isauto VARCHAR (20) NOT NULL, 
  groundarea VARCHAR (20) NOT NULL, 
  buildingarea VARCHAR (20) NOT NULL, 
  backuppeople VARCHAR (20) NOT NULL, 
  partindepartment VARCHAR (30), 
  province VARCHAR (20) NOT NULL, 
  city VARCHAR (20) NOT NULL, 
  area VARCHAR (20) NOT NULL, 
  address VARCHAR (50) NOT NULL, 
  backuppower VARCHAR (200),
  aroundstates VARCHAR (200) NOT NULL,
  trafficstatus VARCHAR (255) NOT NULL,
  people1 VARCHAR (20), 
  people2 VARCHAR (20), 
  people3 VARCHAR (20), 
  people4 VARCHAR (20), 
  colum1 VARCHAR (40) NOT NULL,  
  colum2 VARCHAR (40), 
  colum3 VARCHAR (40), 
  colum4 VARCHAR (40), 
  colum5 VARCHAR (40), 
  colum6 VARCHAR (40), 
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 人员情况表 peoplecondition
         * id
         * 营区编码
         * 人员姓名
         * 人员类别
         * 职级
         * 部职别
         * 籍贯
         * 入伍年月
         * 电话
         * 主专业
         * 其他专业
         * 备注
         */
        db.run(`CREATE TABLE peoplecondition (
  id VARCHAR (40) PRIMARY KEY NOT NULL, 
  campcode VARCHAR (30) NOT NULL, 
  name VARCHAR (30) NOT NULL, 
  peopletype VARCHAR (30) NOT NULL,
  peopleclass VARCHAR (30) NOT NULL,
  peopledp VARCHAR (30) NOT NULL,
  homeplace VARCHAR (30) NOT NULL,
  partintime VARCHAR (30) NOT NULL,
  phone VARCHAR (30) NOT NULL,
  major VARCHAR (30) NOT NULL, 
  othermajor VARCHAR (100), 
  remark VARCHAR (200),
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 资源情况表 equipmentcondition
         * id
         * 营区代码
         * 资源类型
         * 名称
         * 型号
         * 编制数
         * 现有数
         * 计量单位
         * 保存状态
         * 资源状态
         */
        db.run(`CREATE TABLE equipmentcondition (
  id VARCHAR (40) PRIMARY KEY NOT NULL, 
  flag VARCHAR (10) NOT NULL, 
  code VARCHAR (30) NOT NULL, 
  equipmenttype VARCHAR (30) NOT NULL, 
  name VARCHAR (30) NOT NULL, 
  type VARCHAR (30) NOT NULL, 
  prenum VARCHAR (30) NOT NULL, 
  num VARCHAR (30) NOT NULL, 
  accounttype VARCHAR (20) NOT NULL, 
  savestatus VARCHAR (30) NOT NULL,
  eqstatus VARCHAR (30) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 专业机构及设施设备情况表 zsstatus
         * id
         * 营区代码
         * 类型
         * 项目
         * 简述
         */
        db.run(`CREATE TABLE zsstatus (
  id VARCHAR (40) NOT NULL PRIMARY KEY, 
  campcode VARCHAR (30) NOT NULL, 
  type VARCHAR (30) NOT NULL, 
  project VARCHAR (100) NOT NULL, 
  describe VARCHAR (200) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 联勤及其它军兵种保障力量表 associatehelp
         * id
         * 营区代码
         * 类别
         * 机构名称
         * 联系人
         * 联系电话
         * 渠道畅通情况
         * 省
         * 市
         * 区
         * 地址
         */
        db.run(`CREATE TABLE associatehelp (
  id VARCHAR (40) NOT NULL PRIMARY KEY, 
  campcode VARCHAR (30) NOT NULL, 
  type VARCHAR (30) NOT NULL, 
  name VARCHAR (30) NOT NULL, 
  contact VARCHAR (30) NOT NULL, 
  phone VARCHAR (30) NOT NULL, 
  connectstates VARCHAR (30) NOT NULL, 
  province VARCHAR (20) NOT NULL, 
  city VARCHAR (20) NOT NULL, 
  area VARCHAR (20) NOT NULL, 
  address VARCHAR (100) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 保障社会化情况表表 socityhelp
         * id
         * 营区代码
         * 类别
         * 合同单位
         * 服务范围
         * 规模范围
         */
        db.run(`CREATE TABLE socityhelp (
  id VARCHAR (40) PRIMARY KEY NOT NULL, 
  flag VARCHAR (10) NOT NULL, 
  code VARCHAR (30) NOT NULL, 
  type VARCHAR (30) NOT NULL, 
  corporatedepartment VARCHAR (40) NOT NULL, 
  servicescale VARCHAR (200) NOT NULL, 
  powerscale VARCHAR (200) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 周边可用支援力量表 aroundhelp
         * id
         * 营区代码
         * 类别
         * 支援单位名称
         * 联系人
         * 联系电话
         * 相关机制建立情况
         * 备注
         */
        db.run(`CREATE TABLE aroundhelp (
  id VARCHAR (40) PRIMARY KEY NOT NULL, 
  flag VARCHAR (10) NOT NULL, 
  code VARCHAR (30) NOT NULL, 
  type VARCHAR (30) NOT NULL, 
  helpername VARCHAR (50) NOT NULL, 
  contact VARCHAR (30) NOT NULL, 
  phone VARCHAR (30) NOT NULL, 
  relatedrules VARCHAR (200) NOT NULL, 
  remark VARCHAR (200) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 前端阵地实力信息表 positionpower
         * id
         * 阵地代码
         * 阵地类型
         * 合同单位
         * 服务范围
         * 规模范围
         */
        /*
* 保障组表 backupgroup
* id
* 营区代码
* 保障编组(分队)名称
* 保障编组(分队)人数
* 任务分队数量
* ,
  helppeople VARCHAR (30) NOT NULL,
  backuppeople VARCHAR (200) NOT NULL,
  isdel VARCHAR (10) NOT NULL
*/
        db.run(`CREATE TABLE backupgroup (
  id VARCHAR (40) PRIMARY KEY NOT NULL, 
  campcode VARCHAR (40) NOT NULL, 
  groupname VARCHAR (30) NOT NULL, 
  peoplenum VARCHAR (30) NOT NULL, 
  groupnum VARCHAR (30) NOT NULL, 
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });
        /*
         * 保障小队表 minibackupgroup
         * id
         * 保障编组代码
         * 保障场景
         * 任务分队名称
         * 人数
         * 兵力来源
         * 保障方式描述
         */
        db.run(`CREATE TABLE minibackupgroup (
  id VARCHAR (40) PRIMARY KEY NOT NULL, 
  backupgroupcode VARCHAR (40) NOT NULL, 
  backupscene VARCHAR (30) NOT NULL, 
  name VARCHAR (30) NOT NULL, 
  num VARCHAR (30) NOT NULL, 
  peoplefrom VARCHAR (50) NOT NULL, 
  describe VARCHAR (200) NOT NULL,
  field1 VARCHAR (40), 
  field2 VARCHAR (40), 
  isdel VARCHAR (10) NOT NULL)
  `, err => {
            logger(err);
        });


        db.run(`INSERT INTO "relationTableIndex" VALUES (1, 'camp', 'associatehelp-camp-relation', 'associatehelp-camp-name-link', 'associatehelp')`, err => {
            logger(err);
        });

        db.run(`INSERT INTO "relationTableIndex" VALUES (2, 'baozhangjigou', 'baozhangjigou-baozhangdanyuan-relation', 'baozhangjigou-baozhangdanyuan-name-link', 'baozhangdanyuan')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (3, 'baozhangjigou', 'baozhangjigou-camp-relation', 'baozhangjigou-camp-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (4, 'department', 'department-camp-guanli-relation', 'department-camp-guanli-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (5, 'department', 'department-camp-zhuying-relation', 'department-camp-zhuying-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (6, 'department', 'department-department-relation', 'department-department-name-link', 'department')`, err => {
            logger(err);
        });

        db.run(`INSERT INTO "relationTableIndex" VALUES (7, 'department', 'department-jigou-baozhang-relation', 'department-jigou-baozhang-name-link', 'baozhangjigou')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (8, 'guanjiansheshi', 'guanjiansheshi-department-guanli-relation', 'guanjiansheshi-department-guanli-name-link', 'department')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (9, 'people', 'people-camp-relation', 'people-camp-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`
  INSERT INTO "relationTableIndex" VALUES (10, 'people', 'people-department-relation', 'people-department-name-link', 'department')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (11, 'societyhelp', 'societyhelp-camp-relation', 'societyhelp-camp-name-link', 'camp')`, err => {
            logger(err);
        });
    });
};
export default {
    test,
};