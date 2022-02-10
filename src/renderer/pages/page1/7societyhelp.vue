<template>
  <el-container class="home1-container">
    <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="serchParam.type" placeholder="请输入类别"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="serchParam.campnamme" placeholder="请输入营区名称"></el-input>
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

    <el-table
    ref="multipleTable"
    :default-sort="{prop: 'campnamme', order: 'descending'}"
    v-loading="listLoading"
    :data="tableData"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    style="width: 100%"
    @selection-change="handleSelect">
    <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column align="center" prop="campnamme" label="营区名称" min-width="120" sortable></el-table-column>
      <el-table-column align="center" prop="type" label="社会化保障类型" min-width="120"></el-table-column>
      <el-table-column align="center" prop="model" label="保障模式" min-width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="企业名称" min-width="120"></el-table-column>
      <el-table-column align="center" prop="peoplenum" label="保障人员数量" min-width="120"></el-table-column>
      <el-table-column align="center" prop="scale" label="保障范围" min-width="120"></el-table-column>
      <el-table-column align="center" prop="baozhangnengli" label="保障能力" min-width="120"></el-table-column>
      <el-table-column align="center" prop="contact" label="联系人" min-width="120"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话" min-width="120"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注" min-width="120"></el-table-column>
      <el-table-column align="center" prop="starttime" label="创建时间" min-width="120"></el-table-column>
    <el-table-column align="center" prop="updatetime" label="修改时间" min-width="120"></el-table-column>
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
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
      <el-form-item label="营区名称" prop="campnamme" style="width: 90%">
        <el-input v-model="form.campnamme" placeholder="请输入营区名称"></el-input>
      </el-form-item>
      <el-form-item label="社会化保障类型" prop="type" style="width: 90%">
        <el-input v-model="form.type" placeholder="请输入社会化保障类型"></el-input>
      </el-form-item>
      <el-form-item label="保障模式" prop="model" style="width: 90%">
        <el-input v-model="form.model" placeholder="请输入保障模式"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" style="width: 90%">
        <el-input v-model="form.name" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item label="保障人员数量" prop="peoplenum" style="width: 90%">
        <el-input v-model="form.peoplenum" placeholder="请输入保障人员数量"></el-input>
      </el-form-item>
      <el-form-item label="保障范围" prop="scale" style="width: 90%">
        <el-input v-model="form.scale" placeholder="请输入保障范围"></el-input>
      </el-form-item>
      <el-form-item label="保障能力" prop="baozhangnengli" style="width: 90%">
        <el-input v-model="form.baozhangnengli" placeholder="请输入保障能力"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact" style="width: 90%">
        <el-input v-model="form.contact" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" style="width: 90%">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
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
import day from 'dayjs';
import Xlsx from 'xlsx';
export default {
  name: 'socityhelp',
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
      // 表单验证规则
      rules: {
        campnamme: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        type: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        model: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        name: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        peoplenum: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        scale: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        baozhangnengli: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
      },
      // 批量删除用
      multipleTable: [],
      // // table字段
      socitytable: this.$val.societyhelptable,
      // 原始样例数据
      tableData: null,
      // 查询字段
      serchParam: {
        type: '',
        campnamme: '',
      },
    };
  },
  created() {
    this.getDataList();
    this.form = {
      id: '',
      campnamme: '',
      type: '',
      model: '',
      name: '',
      peoplenum: '',
      scale: '',
      baozhangnengli: '',
      contact: '',
      phone: '',
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
            const deleteSQL = `UPDATE socityhelp SET
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
      // 主查询语句
      let whereSQL = '';
      let countSQL = '';
      const whereSQL1 = `type LIKE '%${this.serchParam.type}%' AND `;
      const whereSQL2 = `campnamme LIKE '%${this.serchParam.campnamme}%' AND `;
      const whereSQL3 = 'isdel = 0 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        whereSQL = 'SELECT * from socityhelp WHERE ' + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from socityhelp WHERE ' + whereSQL3 + pageSQL;
      } else {
        whereSQL = 'SELECT * from socityhelp WHERE ' + whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from socityhelp WHERE '+ whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
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
            formParam.id = this.getrandom();
            const SQL = `SELECT COUNT(id) AS totalCount from socityhelp WHERE id = '${formParam.id}'`;
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
                  const SQL = `INSERT INTO socityhelp (
                    id,
                    campnamme,
                    type,
                    model,
                    name,
                    peoplenum,
                    scale,
                    baozhangnengli,
                    contact,
                    phone,
                    remark,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.campnamme}','${formParam.type}',
            '${formParam.model}','${formParam.name}','${formParam.peoplenum}',
            '${formParam.scale}','${formParam.baozhangnengli}','${formParam.contact}',
            '${formParam.phone}','${formParam.remark}',
            '${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            this.$logger(this.form);
            const SQL = `SELECT id from socityhelp WHERE id = '${formParam.id}'`;
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
                  const SQL = `UPDATE socityhelp SET
          campnamme='${formParam.campnamme}'
          ,type='${formParam.type}'
          ,model='${formParam.model}'
          ,name='${formParam.name}'
          ,peoplenum='${formParam.peoplenum}'
          ,scale='${formParam.scale}'
          ,baozhangnengli='${formParam.baozhangnengli}'
          ,contact='${formParam.contact}'
          ,phone='${formParam.phone}'
          ,remark='${formParam.remark}'
          ,updatetime='${day().format('YYYY-MM-DD HH:mm:ss')}'
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
      this.title = '添加保障社会化信息';
      this.form = {
        id: '',
        campnamme: '',
      type: '',
      model: '',
      name: '',
      peoplenum: '',
      scale: '',
      baozhangnengli: '',
      contact: '',
      phone: '',
      remark: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改保障社会化信息';
      this.form = row;
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
      this.getDataList();
    },
    // table删除函数
    deleteClick(row) {
      this.$confirm('是否删除该信息？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 执行删除操作
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          const deleteSQL = `UPDATE socityhelp SET isdel='1' WHERE id = '${row.id}'`;
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
            campnamme: e.营区名称?e.营区名称:'',
            type: e.社会化保障类型?e.社会化保障类型:'',
            model: e.保障模式?e.保障模式:'',
            name: e.企业名称?e.企业名称:'',
            peoplenum: e.保障人员数量?e.保障人员数量:'',
            scale: e.保障范围?e.保障范围:'',
            baozhangnengli: e.保障能力?e.保障能力:'',
            contact: e.联系人?e.联系人:'',
            phone: e.联系电话?e.联系电话:'',
            remark: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(formParam, index){
      const SQL = `INSERT INTO socityhelp (
                    id,
                    campnamme,
                    type,
                    model,
                    name,
                    peoplenum,
                    scale,
                    baozhangnengli,
                    contact,
                    phone,
                    remark,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.campnamme}','${formParam.type}',
            '${formParam.model}','${formParam.name}','${formParam.peoplenum}',
            '${formParam.scale}','${formParam.baozhangnengli}','${formParam.contact}',
            '${formParam.phone}','${formParam.remark}',
            '${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '营区名称', '社会化保障类型', '保障模式', '企业名称',
        '保障人员数量', '保障范围', '保障能力', '联系人', '联系电话', '备注' ],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.campnamme,
      item.type,
      item.model,
      item.name,
      item.peoplenum,
      item.scale,
      item.baozhangnengli,
      item.contact,
      item.phone,
      item.remark,
        ]);
        i++;
      }
      const name = '社会化保障信息';
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

