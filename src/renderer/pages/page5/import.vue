<template>
<el-container class="home1-container">
  <div class="block">
  <el-slider
  v-model="sidewidth"
  :max="90"
  vertical
  height="200px">
  </el-slider>
  </div>
    <el-aside :width="sidewidth+'%'">
      <el-card>
        <el-input
        placeholder="输入单位关键字进行过滤"
        prefix-icon="el-icon-search"
        v-model="filterText">
        </el-input>
        <el-tree
        :data="treedata"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :props="defaultProps"
        ref="tree"
        @node-click="getCurrentNodeclick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
              <span>
              <el-upload :before-upload="handleUpload" action="default">
                <el-button
                type="text"
                size="mini"
                @click="() => append(data)">
                导入
                </el-button>
              </el-upload>
              </span>
              <span>
                <el-button
                type="text"
                size="mini"
                @click="() => exportdata(data)">
                导出
                </el-button>
              </span>
            </span>
        </el-tree>
      </el-card>
    </el-aside>
  <el-main>
  </el-main>
</el-container>
</template>

<script>
// 城市选择组件
import VDistpicker from 'v-distpicker';
import sq3 from 'sqlite3';
// import fs from 'fs';
import fse from 'fs-extra';
// import xlsx from 'node-xlsx';
import path from 'path';
import os from 'os';
import day from 'dayjs';
import rdb from '../../utils/rdb';
// import { ipcRenderer } from 'electron';
export default {
  name: 'department',
  components: { VDistpicker },
  data() {
    return {
      // 单位树的宽度
      sidewidth: 40,
      // 获取插入单位数据的编码
      departmentcode: '',
      departmentname: '',
      // 获取插入营区数据的编码
      campcode: '',
      // 加载进来的数据库操作 句柄
      // 临时
      tempdb: '',
      // 全局
      globaldb: '',
      // 筛选过滤用
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      // Tree data
      treedata: [{
        id: '00',
        class: 1,
        label: '部队',
        children: [],
      }],
    };
  },
  created() {
    // 构建单位树
    this.initTree();
  },
  watch: {
    // 过滤单位树文本
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 初始化和更新tree
    initTree() {
      this.treedata = [{
        id: '00',
        class: 1,
        label: '部队',
        children: [],
      }];
      const rowSQL = 'SELECT departmentcode,departmentname,class FROM department WHERE isdel = 0';
      this.$db.all(rowSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '单位树加载失败',
            desc: err,
          });
        } else {
          const dic = [];
          // 建立二级单位与子单位字典库
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '3') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              dic.push(newChild);
            }
          }
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '4') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname };
              const temp = res[i].departmentcode.substring(0, res[i].departmentcode.lastIndexOf('-'));
              this.$logger(temp);
              for (let j = 0; j < dic.length; j++) {
                if (temp === dic[j].id) {
                  dic[j].children.push(newChild);
                }
              }
            }
          }
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '2') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              for (let j = 0; j < dic.length; j++) {
                const temp = dic[j].id.substring(0, dic[j].id.lastIndexOf('-'));
                if (temp === newChild.id) {
                  newChild.children.push(dic[j]);
                }
              }
              this.treedata[0].children.push(newChild);
            }
          }
        }
      });
    },
    // 获取当前选中node的数据
    getCurrentNodeclick(data) {
      this.departmentcode = data.id;
      // this.$logger(this.departmentcode);
    },
    // 导入数据
    append(data) {
      this.departmentcode = data.id;
      this.$logger(this.departmentcode);
    },
    // 导入sqlite3数据 并判断数据格式
    handleUpload(file) {
      const isPD = file.name.split('.')[1] === 'db';
      this.$logger(isPD);
      if (!isPD) {
        this.$message.error('上传头像图片只能是 .db 格式!');
      } else {
        this.$confirm('确定导入此单位及其下属单位的全部信息吗？该操作将会覆盖原有数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.initdatabase(file.path, '0');
          this.initTree();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导入',
          });
        });
      }
      return false;
    },
    // 导出数据
    exportdata(data) {
      this.departmentcode = data.id;
      this.$logger(this.departmentcode);
      this.departmentname = data.label;
      const tmpPath = path.join(os.homedir(), 'Desktop');
      fse.ensureDirSync(tmpPath);
      const fileName = `${day().format('YYYY-MM-DD_HH-mm-ss')}-${this.departmentname}.db`;
      const filePath = path.join(tmpPath, fileName);
      this.initdatabase(filePath, '1');
      // 导出参数
    },
    // 执行指定表批量删除操作
    // tablename 指定表
    // flag 判断执行导入还是导出
    deletebywhere(tablename, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      this.globaldb.serialize(() => {
        this.globaldb.run('BEGIN');
        const deleteSQL = `DELETE FROM ${tablename} WHERE isdel = '1'`;
        this.$logger(deleteSQL);
        this.globaldb.run(deleteSQL, err => {
          if (err) {
            this.$logger(err);
            this.globaldb.run('ROLLBACK');
            this.$Notice.error({
              title: '删除失败',
              desc: err,
            });
          }
        });
        this.globaldb.run('COMMIT');
      });
    },
    // 初始化导入导出数据库文件
    initdatabase(dbfilepath, flag) {
      const sqlite3 = sq3.verbose();
      this.tempdb = new sqlite3.Database(dbfilepath);
      if (flag === '0') {
        this.globaldb = this.tempdb;
      } else {
        rdb.test(this.tempdb);
        this.globaldb = this.$db;
      }
      const test = `SELECT departmentcode FROM camp WHERE departmentcode LIKE '%${this.departmentcode}%'`;
      this.$logger(test);
      this.globaldb.all(test, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          if (!res) {
            this.$Notice.error({
              title: '导入失败',
              desc: '该数据库中不存在导入单位的相关数据',
            });
          } else {
            if (flag === '0') this.importcontrol('0');
            else {
              this.importcontrol('1');
              this.$message({
                message: '导出到桌面成功！',
                type: 'success',
              });
            }
          }
        }
      });
    },
    // 导入导出操作控制函数 数据获取与删除
    importcontrol(flag) {
      // department table
      this.gettabledata('department', 'departmentcode', this.departmentcode, flag);
      this.deletebywhere('department');
      // camp table
      // this.deletebywhere('camp', 'campcode', this.departmentcode);
      this.gettabledata('camp', 'departmentcode', this.departmentcode, flag);
      this.deletebywhere('camp');
      // posiotion table
      // this.deletebywhere('position', 'positioncode', this.departmentcode);
      this.gettabledata('position', 'campcode', this.departmentcode, flag);
      this.deletebywhere('position');
      // peoplecondition table
      // this.deletebywhere('peoplecondition', 'id', this.departmentcode);
      this.gettabledata('peoplecondition', 'campcode', this.departmentcode, flag);
      this.deletebywhere('peoplecondition');
      // equipmentcondition table
      // this.deletebywhere('equipmentcondition', 'id', this.departmentcode);
      this.gettabledata('equipmentcondition', 'code', this.departmentcode, flag);
      this.deletebywhere('equipmentcondition');
      // zsstatus table
      // this.deletebywhere('zsstatus', 'id', this.departmentcode);
      this.gettabledata('zsstatus', 'campcode', this.departmentcode, flag);
      this.deletebywhere('zsstatus');
      // associatehelp table
      // this.deletebywhere('associatehelp', 'id', this.departmentcode);
      this.gettabledata('associatehelp', 'campcode', this.departmentcode, flag);
      this.deletebywhere('associatehelp');
      // socityhelp table
      // this.deletebywhere('socityhelp', 'id', this.departmentcode);
      this.gettabledata('socityhelp', 'code', this.departmentcode, flag);
      this.deletebywhere('socityhelp');
      // aroundhelp table
      // this.deletebywhere('aroundhelp', 'id', this.departmentcode);
      this.gettabledata('aroundhelp', 'code', this.departmentcode, flag);
      this.deletebywhere('aroundhelp');
      // backupgroup table
      // this.deletebywhere('backupgroup', 'id', this.departmentcode);
      this.gettabledata('backupgroup', 'campcode', this.departmentcode, flag);
      this.deletebywhere('backupgroup');
      // minibackupgroup table
      // this.deletebywhere('minibackupgroup', 'id', this.departmentcode);
      this.gettabledata('minibackupgroup', 'backupgroupcode', this.departmentcode, flag);
      this.deletebywhere('minibackupgroup');
      // this.tempdb.close();
    },
    // 导入导出控制 数据获取并调用插入函数
    gettabledata(tablename, columname, value, flag) {
      if (flag === '0') this.globaldb = this.tempdb;
      else this.globaldb = this.$db;
      const querySQL = `SELECT * FROM ${tablename} WHERE ${columname} LIKE '%${value}%'`;
      this.$logger(querySQL);
      this.globaldb.all(querySQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          if (tablename === 'department') this.insertdepartment(res, flag);
          else if (tablename === 'camp') this.insertcamp(res, flag);
          else if (tablename === 'position') this.insertposition(res, flag);
          else if (tablename === 'peoplecondition') this.insertpeoplecondition(res, flag);
          else if (tablename === 'equipmentcondition') this.insertequipmentcondition(res, flag);
          else if (tablename === 'zsstatus') this.insertzsstatus(res, flag);
          else if (tablename === 'associatehelp') this.insertassociatehelp(res, flag);
          else if (tablename === 'socityhelp') this.insertsocityhelp(res, flag);
          else if (tablename === 'aroundhelp') this.insertaroundhelp(res, flag);
          else if (tablename === 'backupgroup') this.insertbackupgroup(res, flag);
          else if (tablename === 'minibackupgroup') this.insertminibackupgroup(res, flag);
        }
      });
    },
    // **************
    // 各种表的数据插入操作
    // **************
    insertdepartment(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(departmentcode) AS totalCount from department WHERE departmentcode = '${res[i].departmentcode}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE department SET
                departmentname='${res[i].departmentname}'
                ,class='${res[i].class}'
                ,province='${res[i].province}'
                ,city='${res[i].city}'
                ,area='${res[i].area}'
                ,address='${res[i].address}'
                ,zip='${res[i].zip}'
                ,isdel='${res[i].isdel}'
                WHERE departmentcode = '${res[i].departmentcode}'`;
            } else {
              datasql = `INSERT INTO department (departmentcode,departmentname,class,province,city,area,address,zip,isdel)
              VALUES ('${res[i].departmentcode}','${res[i].departmentname}','${res[i].class}','${res[i].province}',
              '${res[i].city}','${res[i].area}','${res[i].address}','${res[i].zip}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertcamp(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(campcode) AS totalCount from camp WHERE campcode = '${res[i].campcode}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE camp SET
                campname='${res[i].campname}'
          ,departmentcode='${res[i].departmentcode}'
          ,province='${res[i].province}'
          ,city='${res[i].city}'
          ,area='${res[i].area}'
          ,address='${res[i].address}'
          ,nowpower='${res[i].nowpower}'
          ,staydepartment='${res[i].staydepartment}'
          ,camppeople='${res[i].camppeople}'
          ,takearea='${res[i].takearea}'
          ,buildarea='${res[i].buildarea}'
          ,groundarea='${res[i].groundarea}'
          ,groundhouse='${res[i].groundhouse}'
          ,helpbed='${res[i].helpbed}'
          ,aroundstates='${res[i].aroundstates}'
          ,isdel='${res[i].isdel}'
          WHERE campcode = '${res[i].campcode}'`;
            } else {
              datasql = `INSERT INTO camp (campcode,campname,departmentcode,province,city,area,address,
                nowpower,staydepartment,camppeople,
                takearea,buildarea,groundarea,groundhouse,helpbed,aroundstates,isdel)
                VALUES ('${res[i].campcode}','${res[i].campname}','${res[i].departmentcode}','${res[i].province}',
                '${res[i].city}','${res[i].area}','${res[i].address}',
                '${res[i].nowpower}','${res[i].staydepartment}','${res[i].camppeople}','${res[i].takearea}',
                '${res[i].buildarea}','${res[i].groundarea}','${res[i].groundhouse}','${res[i].helpbed}','${res[i].aroundstates}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertposition(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(positioncode) AS totalCount from position WHERE positioncode = '${res[i].positioncode}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE position SET
                positionname='${res[i].positionname}'
          ,campcode='${res[i].campcode}'
          ,isbuild='${res[i].isbuild}'
          ,isauto='${res[i].isauto}'
          ,groundarea='${res[i].groundarea}'
          ,buildingarea='${res[i].buildingarea}'
          ,backuppeople='${res[i].backuppeople}'
          ,partindepartment='${res[i].partindepartment}'
          ,province='${res[i].province}'
          ,city='${res[i].city}'
          ,area='${res[i].area}'
          ,address='${res[i].address}'
          ,backuppower='${res[i].backuppower}'
          ,aroundstates='${res[i].aroundstates}'
          ,trafficstatus='${res[i].trafficstatus}'
          ,people1='${res[i].people1}'
          ,people2='${res[i].people2}'
          ,people3='${res[i].people3}'
          ,people4='${res[i].people4}'
          ,colum1='${res[i].colum1}'
          ,colum2='${res[i].colum2}'
          ,colum3='${res[i].colum3}'
          ,colum4='${res[i].colum4}'
          ,colum5='${res[i].colum5}'
          ,colum6='${res[i].colum6}'
          ,isdel='${res[i].isdel}'
          WHERE positioncode = '${res[i].positioncode}'`;
            } else {
              datasql = `INSERT INTO position (
                    positioncode,
                    positionname,
                    campcode,
                    isbuild,
                    isauto,
                    groundarea,
                    buildingarea,
                    backuppeople,
                    partindepartment,
                    province,
                    city,
                    area,
                    address,
                    backuppower,
                    aroundstates,
                    trafficstatus,
                    people1,
                    people2,
                    people3,
                    people4,
                    colum1,
                    colum2,
                    colum3,
                    colum4,
                    colum5,
                    colum6,
                    isdel)
            VALUES ('${res[i].positioncode}','${res[i].positionname}','${res[i].campcode}','${res[i].isbuild}','${res[i].isauto}',
            '${res[i].groundarea}','${res[i].buildingarea}','${res[i].backuppeople}','${res[i].partindepartment}',
            '${res[i].province}','${res[i].city}','${res[i].area}','${res[i].address}','${res[i].backuppower}',
            '${res[i].aroundstates}','${res[i].trafficstatus}','${res[i].people1}','${res[i].people2}','${res[i].people3}',
            '${res[i].people4}','${res[i].colum1}','${res[i].colum2}','${res[i].colum3}','${res[i].colum4}','${res[i].colum5}',
            '${res[i].colum6}','0')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertpeoplecondition(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from peoplecondition WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE peoplecondition SET
          campcode='${res[i].campcode}'
          ,name='${res[i].name}'
          ,peopletype='${res[i].peopletype}'
          ,peopleclass='${res[i].peopleclass}'
          ,peopledp='${res[i].peopledp}'
          ,homeplace='${res[i].homeplace}'
          ,partintime='${res[i].partintime}'
          ,phone='${res[i].phone}'
          ,major='${res[i].major}'
          ,othermajor='${res[i].othermajor}'
          ,remark='${res[i].remark}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO peoplecondition (
                    id,
                    campcode,
                    name,
                    peopletype,
                    peopleclass,
                    peopledp,
                    homeplace,
                    partintime,
                    phone,
                    major,
                    othermajor,
                    remark,isdel)
            VALUES ('${res[i].id}','${res[i].campcode}','${res[i].name}','${res[i].peopletype}',
            '${res[i].peopleclass}','${res[i].peopledp}','${res[i].homeplace}','${res[i].partintime}',
            '${res[i].phone}','${res[i].major}','${res[i].othermajor}','${res[i].remark}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertequipmentcondition(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from equipmentcondition WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE equipmentcondition SET
          flag='${res[i].flag}'
          ,code='${res[i].code}'
          ,equipmenttype='${res[i].equipmenttype}'
          ,name='${res[i].name}'
          ,type='${res[i].type}'
          ,prenum='${res[i].prenum}'
          ,num='${res[i].num}'
          ,accounttype='${res[i].accounttype}'
          ,savestatus='${res[i].savestatus}'
          ,eqstatus='${res[i].eqstatus}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO equipmentcondition (
                    id,
                    flag,
                    code,
                    equipmenttype,
                    name,
                    type,
                    prenum,
                    num,
                    accounttype,
                    savestatus,
                    eqstatus,isdel)
            VALUES ('${res[i].id}','${res[i].flag}','${res[i].code}','${res[i].equipmenttype}','${res[i].name}',
            '${res[i].type}','${res[i].prenum}','${res[i].num}','${res[i].accounttype}','${res[i].savestatus}','${res[i].eqstatus}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertzsstatus(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from zsstatus WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE zsstatus SET
          campcode='${res[i].campcode}'
          ,type='${res[i].type}'
          ,project='${res[i].project}'
          ,describe='${res[i].describe}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO zsstatus (
                    id,
                    campcode,
                    type,
                    project,
                    describe,
                    isdel)
            VALUES ('${res[i].id}','${res[i].campcode}','${res[i].type}','${res[i].project}','${res[i].describe}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertassociatehelp(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from associatehelp WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE associatehelp SET
          campcode='${res[i].campcode}'
          ,type='${res[i].type}'
          ,name='${res[i].name}'
          ,contact='${res[i].contact}'
          ,phone='${res[i].phone}'
          ,connectstates='${res[i].connectstates}'
          ,province='${res[i].province}'
          ,city='${res[i].city}'
          ,area='${res[i].area}'
          ,address='${res[i].address}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO associatehelp (
                    id,
                    campcode,
                    type,
                    name,
                    contact,
                    phone,
                    connectstates,
                    province,
                    city,
                    area,
                    address,isdel)
            VALUES ('${res[i].id}','${res[i].campcode}','${res[i].type}','${res[i].name}'
            ,'${res[i].contact}','${res[i].phone}','${res[i].connectstates}','${res[i].province}','${res[i].city}','${res[i].area}',
            '${res[i].address}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertsocityhelp(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from socityhelp WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE socityhelp SET
          flag='${res[i].flag}'
          ,code='${res[i].code}'
          ,type='${res[i].type}'
          ,corporatedepartment='${res[i].corporatedepartment}'
          ,servicescale='${res[i].servicescale}'
          ,powerscale='${res[i].powerscale}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO socityhelp (
                    id,
                    flag,
                    code,
                    type,
                    corporatedepartment,
                    servicescale,
                    powerscale,isdel)
            VALUES ('${res[i].id}','${res[i].flag}','${res[i].code}','${res[i].type}','${res[i].corporatedepartment}',
            '${res[i].servicescale}','${res[i].powerscale}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertaroundhelp(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from aroundhelp WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE aroundhelp SET
          flag='${res[i].flag}'
          ,code='${res[i].code}'
          ,type='${res[i].type}'
          ,helpername='${res[i].helpername}'
          ,contact='${res[i].contact}'
          ,phone='${res[i].phone}'
          ,relatedrules='${res[i].relatedrules}'
          ,remark='${res[i].remark}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO aroundhelp (
                    id,
                    flag,
                    code,
                    type,
                    helpername,
                    contact,
                    phone,
                    relatedrules,
                    remark,isdel)
            VALUES ('${res[i].id}','${res[i].flag}','${res[i].code}','${res[i].type}','${res[i].helpername}'
            ,'${res[i].contact}','${res[i].phone}','${res[i].relatedrules}','${res[i].remark}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertbackupgroup(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from backupgroup WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE backupgroup SET
          campcode='${res[i].campcode}'
          ,groupname='${res[i].groupname}'
          ,peoplenum='${res[i].peoplenum}'
          ,groupnum='${res[i].groupnum}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO backupgroup (
                    id,
                    campcode,
                    groupname,
                    peoplenum,
                    groupnum,
                    isdel)
            VALUES ('${res[i].id}','${res[i].campcode}','${res[i].groupname}','${res[i].peoplenum}',
            '${res[i].groupnum}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
    insertminibackupgroup(res, flag) {
      if (flag === '0') this.globaldb = this.$db;
      else this.globaldb = this.tempdb;
      for (let i = 0; i < res.length; i++) {
        let datasql;
        const SQL = `SELECT COUNT(id) AS totalCount from minibackupgroup WHERE id = '${res[i].id}'`;
        this.globaldb.get(SQL, (err, temp) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '插入失败',
              desc: err,
            });
          } else {
            if (temp.totalCount) {
              datasql = `UPDATE minibackupgroup SET
          backupgroupcode='${res[i].backupgroupcode}'
          ,backupscene='${res[i].backupscene}'
          ,name='${res[i].name}'
          ,num='${res[i].num}'
          ,peoplefrom='${res[i].peoplefrom}'
          ,describe='${res[i].describe}'
          ,isdel='${res[i].isdel}'
          WHERE id = '${res[i].id}'`;
            } else {
              datasql = `INSERT INTO minibackupgroup (
                    id,
                    backupgroupcode,
                    backupscene,
                    name,
                    num,
                    peoplefrom,
                    describe,isdel)
            VALUES ('${res[i].id}','${res[i].backupgroupcode}','${res[i].backupscene}','${res[i].name}',
            '${res[i].num}','${res[i].peoplefrom}','${res[i].describe}','${res[i].isdel}')`;
            }
            this.$logger(datasql);
            this.globaldb.run(datasql, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '插入失败',
                  desc: err,
                });
              }
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home1-container{
    height: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
