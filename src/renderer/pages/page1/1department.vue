<template>
<el-container>
   <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="  " label-width="30px">
        <el-input v-model="serchParam" placeholder="请输入单位名称"></el-input>
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
    :default-sort="{prop: 'name', order: 'descending'}"
    v-loading="listLoading"
    :data="tableData"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    style="width: 100%"
    @selection-change="handleSelect">
    <el-table-column align="center" type="selection" width="55"></el-table-column>
    <el-table-column align="center" label="序号" width="60" type="index">
    </el-table-column>
    <el-table-column align="center" prop="name" label="单位名称" min-width="120" sortable></el-table-column>
    <el-table-column align="center" prop="bianma" label="编码" min-width="120"></el-table-column>
    <el-table-column align="center" prop="dempartmentaliasCode" label="代号" min-width="120"></el-table-column>
    <el-table-column align="center" prop="class" label="级别" min-width="120"></el-table-column>
    <el-table-column align="center" prop="province" label="省" min-width="120"></el-table-column>
    <el-table-column align="center" prop="city" label="市" min-width="120"></el-table-column>
    <el-table-column align="center" prop="area" label="区" min-width="120"></el-table-column>
    <el-table-column align="center" prop="address" label="详细地址" min-width="120"></el-table-column>
    <el-table-column align="center" prop="bianzhi" label="编制员额" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shiyou" label="实有员额" min-width="120"></el-table-column>
    <el-table-column align="center" prop="jgbianzhi" label="军官编制数" min-width="120"></el-table-column>
    <el-table-column align="center" prop="jgshiyou" label="军官实有数" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shibingbianzhi" label="士兵编制数" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shibingshiyou" label="士兵实有数" min-width="120"></el-table-column>
    <el-table-column align="center" prop="wenzhibianzhi" label="文职人员编制数" min-width="120"></el-table-column>
    <el-table-column align="center" prop="wenzhishiyou" label="文职人员实有数" min-width="120"></el-table-column>
    <el-table-column align="center" prop="history" label="历史沿革" min-width="120"></el-table-column>
    <el-table-column align="center" prop="mission" label="使命任务" min-width="120"></el-table-column>
    <el-table-column align="center" prop="beizhu" label="其他说明" min-width="120"></el-table-column>
    <el-table-column align="center" prop="starttime" label="创建时间" min-width="120"></el-table-column>
    <el-table-column align="center" prop="updatetime" label="修改时间" min-width="120"></el-table-column>
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
      :page-sizes="[20, 100, 1000, 10000]"
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
      <el-form-item label="单位名称" prop="name" style="width: 80%">
        <el-input v-model="form.name" placeholder="请输入单位名称"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="bianma" style="width: 80%">
        <el-input v-model="form.bianma" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="代号" prop="dempartmentaliasCode" style="width: 80%">
        <el-input v-model="form.dempartmentaliasCode" placeholder="请输入单位代号"></el-input>
      </el-form-item>
      <el-form-item label="级别" prop="class" style="width: 80%">
        <el-input v-model="form.class" placeholder="请输入单位级别"></el-input>
      </el-form-item>
      <el-form-item label="位置" prop="area" style="width: 80%">
        <v-distpicker
        :province="form.province"
        :city="form.city"
        :area="form.area"
        @province="onchangeprovince"
        @city="onchangecity"
        @area="onchangearea"
        >
        </v-distpicker>
      </el-form-item>
      <el-form-item label="详细地址" prop="address" style="width: 80%">
        <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="编制员额" prop="bianzhi" style="width: 80%">
        <el-input v-model="form.bianzhi" placeholder="请输入编制员额"></el-input>
      </el-form-item>
      <el-form-item label="实有员额" prop="shiyou" style="width: 80%">
        <el-input v-model="form.shiyou" placeholder="请输入实有员额"></el-input>
      </el-form-item>
      <el-form-item label="军官编制数" prop="jgbianzhi" style="width: 80%">
        <el-input v-model="form.jgbianzhi" placeholder="请输入军官编制数"></el-input>
      </el-form-item>
      <el-form-item label="军官实有数" prop="jgshiyou" style="width: 80%">
        <el-input v-model="form.jgshiyou" placeholder="请输入军官实有数"></el-input>
      </el-form-item>
      <el-form-item label="士兵编制数" prop="shibingbianzhi" style="width: 80%">
        <el-input v-model="form.shibingbianzhi" placeholder="请输入士兵编制数"></el-input>
      </el-form-item>
      <el-form-item label="士兵实有数" prop="shibingshiyou" style="width: 80%">
        <el-input v-model="form.shibingshiyou" placeholder="请输入士兵实有数"></el-input>
      </el-form-item>
      <el-form-item label="文职人员编制数" prop="wenzhibianzhi" style="width: 80%">
        <el-input v-model="form.wenzhibianzhi" placeholder="请输入文职人员编制数"></el-input>
      </el-form-item>
      <el-form-item label="文职人员实有数" prop="wenzhishiyou" style="width: 80%">
        <el-input v-model="form.wenzhishiyou" placeholder="请输入文职人员实有数"></el-input>
      </el-form-item>
      <el-form-item label="历史沿革" prop="history" style="width: 80%">
        <el-input type="textarea" v-model="form.history" placeholder="请输入历史沿革"></el-input>
      </el-form-item>
      <el-form-item label="使命任务" prop="mission" style="width: 80%">
        <el-input type="textarea" v-model="form.mission" placeholder="请输入使命任务"></el-input>
      </el-form-item>
      <el-form-item label="其他说明" prop="beizhu" style="width: 80%">
        <el-input type="textarea" v-model="form.beizhu" placeholder="请输入其他说明"></el-input>
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
  name: 'department',
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
      // 校验规则 空
      rules: {
        name: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
        ],
        bianma: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
        ],
        class: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
        ],
        area: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
        ],
        bianzhi: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        shiyou: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        jgbianzhi: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        jgshiyou: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        shibingbianzhi: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        shibingshiyou: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        wenzhibianzhi: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
        wenzhishiyou: [
          { required: true, message: '不允许为空！', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /^[0-9]*$/;
              if (!passwordreg.test(value)) {
                callback(new Error('请输入数字！'));
              } else {
                callback();
              }
            },
          },
        ],
      },
      // 原始样例数据
      tableData: null,
      // 批量删除用
      multipleTable: [],
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
      name: '',
      bianma: '',
      dempartmentaliasCode: '',
      class: '',
      province: '',
      city: '',
      area: '',
      address: '',
      bianzhi: '',
      shiyou: '',
      jgbianzhi: '',
      jgshiyou: '',
      shibingbianzhi: '',
      shibingshiyou: '',
      wenzhibianzhi: '',
      wenzhishiyou: '',
      history: '',
      mission: '',
      beizhu: '',
      isdel: '',
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
            const deleteSQL = `UPDATE department SET
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
      const orderSQL = 'ORDER BY field1 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        WhereSQL = 'SELECT * from department WHERE ' + whereSQL2  + orderSQL + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from department WHERE ' + whereSQL2 + pageSQL;
      } else {
        WhereSQL = 'SELECT * from department WHERE ' + whereSQL1 + whereSQL2  + orderSQL + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from department WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
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
    // 省市选择
    onchangeprovince(data) {
      this.form.province = data.value;
    },
    onchangecity(data) {
      this.form.city = data.value;
    },
    onchangearea(data) {
      this.form.area = data.value;
    },
    // 查询函数
    findbyname() {
      this.getDataList();
    },
    // Button 添加函数
    Add() {
      this.title = '添加单位';
      this.form = {
        id: '',
        name: '',
        bianma: '',
        dempartmentaliasCode: '',
        class: '',
        province: '',
        city: '',
        area: '',
        address: '',
        bianzhi: '',
        shiyou: '',
        jgbianzhi: '',
        jgshiyou: '',
        shibingbianzhi: '',
        shibingshiyou: '',
        wenzhibianzhi: '',
        wenzhishiyou: '',
        history: '',
        mission: '',
        beizhu: '',
        isdel: '',
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
            const SQL = `SELECT COUNT(id) AS totalCount from department WHERE id = '${D.id}'`;
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
                  const SQL = `INSERT INTO department (id,name,bianma,dempartmentaliasCode,class,province,city,area,address,
                  bianzhi,shiyou,jgbianzhi,jgshiyou,shibingbianzhi,shibingshiyou,wenzhibianzhi,wenzhishiyou,
                  history,mission,beizhu,starttime,isdel)
            VALUES ('${D.id}','${D.name}','${D.bianma}','${D.dempartmentaliasCode}','${D.class}','${D.province}','${D.city}','${D.area}','${D.address}'
            ,'${D.bianzhi}','${D.shiyou}','${D.jgbianzhi}','${D.jgshiyou}','${D.shibingbianzhi}','${D.shibingshiyou}','${D.wenzhibianzhi}','${D.wenzhishiyou}'
            ,'${D.history}','${D.mission}','${D.beizhu}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from department WHERE id = '${D.id}'`;
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
                  const SQL = `UPDATE department SET
          name='${D.name}'
          ,bianma='${D.bianma}'
          ,dempartmentaliasCode='${D.dempartmentaliasCode}'
          ,class='${D.class}'
          ,province='${D.province}'
          ,city='${D.city}'
          ,area='${D.area}'
          ,address='${D.address}'
          ,bianzhi='${D.bianzhi}'
          ,shiyou='${D.shiyou}'
          ,jgbianzhi='${D.jgshiyou}'
          ,jgshiyou='${D.jgshiyou}'
          ,shibingbianzhi='${D.shibingbianzhi}'
          ,shibingshiyou='${D.shibingshiyou}'
          ,wenzhibianzhi='${D.wenzhibianzhi}'
          ,wenzhishiyou='${D.wenzhishiyou}'
          ,history='${D.history}'
          ,mission='${D.mission}'
          ,beizhu='${D.beizhu}'
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
      this.title = '修改单位信息';
      this.form = row;
      this.dialogFormVisible = true;
    },
    // table删除函数
    deleteClick(row) {
      this.$confirm('是否删除该信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          const deleteSQL = `UPDATE department SET
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
      // this.$logger(data);
      let i = 1;
      for (const e of data) {
        // this.$logger(e);
          var temp = {
            id: this.getrandom(),
            name: e.单位名称?e.单位名称:'',
            bianma: e.编码?e.编码:'',
            dempartmentaliasCode: e.代号?e.代号:'',
            class: e.级别?e.级别:'',
            province: e.省?e.省:'',
            city: e.市?e.市:'',
            area: e.区?e.区:'',
            address: e.详细地址?e.详细地址:'',
            bianzhi: e.编制员额?e.编制员额:'',
            shiyou: e.实有员额?e.实有员额:'',
            jgbianzhi: e.军官编制数?e.军官编制数:'',
            jgshiyou: e.军官实有数?e.军官实有数:'',
            shibingbianzhi: e.士兵编制数?e.士兵编制数:'',
            shibingshiyou: e.士兵实有数?e.士兵实有数:'',
            wenzhibianzhi: e.文职人员编制数?e.文职人员编制数:'',
            wenzhishiyou: e.文职人员实有数?e.文职人员实有数:'',
            history: e.历史沿革?e.历史沿革:'',
            mission: e.使命任务?e.使命任务:'',
            beizhu: e.其他说明?e.其他说明:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(D, index){
      const SQL = `INSERT INTO department (id,name,bianma,dempartmentaliasCode,class,province,city,area,address,
        bianzhi,shiyou,jgbianzhi,jgshiyou,shibingbianzhi,shibingshiyou,wenzhibianzhi,wenzhishiyou,
        history,mission,beizhu,starttime,isdel)
        VALUES ('${D.id}','${D.name}','${D.bianma}','${D.dempartmentaliasCode}','${D.class}','${D.province}','${D.city}','${D.area}','${D.address}'
        ,'${D.bianzhi}','${D.shiyou}','${D.jgbianzhi}','${D.jgshiyou}','${D.shibingbianzhi}','${D.shibingshiyou}','${D.wenzhibianzhi}','${D.wenzhishiyou}'
        ,'${D.history}','${D.mission}','${D.beizhu}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '单位名称', '编码', '代号', '级别', '省', '市', '区', '详细地址', '编制员额', '实有员额',
        '军官编制数', '军官实有数', '士兵编制数', '士兵实有数', '文职人员编制数', '文职人员实有数', '历史沿革', '使命任务', '其他说明'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.name,
          item.bianma,
          item.dempartmentaliasCode,
          item.class,
          item.province,
          item.city,
          item.area,
          item.address,
          item.bianzhi,
          item.shiyou,
          item.jgbianzhi,
          item.jgshiyou,
          item.shibingbianzhi,
          item.shibingshiyou,
          item.wenzhibianzhi,
          item.wenzhishiyou,
          item.history,
          item.mission,
          item.beizhu,
        ]);
        i++;
      }
      const name = '单位信息';
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
