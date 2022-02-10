<template>
<el-container>
   <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="  " label-width="30px">
        <el-input v-model="serchParam" placeholder="请输入设施名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="findbyname()"><i class="el-icon-search"></i>查询</el-button>
      </el-form-item>
      <el-form-item label="  " label-width="30px">
        <el-button type="primary" @click="Add()" :loading="downloadExcelLoading"><i class="el-icon-plus"></i>添加</el-button>
      </el-form-item>
      <el-form-item label="  " label-width="30px">
        <el-upload :before-upload="loadExcell" accept=".xls,.xlsx" action="default" :show-file-list="false">
          <el-button type="success"><i class="el-icon-upload2"></i>导入</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="  " label-width="30px">
        <el-button type="success" @click="exportExcell()" :loading="downloadExcelLoading"><i class="el-icon-download"></i>导出</el-button>
      </el-form-item>
      <el-form-item label="           " label-width="30px">
        <el-button type="danger" @click="deleteByList()"><i class="el-icon-delete"></i>批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- Table -->
    <el-table
    ref="multipleTable"
    :default-sort="{prop: 'type', order: 'descending'}"
    v-loading="listLoading"
    :data="tableData"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    style="width: 100%"
    @selection-change="handleSelect">
    <el-table-column align="center" type="selection" width="55"></el-table-column>
    <el-table-column align="center" label="序号" width="60" type="index"></el-table-column>
    <el-table-column align="center" prop="type" label="类别" min-width="120"></el-table-column>
    <el-table-column align="center" prop="projecttype" label="项目类别" min-width="120" sortable></el-table-column>
    <el-table-column align="center" prop="name" label="设施名称" min-width="120"></el-table-column>
    <el-table-column align="center" prop="campname" label="营区名称" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao11" label="指标1" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao12" label="指标1量值" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao13" label="指标1量纲" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao21" label="指标2" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao22" label="指标2量值" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao23" label="指标2量纲" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao31" label="指标3" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao32" label="指标3量值" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao33" label="指标3量纲" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao41" label="指标4" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao42" label="指标4量值" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao43" label="指标4量纲" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao51" label="指标5" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao52" label="指标5量值" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhibiao53" label="指标5量纲" min-width="120"></el-table-column>
    <el-table-column align="center" prop="fuzeren" label="负责人" min-width="120"></el-table-column>
    <el-table-column align="center" prop="phone" label="联系电话" min-width="120"></el-table-column>
    <el-table-column align="center" prop="remark" label="备注" min-width="120"></el-table-column>
    <!-- 分页 -->
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
      :page-sizes="[20, 50, 100, 1000]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      align="center">
    </el-pagination>
  </div>
  </el-main>
  <!-- 填报信息表单 -->
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
      <!-- 正常填报的内容 -->
      <el-form-item label="类别" prop="type" style="width: 80%">
        <el-input v-model="form.type" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="项目类别" prop="projecttype" style="width: 80%">
        <el-input v-model="form.projecttype" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="设施名称" prop="name" style="width: 80%">
        <el-input v-model="form.name" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="营区名称" prop="campname" style="width: 80%">
        <el-input v-model="form.campname" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="指标1" prop="zhibiao11" style="width: 80%">
        <el-input v-model="form.zhibiao11" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="指标1量值" prop="zhibiao12" style="width: 80%">
        <el-input v-model="form.zhibiao12" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标1量纲" prop="zhibiao13" style="width: 80%">
        <el-input v-model="form.zhibiao13" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标2" prop="zhibiao21" style="width: 80%">
        <el-input v-model="form.zhibiao21" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标2量值" prop="zhibiao22" style="width: 80%">
        <el-input v-model="form.zhibiao22" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标2量纲" prop="zhibiao23" style="width: 80%">
        <el-input v-model="form.zhibiao23" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标3" prop="zhibiao31" style="width: 80%">
        <el-input v-model="form.zhibiao31" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标3量值" prop="zhibiao32" style="width: 80%">
        <el-input v-model="form.zhibiao32" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标3量纲" prop="zhibiao33" style="width: 80%">
        <el-input v-model="form.zhibiao33" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标4" prop="zhibiao41" style="width: 80%">
        <el-input v-model="form.zhibiao41" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标4量值" prop="zhibiao42" style="width: 80%">
        <el-input v-model="form.zhibiao42" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标4量纲" prop="zhibiao43" style="width: 80%">
        <el-input v-model="form.zhibiao43" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标5" prop="zhibiao51" style="width: 80%">
        <el-input v-model="form.zhibiao51" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标5量值" prop="zhibiao52" style="width: 80%">
        <el-input v-model="form.zhibiao52" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="指标5量纲" prop="zhibiao53" style="width: 80%">
        <el-input v-model="form.zhibiao53" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="fuzeren" style="width: 80%">
        <el-input v-model="form.fuzeren" placeholder="请输入负责人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" style="width: 80%">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 80%">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateForm('form')">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-container>
</template>

<script>
// 城市选择组件
import VDistpicker from 'v-distpicker';
import download from '../../utils/download';
import Xlsx from 'xlsx';
import day from 'dayjs';
export default {
  name: 'guanjiansheshi',
  components: { VDistpicker },
  data() {
    return {
      downloadExcelLoading: false,
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
      // 校验规则 空！
      rules: {
        type: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        projecttype: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        name: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        campname: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
      },
      // 批量删除用
      multipleTable: [],
      // 原始样例数据
      tableData: null,
      // 查询字段
      serchParam: '',
      // 查询语句
      sql: '',
    };
  },
  created() {
    this.getDataList();
    this.form = {
      id: '',
    type: '',
    projecttype: '',
    name: '',
    campname: '',
    zhibiao11: '',
    zhibiao12: '',
    zhibiao13: '',
    zhibiao21: '',
    zhibiao22: '',
    zhibiao23: '',
    zhibiao31: '',
    zhibiao32: '',
    zhibiao33: '',
    zhibiao41: '',
    zhibiao42: '',
    zhibiao43: '',
    zhibiao51: '',
    zhibiao52: '',
    zhibiao53: '',
    fuzeren: '',
    phone:'',
    remark: '',
    };
  },
  methods: {
    // 批量删除用
    deleteByList() {
      const idlist = [];
      for (const ee of this.multipleTable) {
        idlist.push(ee.id);
      }
      this.$logger(idlist);
      this.$confirm('是否删除该信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          for (const ee of idlist) {
            const deleteSQL = `UPDATE guanjiansheshi SET
              isdel='1'
              WHERE id = '${ee}'`;
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
          }
          this.$db.run('COMMIT');
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getDataList();
          this.multipleTable = [];
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // 批量删除用
    handleSelect(val) {
      this.multipleTable = val;
      this.$logger(val);
    },
    // 生成随机四位编码
    getrandom() {
      const data = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
      let nums = '';
      for (let j = 0; j < 8; j++) {
        const r = parseInt(Math.random() * 61);
        nums += data[r];
      }
      return nums;
    },
    // 执行查询操作
    getDataList() {
      let WhereSQL = '';
      let CountSQL = '';
      const whereSQL1 = `name LIKE '%${this.serchParam}%' AND `;
      const whereSQL2 = 'isdel = 0 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        WhereSQL = 'SELECT * from guanjiansheshi WHERE ' + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from guanjiansheshi WHERE ' + whereSQL2 + pageSQL;
      } else {
        WhereSQL = 'SELECT * from guanjiansheshi WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from guanjiansheshi WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
      }
      this.$logger(WhereSQL);
      this.$db.all(WhereSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.tableData = res;
        }
        this.listLoading = false;
      });
      this.$logger(CountSQL);
      this.$db.get(CountSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.total = res.total;
        }
      });
    },
    // pageSize改变
    handleSizeChange(val) {
      this.size = val;
      this.getDataList();
    },
    // currentpage改变
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    // 查询函数
    findbyname() {
      this.getDataList();
    },
    // Button 添加函数
    Add() {
      this.title = '添加关键保障设施';
      this.form = {
        id: '',
    type: '',
    projecttype: '',
    name: '',
    campname: '',
    zhibiao11: '',
    zhibiao12: '',
    zhibiao13: '',
    zhibiao21: '',
    zhibiao22: '',
    zhibiao23: '',
    zhibiao31: '',
    zhibiao32: '',
    zhibiao33: '',
    zhibiao41: '',
    zhibiao42: '',
    zhibiao43: '',
    zhibiao51: '',
    zhibiao52: '',
    zhibiao53: '',
    fuzeren: '',
    phone:'',
    remark: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Dialog 修改和添加函数
    updateForm(formName) {
      // 添加数据项函数
      if (this.choose) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.form.id = this.getrandom();
            const D = this.form;
            this.$logger(this.id);
            const SQL = `SELECT COUNT(id) AS totalCount from guanjiansheshi WHERE id = '${D.id}'`;
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
                    message: '单位已存在',
                    type: 'warning',
                  });
                } else {
                  const SQL = `INSERT INTO guanjiansheshi (id,type,projecttype,name,campname
                  ,zhibiao11,zhibiao12,zhibiao13,zhibiao21,zhibiao22,zhibiao23
                  ,zhibiao31,zhibiao32,zhibiao33,zhibiao41,zhibiao42,zhibiao43
                  ,zhibiao51,zhibiao52,zhibiao53,fuzeren,phone,remark,starttime,isdel)
            VALUES ('${D.id}','${D.type}','${D.projecttype}','${D.name}','${D.campname}'
            ,'${D.zhibiao11}','${D.zhibiao12}','${D.zhibiao13}','${D.zhibiao21}','${D.zhibiao22}'
            ,'${D.zhibiao23}','${D.zhibiao31}','${D.zhibiao32}','${D.zhibiao33}','${D.zhibiao41}'
            ,'${D.zhibiao42}','${D.zhibiao43}','${D.zhibiao51}','${D.zhibiao52}','${D.zhibiao53}'
            ,'${D.fuzeren}','${D.phone}','${D.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
                      this.getDataList();
                    }
                    this.dialogFormVisible = false;
                  });
                }
              }
            });
          } else {
            this.$message({
              message: '新增失败',
              type: 'danger',
            });
          }
        });
      } else {
        // 修改数据项函数
        this.$refs[formName].validate(valid => {
          if (valid) {
            const D = this.form;
            this.$logger(D);
            const SQL = `SELECT id from guanjiansheshi WHERE id = '${D.id}'`;
            this.$db.get(SQL, (err, res) => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '搜索失败',
                  desc: err,
                });
              } else {
                if (res && res.id !== D.id) {
                  this.$message({
                    message: '单位不存在',
                    type: 'warning',
                  });
                } else {
                  const SQL = `UPDATE guanjiansheshi SET
          type='${D.type}'
          ,projecttype='${D.projecttype}'
          ,name='${D.name}'
          ,campname='${D.campname}'
          ,zhibiao11='${D.zhibiao11}'
          ,zhibiao12='${D.zhibiao12}'
          ,zhibiao13='${D.zhibiao13}'
          ,zhibiao21='${D.zhibiao21}'
          ,zhibiao22='${D.zhibiao22}'
          ,zhibiao23='${D.zhibiao23}'
          ,zhibiao31='${D.zhibiao31}'
          ,zhibiao32='${D.zhibiao32}'
          ,zhibiao33='${D.zhibiao33}'
          ,zhibiao41='${D.zhibiao41}'
          ,zhibiao42='${D.zhibiao42}'
          ,zhibiao43='${D.zhibiao43}'
          ,zhibiao51='${D.zhibiao51}'
          ,zhibiao52='${D.zhibiao52}'
          ,zhibiao53='${D.zhibiao53}'
          ,fuzeren='${D.fuzeren}'
          ,phone='${D.phone}'
          ,remark='${D.remark}'
          ,updatetime='${day().format('YYYY-MM-DD HH:mm:ss')}'
          WHERE id = '${D.id}'`;
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
                      this.getDataList();
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
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改关键保障设施信息';
      this.form = row;
      this.dialogFormVisible = true;
    },
    // table删除函数
    deleteClick(row) {
      this.$confirm('是否删除该信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          const deleteSQL = `UPDATE guanjiansheshi SET
          isdel='1'
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
          this.getDataList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // 导入excel数据
    loadExcell(file) {
      // this.$logger(file);
      var book = Xlsx.readFile(file.path);
      var sheetname = book.SheetNames;
      var sheet = book.Sheets[sheetname[0]];
      var data = Xlsx.utils.sheet_to_json(sheet);
      let i = 1;
      for (const e of data) {
        // this.$logger(e);
          var temp = {
            id: this.getrandom(),
            type: e.类别?e.类别:'',
            projecttype: e.项目类别?e.项目类别:'',
            name: e.设施名称?e.设施名称:'',
            campname: e.营区名称?e.营区名称:'',
            zhibiao11: e.指标1?e.指标1:'',
            zhibiao12: e.指标1量值?e.指标1量值:'',
            zhibiao13: e.指标1量纲?e.指标1量纲:'',
            zhibiao21: e.指标2?e.指标2:'',
            zhibiao22: e.指标2量值?e.指标2量值:'',
            zhibiao23: e.指标2量纲?e.指标2量纲:'',
            zhibiao31: e.指标3?e.指标3:'',
            zhibiao32: e.指标3量值?e.指标3量值:'',
            zhibiao33: e.指标3量纲?e.指标3量纲:'',
            zhibiao41: e.指标4?e.指标4:'',
            zhibiao42: e.指标4量值?e.指标4量值:'',
            zhibiao43: e.指标4量纲?e.指标4量纲:'',
            zhibiao51: e.指标5?e.指标5:'',
            zhibiao52: e.指标5量值?e.指标5量值:'',
            zhibiao53: e.指标5量纲?e.指标5量纲:'',
            fuzeren: e.负责人?e.负责人:'',
            phone:e.联系电话?e.联系电话:'',
            remark: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(D, index){
      const SQL = `INSERT INTO guanjiansheshi (id,type,projecttype,name,campname
                  ,zhibiao11,zhibiao12,zhibiao13,zhibiao21,zhibiao22,zhibiao23
                  ,zhibiao31,zhibiao32,zhibiao33,zhibiao41,zhibiao42,zhibiao43
                  ,zhibiao51,zhibiao52,zhibiao53,fuzeren,phone,remark,starttime,isdel)
            VALUES ('${D.id}','${D.type}','${D.projecttype}','${D.name}','${D.campname}'
            ,'${D.zhibiao11}','${D.zhibiao12}','${D.zhibiao13}','${D.zhibiao21}','${D.zhibiao22}'
            ,'${D.zhibiao23}','${D.zhibiao31}','${D.zhibiao32}','${D.zhibiao33}','${D.zhibiao41}'
            ,'${D.zhibiao42}','${D.zhibiao43}','${D.zhibiao51}','${D.zhibiao52}','${D.zhibiao53}'
            ,'${D.fuzeren}','${D.phone}','${D.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
        this.$logger(SQL);
        this.$db.run(SQL, err => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '第 '+index+' 条新增失败',
              desc: err,
            });
          } else {
            this.$message({
              message: '第 '+index+' 条新增成功',
              type: 'success',
            });
          }
        });
    },
    // 导出excel
    exportExcell() {
      if (this.tableData === null) {
        this.$message({
          message: '导出失败，请先加载数据！',
          type: 'error',
        });
        return false;
      }
      const data = [
        [ '序号', '类别', '项目类别', '设施名称', '营区名称', 
        '指标1', '指标1量值', '指标1量纲', '指标2', '指标2量值', 
        '指标2量纲', '指标3', '指标3量值', '指标3量纲', '指标4', 
        '指标4量值', '指标4量纲', '指标5', '指标5量值', '指标5量纲', 
        '负责人','联系电话', '备注'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.type,
    item.projecttype,
    item.name,
    item.campname,
    item.zhibiao11,
    item.zhibiao12,
    item.zhibiao13,
    item.zhibiao21,
    item.zhibiao22,
    item.zhibiao23,
    item.zhibiao31,
    item.zhibiao32,
    item.zhibiao33,
    item.zhibiao41,
    item.zhibiao42,
    item.zhibiao43,
    item.zhibiao51,
    item.zhibiao52,
    item.zhibiao53,
    item.fuzeren,
    item.phone,
    item.remark,
        ]);
        i++;
      }
      const name = '关键保障设施信息';
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
</style>
