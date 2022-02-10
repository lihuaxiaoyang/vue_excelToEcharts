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
        placeholder="输入单位-营区关键字进行过滤"
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
            <span v-show="data.class === '5'">
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              添加信息
            </el-button>
          </span>
        </span>
      </el-tree>
      </el-card>
    </el-aside>
    <el-main>
    <span class="showdata">{{showdata.label}} 现有人员共计 军官 {{showdata.temp1}}名 文职人员 {{showdata.temp2}}名 士兵 {{showdata.temp3}}名</span>
    <el-form :inline="true" class="demo-form-inline">
      <!-- 营区名称已取消 待重新添加 -->
      <el-form-item label="">
        <el-input v-model="serchParam.campname" placeholder="请输入营区名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="serchParam.peopletype" filterable placeholder="请选择人员类别" @change="optionchage">
          <el-option
          v-for="item in peopleoptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="serchParam.major" filterable placeholder="请选择专业类别">
          <el-option
          v-for="item in majoroptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="findbyname()"><i class="el-icon-search"></i>查询</el-button>
      </el-form-item>
      <el-form-item label="  " label-width="30px">
        <el-button type="success" @click="loadExcell()" :loading="downloadExcelLoading"><i class="el-icon-search"></i>导出</el-button>
      </el-form-item>
    </el-form>

    <el-table
    v-loading="listLoading"
    :data="tableData"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    style="width: 100%">
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        v-for="item in peopletable"
        :key="item.prop"
        align="left"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" size="mini">修 改</el-button>
          <el-button @click="deleteClick(scope.row)" type="danger" size="mini" >删 除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      align="center">
    </el-pagination>
  </div>
  <!-- 下拉框显示 没做 -->
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
      <el-form-item label="人员类别" prop="peopletype" style="width: 90%">
        <el-select v-model="form.peopletype" filterable placeholder="请选择人员类别" @change="optionchage">
          <el-option
          v-for="item in peopleoptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员姓名" prop="name" style="width: 90%">
        <el-input v-model="form.name" placeholder="请输入人员姓名"></el-input>
      </el-form-item>
      <el-form-item label="职级" prop="peopleclass" style="width: 90%">
        <el-input v-model="form.peopleclass" placeholder="请输入人员职级"></el-input>
      </el-form-item>
      <el-form-item label="部职别" prop="peopledp" style="width: 90%">
        <el-input v-model="form.peopledp" placeholder="请输入人员部职别"></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="homeplace" style="width: 90%">
        <el-input v-model="form.homeplace" placeholder="请输入籍贯"></el-input>
      </el-form-item>
      <el-form-item label="入伍年月" prop="partintime" style="width: 90%">
        <el-input v-model="form.partintime" placeholder="请输入入伍年月(例：1981.06)"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" style="width: 90%">
        <el-input v-model="form.phone" placeholder="请输入人员联系电话(办公电话或个人手机)"></el-input>
      </el-form-item>
      <el-form-item label="主要岗位" prop="major" style="width: 90%">
        <el-select v-model="form.major" filterable placeholder="请选择主要岗位">
          <el-option
          v-for="item in majoroptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兼职岗位" prop="othermajor" style="width: 90%">
        <el-select
        v-model="othermajors"
        multiple
        filterable
        placeholder="请选择兼职岗位">
        <el-option
          v-for="item in majoroptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
        <!-- <el-select v-model="form.othermajor" filterable placeholder="请选择其他专业">
          <el-option
          v-for="item in majoroptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 90%">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateForm('form')">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
  </el-main>
  </el-container>
</template>

<script>
// 城市选择组件
import VDistpicker from 'v-distpicker';
import download from '../../utils/download';
export default {
  name: 'position',
  components: { VDistpicker },
  data() {
    return {
      downloadExcelLoading: false,
      // 单位树的宽度
      sidewidth: 25,
      // 分页参数
      size: 20,
      page: 1,
      // 总的数据条目
      total: null,
      // 对话框标题
      title: '',
      // 对话框显示
      dialogFormVisible: false,
      // 判断是添加还是修改对话框
      choose: false,
      // 加载显示
      listLoading: false,
      // 对话框数组
      form: null,
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' },
        ],
        peopletype: [
          { required: true, message: '请选择人员类别', trigger: 'blur' },
        ],
        peopleclass: [
          { required: true, message: '请选择人员职级', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请选择联系电话(办公电话或个人手机)', trigger: 'blur' },
        ],
        major: [
          { required: true, message: '请选择主要岗位', trigger: 'blur' },
        ],
        peopledp: [
          { required: true, message: '请输入人员部职别', trigger: 'blur' },
        ],
        homeplace: [
          { required: true, message: '请输入人员籍贯', trigger: 'blur' },
        ],
        partintime: [
          { required: true, message: '请输入人员入伍年月', trigger: 'blur' },
        ],
      },
      // select 选择器字段
      peopleoptions: this.$val.peopleoptions,
      majoroptions: null,
      // table字段
      peopletable: this.$val.peopletable,
      // 原始样例数据
      tableData: null,
      // 统一查询编码
      code: '',
      // 查询字段
      serchParam: {
        peopletype: '',
        major: '',
        campname: '',
      },
      // 展示的数据
      showdata: {
        label: '',
        temp1: 0,
        temp2: 0,
        temp3: 0,
      },
      // 其他专业列表
      othermajors: [],
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
    this.form = {
      id: '',
      campcode: '',
      campname: '',
      name: '',
      peopletype: '',
      peopleclass: '',
      peopledp: '',
      homeplace: '',
      partintime: '',
      phone: '',
      major: '',
      othermajor: '',
      remark: '',
      isdel: '',
    };
    // 初始化单位营区树
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
      let campres;
      const rowSQL1 = 'SELECT campcode,campname,departmentcode FROM camp WHERE isdel = 0';
      const rowSQL2 = 'SELECT departmentcode,departmentname,class FROM department WHERE isdel = 0';
      this.$db.all(rowSQL1, (err, res1) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '营区树加载失败',
            desc: err,
          });
        } else {
          campres = res1;
        }
      });
      this.$db.all(rowSQL2, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '单位树加载失败',
            desc: err,
          });
        } else {
          // 三级单位与三级营区
          const temp3 = [];
          // 三级单位与下属营区的挂钩
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '4') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              for (let j = 0; j < campres.length; j++) {
                if (campres[j].departmentcode === res[i].departmentcode) {
                  const campChild = { id: campres[j].campcode, class: '5', label: campres[j].campname };
                  newChild.children.push(campChild);
                }
              }
              temp3.push(newChild);
            }
          }
          // 建立一级和二级单位字典库
          const temp2 = [];
          const temp1 = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '3') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              temp2.push(newChild);
            }
            if (res[i].class === '2') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              temp1.push(newChild);
            }
          }
          // 二级单位与三级单位挂钩
          for (let i = 0; i < temp2.length; i++) {
            for (let j = 0; j < temp3.length; j++) {
              const tempflag = temp3[j].id.substring(0, temp3[j].id.lastIndexOf('-'));
              if (tempflag === temp2[i].id) {
                temp2[i].children.push(temp3[j]);
              }
            }
          }
          // 二级单位与下属营区挂钩
          for (let i = 0; i < temp2.length; i++) {
            for (let j = 0; j < campres.length; j++) {
              const tempflag = campres[j].departmentcode;
              if (tempflag === temp2[i].id) {
                const newChild = { id: campres[j].campcode, class: '5', label: campres[j].campname };
                temp2[i].children.push(newChild);
              }
            }
          }
          // 一级单位与二级单位挂钩
          for (let i = 0; i < temp1.length; i++) {
            for (let j = 0; j < temp2.length; j++) {
              const tempflag = temp2[j].id.substring(0, temp2[j].id.lastIndexOf('-'));
              if (tempflag === temp1[i].id) {
                temp1[i].children.push(temp2[j]);
              }
            }
          }
          // 一级单位与下属营区挂钩
          for (let i = 0; i < temp1.length; i++) {
            for (let j = 0; j < campres.length; j++) {
              const tempflag = campres[j].departmentcode;
              if (tempflag === temp1[i].id) {
                const newChild = { id: campres[j].campcode, class: '5', label: campres[j].campname };
                temp1[i].children.push(newChild);
              }
            }
          }
          // 一级单位与部队挂钩
          for (let i = 0; i < temp1.length; i++) {
            this.treedata[0].children.push(temp1[i]);
          }
        }
      });
    },
    // 添加阵地
    append(data) {
      // 获取营区编码
      this.code = data.id;
      this.Add();
    },
    // 获取当前选中node的数据
    getCurrentNodeclick(data) {
      this.serchParam = {
        peopletype: '',
        major: '',
        campname: '',
      };
      this.code = data.id;
      this.getDataList(data.id);
      this.$logger(data.id);
      this.getDataforShow(data.label, data.id);
    },
    // 执行统计查询操作
    getDataforShow(label, code) {
      // 统计查询语句
      const calSQL = `SELECT peopletype FROM peoplecondition WHERE campcode LIKE '%${code}%'`;
      this.$db.all(calSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.showdata.temp1 = 0;
          this.showdata.temp2 = 0;
          this.showdata.temp3 = 0;
          this.showdata.label = label;
          for (let i = 0; i < res.length; i++) {
            if (res[i].peopletype === '军官') this.showdata.temp1++;
            else if (res[i].peopletype === '士兵') this.showdata.temp3++;
            else this.showdata.temp2++;
          }
        }
      });
    },
    // 执行查询操作
    getDataList(code) {
      // 主查询语句
      let whereSQL = '';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      const selectSQL = `SELECT
        peoplecondition.id,
        peoplecondition.campcode,
        peoplecondition.name,
        peoplecondition.peopletype,
        peoplecondition.major,
        peoplecondition.peopleclass,
        peoplecondition.peopledp,
        peoplecondition.homeplace,
        peoplecondition.partintime,
        peoplecondition.phone,
        peoplecondition.othermajor,
        peoplecondition.remark,
        camp.campname
        FROM peoplecondition LEFT OUTER JOIN camp ON 
        peoplecondition.campcode = camp.campcode `;
        // 查询数量
      const whereSQL1 = `WHERE peoplecondition.campcode LIKE '%${code}%' `;
      const whereSQL2 = `AND peoplecondition.peopletype LIKE '%${this.serchParam.peopletype}%' `;
      const whereSQL3 = `AND peoplecondition.major LIKE '%${this.serchParam.major}%' `;
      const whereSQL4 = `AND camp.campname LIKE '%${this.serchParam.campname}%' `;
      const whereSQL5 = 'AND peoplecondition.isdel = 0 ';
      const countSQL = `SELECT COUNT(peoplecondition.id) AS total FROM peoplecondition LEFT OUTER JOIN camp ON 
      peoplecondition.campcode = camp.campcode ` + whereSQL1 + whereSQL2 + whereSQL3 + whereSQL4 + whereSQL5 + pageSQL;
      // const whereSQL0 = `SELECT campcode FROM camp WHERE campname LIKE '%${this.serchParam.campname}%' `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam.campname === '' && this.serchParam.peopletype === '' && this.serchParam.major === '') {
        whereSQL = selectSQL + whereSQL1 + whereSQL5 + pageSQL;
      } else {
        whereSQL = selectSQL + whereSQL1 + whereSQL2 + whereSQL3 + whereSQL4 + whereSQL5 + pageSQL;
      }
      this.listLoading = true;
      this.$logger(whereSQL);
      this.$db.all(whereSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.$logger(res);
          this.tableData = res;
        }
        this.listLoading = false;
      });
      this.$logger(countSQL);
      this.$db.get(countSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.$logger(res);
          this.total = res.total;
        }
      });
    },
    // Dialog 修改和添加函数
    updateForm(formName) {
      // 添加函数
      if (this.choose) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const formParam = this.form;
            formParam.othermajor = this.othermajors.join(',');
            this.othermajors = [];
            formParam.id = this.generateCode(this.code);
            formParam.campcode = this.code;
            const SQL = `SELECT COUNT(id) AS totalCount from peoplecondition WHERE id = '${formParam.id}'`;
            this.$db.get(SQL, (err, res) => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '搜索失败',
                  desc: err,
                });
              } else {
                if (res.totalCount) {
                  this.$message({
                    message: '该行数据已存在',
                    type: 'warning',
                  });
                } else {
                  const SQL = `INSERT INTO peoplecondition (
                    id,
                    campcode,
                    name,
                    peopletype,
                    major,
                    peopleclass,
                    peopledp,
                    homeplace,
                    partintime,
                    phone,
                    othermajor,
                    remark,
                    isdel)
            VALUES ('${formParam.id}','${formParam.campcode}','${formParam.name}','${formParam.peopletype}',
            '${formParam.major}','${formParam.peopleclass}','${formParam.peopledp}','${formParam.homeplace}','${formParam.partintime}'
            ,'${formParam.phone}','${formParam.othermajor}','${formParam.remark}','0')`;
                  this.$logger(SQL);
                  this.$db.run(SQL, err => {
                    if (err) {
                      this.$logger(err);
                      this.$Notice.error({
                        title: '新增失败',
                        desc: err,
                      });
                    } else {
                      this.$message({
                        message: '新增成功',
                        type: 'success',
                      });
                      this.getDataList(this.code);
                    }
                    this.dialogFormVisible = false;
                  });
                }
              }
            });
          } else {
            this.$message({
              message: '添加失败',
              type: 'warning',
            });
          }
        });
      } else {
        // 修改函数
        this.$refs[formName].validate(valid => {
          if (valid) {
            const formParam = this.form;
            formParam.othermajor = this.othermajors.join(',');
            this.othermajors = [];
            this.$logger(this.form);
            const SQL = `SELECT id from peoplecondition WHERE id = '${formParam.id}'`;
            this.$db.get(SQL, (err, res) => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '搜索失败',
                  desc: err,
                });
              } else {
                if (res && res.id !== formParam.id) {
                  this.$message({
                    message: '该数据不存在',
                    type: 'warning',
                  });
                } else {
                  const SQL = `UPDATE peoplecondition SET
          campcode='${formParam.campcode}'
          ,name='${formParam.name}'
          ,peopletype='${formParam.peopletype}'
          ,major='${formParam.major}'
          ,peopleclass='${formParam.peopleclass}'
          ,peopledp='${formParam.peopledp}'
          ,homeplace='${formParam.homeplace}'
          ,partintime='${formParam.partintime}'
          ,phone='${formParam.phone}'
          ,othermajor='${formParam.othermajor}'
          ,remark='${formParam.remark}'
          WHERE id = '${formParam.id}'`;
                  this.$logger(SQL);
                  this.$db.run(SQL, err => {
                    if (err) {
                      this.$logger(err);
                      this.$Notice.error({
                        title: '修改失败',
                        desc: err,
                      });
                    } else {
                      this.$message({
                        message: '修改成功',
                        type: 'success',
                      });
                      this.getDataList(this.code);
                    }
                    this.dialogFormVisible = false;
                  });
                }
              }
            });
          } else {
            this.$message({
              message: '修改失败',
              type: 'warning',
            });
          }
        });
      }
    },
    // Button 添加函数
    Add() {
      this.title = '添加人员信息';
      this.form = {
        id: '',
        campcode: '',
        campname: '',
        name: '',
        peopletype: '',
        major: '',
        peopleclass: '',
        peopledp: '',
        homeplace: '',
        partintime: '',
        phone: '',
        othermajor: '',
        remark: '',
        isdel: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改人员信息';
      this.form = row;
      if (row.othermajor === '') this.othermajors = [];
      else this.othermajors = row.othermajor.split(',');
      this.dialogFormVisible = true;
    },
    // pageSize改变
    handleSizeChange(val) {
      this.size = val;
      this.getDataList(this.code);
    },
    // currentpage改变
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList(this.code);
    },
    // 查询函数
    findbyname() {
      this.getDataList(this.code);
    },
    // table删除函数
    deleteClick(row) {
      this.$confirm('是否删除该人员信息？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 执行删除操作
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          const deleteSQL = `UPDATE peoplecondition SET isdel='1'
          WHERE id = '${row.id}'`;
          this.$logger(deleteSQL);
          this.$db.run(deleteSQL, err => {
            if (err) {
              this.$logger(err);
              this.$db.run('ROLLBACK');
              this.$Notice.error({
                title: '删除失败',
                desc: err,
              });
            }
          });
          this.$db.run('COMMIT');
          this.delModalShow = false;
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getDataList(this.code);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // 人员类别变化触发器
    optionchage(val) {
      if (val === '士兵') {
        this.majoroptions = this.$val.majoroptions2;
      } else {
        this.majoroptions = this.$val.majoroptions1;
      }
    },
    // 生成随机四位编码
    getrandom() {
      const data = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
      let nums = '';
      for (let j = 0; j < 4; j++) {
        const r = parseInt(Math.random() * 61);
        nums += data[r];
      }
      return nums;
    },
    // 单位生成编码
    generateCode(code) {
      return code + '-' + this.getrandom();
    },
    // 导出excel
    loadExcell() {
      if (this.tableData === null) {
        this.$message({
          message: '导出失败，请先选择单位-营区！',
          type: 'error',
        });
        return false;
      }
      const data = [
        [ '序号', '营区名称', '人员姓名', '人员类别', '职级', '部职别', '籍贯', '入伍年月', '电话', '主专业', '其他专业', '备注' ],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.campname,
          item.name,
          item.peopletype,
          item.peopleclass,
          item.peopledp,
          item.homeplace,
          item.partintime,
          item.phone,
          item.major,
          item.othermajor,
          item.remark,
        ]);
        i++;
      }
      const name = '人员信息';
      download.excel(name, [
        {
          name,
          data,
        },
      ]).then(arg => {
        this.downloadExcelLoading = false;
        if (arg === 'completed') {
          this.$message({
            message: '导出成功',
            type: 'success',
          });
        } else {
          this.$message({
            message: '导出失败',
            type: 'error',
          });
        }
      }).catch(err => {
        this.downloadExcelLoading = false;
        this.$Notice.error({
          title: '导出失败',
          desc: err,
        });
      });
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
.showdata {
  font-size: 18px;
  margin-bottom: 12px;
  color: #373d41;
}
</style>

