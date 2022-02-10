<template>
<el-container>
   <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="  " label-width="30px">
        <el-input v-model="serchParam" placeholder="请输入工程名称"></el-input>
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
    :default-sort="{prop: 'suoshudanwei', order: 'descending'}"
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
    <el-table-column align="center" prop="name" label="工程名称" min-width="120"></el-table-column>
    <el-table-column align="center" prop="suoshudanwei" label="所属单位" min-width="120" sortable></el-table-column>
    <el-table-column align="center" prop="type" label="工程类型" min-width="120"></el-table-column>
    <el-table-column align="center" prop="class" label="工程类别" min-width="120"></el-table-column>
    <el-table-column align="center" prop="sszhanqu" label="所属战区" min-width="120"></el-table-column>
    <el-table-column align="center" prop="province" label="省" min-width="120"></el-table-column>
    <el-table-column align="center" prop="city" label="市" min-width="120"></el-table-column>
    <el-table-column align="center" prop="area" label="区" min-width="120"></el-table-column>
    <el-table-column align="center" prop="address" label="详细地址" min-width="120"></el-table-column>
    <el-table-column align="center" prop="num" label="数量" min-width="120"></el-table-column>
    <el-table-column align="center" prop="usedanwei" label="使用单位" min-width="120"></el-table-column>
    <el-table-column align="center" prop="spenddanwei" label="标准经费计领单位" min-width="120"></el-table-column>
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
      <el-form-item label="工程名称" prop="name" style="width: 80%">
        <el-input v-model="form.name" placeholder="请输入工程名称"></el-input>
      </el-form-item>
      <el-form-item label="所属单位" prop="suoshudanwei" style="width: 80%">
        <el-input v-model="form.suoshudanwei" placeholder="请输入所属单位"></el-input>
      </el-form-item>
      <el-form-item label="工程类型" prop="type" style="width: 80%">
        <el-input v-model="form.type" placeholder="请输入工程名称"></el-input>
      </el-form-item>
      <el-form-item label="工程类别" prop="class" style="width: 80%">
        <el-input v-model="form.class" placeholder="请输入工程类别"></el-input>
      </el-form-item>
      <el-form-item label="所属战区" prop="sszhanqu" style="width: 80%">
        <el-input v-model="form.sszhanqu" placeholder="请输入所属战区"></el-input>
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
      <el-form-item label="数量" prop="num" style="width: 80%">
        <el-input v-model="form.num" placeholder="请输入数量"></el-input>
      </el-form-item>
      <el-form-item label="使用单位" prop="usedanwei" style="width: 80%">
        <el-input v-model="form.usedanwei" placeholder="请输入使用单位"></el-input>
      </el-form-item>
      <el-form-item label="标准经费计领单位" prop="spenddanwei" style="width: 80%">
        <el-input v-model="form.spenddanwei" placeholder="请输入标准经费计领单位"></el-input>
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
  name: 'camp',
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
        name: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        suoshudanwei: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        type: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        class: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        sszhanqu: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        area: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        address: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        num: [ { required: true, message: '不允许为空！', trigger: 'blur' },
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
          } ],
        usedanwei: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        spenddanwei: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
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
      name: '',
      suoshudanwei: '',
      type: '',
      class: '',
      sszhanqu: '',
      province: '',
      city: '',
      area: '',
      address: '',
      num: '',
      usedanwei: '',
      spenddanwei: '',
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
            const deleteSQL = `UPDATE guofanggongcheng SET
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
        WhereSQL = 'SELECT * from guofanggongcheng WHERE ' + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from guofanggongcheng WHERE ' + whereSQL2 + pageSQL;
      } else {
        WhereSQL = 'SELECT * from guofanggongcheng WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from guofanggongcheng WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
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
      this.title = '添加国防工程信息';
      this.form = {
        id: '',
        name: '',
        suoshudanwei: '',
        type: '',
        class: '',
        sszhanqu: '',
        province: '',
        city: '',
        area: '',
        address: '',
        num: '',
        usedanwei: '',
        spenddanwei: '',
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
            const SQL = `SELECT COUNT(id) AS totalCount from guofanggongcheng WHERE id = '${D.id}'`;
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
                  const SQL = `INSERT INTO guofanggongcheng (id,name,suoshudanwei,type,class,sszhanqu,
                  province,city,area,address,num,usedanwei,spenddanwei,starttime,isdel)
            VALUES ('${D.id}','${D.name}','${D.suoshudanwei}','${D.type}','${D.class}',
            '${D.sszhanqu}','${D.province}','${D.city}','${D.area}','${D.address}'
            ,'${D.num}','${D.usedanwei}',
            '${D.spenddanwei}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from guofanggongcheng WHERE id = '${D.id}'`;
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
                  const SQL = `UPDATE guofanggongcheng SET
          name='${D.name}'
          ,suoshudanwei='${D.suoshudanwei}'
          ,type='${D.type}'
          ,class='${D.class}'
          ,sszhanqu='${D.sszhanqu}'
          ,province='${D.province}'
          ,city='${D.city}'
          ,area='${D.area}'
          ,address='${D.address}'
          ,num='${D.num}'
          ,usedanwei='${D.usedanwei}'
          ,spenddanwei='${D.spenddanwei}'
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
      this.title = '修改国防工程信息';
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
          const deleteSQL = `UPDATE guofanggongcheng SET
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
            name: e.工程名称?e.工程名称:'',
            suoshudanwei: e.所属单位?e.所属单位:'',
            type: e.工程类型?e.工程类型:'',
            class: e.工程类别?e.工程类别:'',
            sszhanqu: e.所属战区?e.所属战区:'',
            province: e.省?e.省:'',
            city: e.市?e.市:'',
            area: e.区?e.区:'',
            address: e.详细地址?e.详细地址:'',
            num: e.数量?e.数量:'',
            usedanwei: e.使用单位?e.使用单位:'',
            spenddanwei: e.标准经费计领单位?e.标准经费计领单位:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(D, index){
      const SQL = `INSERT INTO guofanggongcheng (id,name,suoshudanwei,type,class,sszhanqu,
                  province,city,area,address,num,usedanwei,spenddanwei,starttime,isdel)
            VALUES ('${D.id}','${D.name}','${D.suoshudanwei}','${D.type}','${D.class}',
            '${D.sszhanqu}','${D.province}','${D.city}','${D.area}','${D.address}'
            ,'${D.num}','${D.usedanwei}',
            '${D.spenddanwei}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '工程名称', '所属单位', '工程类型', '工程类别', '所属战区', '省', '市', '区', '详细地址', 
        '数量', '使用单位', '标准经费计领单位'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.name,
          item.suoshudanwei,
          item.type,
          item.class,
          item.sszhanqu,
          item.province,
          item.city,
          item.area,
          item.address,
          item.num,
          item.usedanwei,
          item.spenddanwei,
        ]);
        i++;
      }
      const name = '国防工程信息';
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
