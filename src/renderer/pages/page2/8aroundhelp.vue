<template>
  <el-container class="home1-container">
    <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="serchParam.type" filterable placeholder="请选择类别">
          <el-option
          v-for="item in aroundtypeoptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="serchParam.helpername" placeholder="请输入支援单位名称"></el-input>
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
    v-loading="listLoading"
    :data="tableData"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    style="width: 100%">
    <!-- Table下拉面板 -->
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        v-for="item in aroundhelptable"
        :key="item.prop"
        align="left"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width">
      </el-table-column>
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
      <el-form-item label="类别" prop="type" style="width: 90%">
        <el-select v-model="form.type" filterable placeholder="请选择类别">
          <el-option
          v-for="item in aroundtypeoptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支援单位名称" prop="helpername" style="width: 90%">
        <el-input v-model="form.helpername" placeholder="请输入支援单位名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact" style="width: 90%">
        <el-input v-model="form.contact" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" style="width: 90%">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="相关机制建立情况" prop="relatedrules" style="width: 90%">
        <el-input type="textarea" autosize v-model="form.relatedrules" placeholder="请输入相关机制建立情况"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 90%">
        <el-input type="textarea" autosize v-model="form.remark" placeholder="请输入备注"></el-input>
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
  name: 'position',
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
        type: [
          { required: true, message: '请选择类别', trigger: 'blur' },
        ],
        helpername: [
          { required: true, message: '请输入支援单位名称', trigger: 'blur' },
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请选择联系电话', trigger: 'blur' },
        ],
        relatedrules: [
          { required: true, message: '请输入相关机制建立情况', trigger: 'blur' },
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
      // select 选择器字段
      aroundtypeoptions: this.$val.aroundtypeoptions,
      // table字段
      aroundhelptable: this.$val.aroundhelptable,
      // 原始样例数据
      tableData: null,
      // 查询字段
      serchParam: {
        type: '',
        helpername: '',
      },
    };
  },
  created() {
    this.getDataList();
    this.form = {
      id: '',
      type: '',
      helpername: '',
      contact: '',
      phone: '',
      relatedrules: '',
      remark: '',
    };
  },
  methods: {
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
      const whereSQL2 = `helpername LIKE '%${this.serchParam.helpername}%' AND `;
      const whereSQL3 = 'isdel = 0 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        whereSQL = 'SELECT * from aroundhelp WHERE ' + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from aroundhelp WHERE ' + whereSQL3 + pageSQL;
      } else {
        whereSQL = 'SELECT * from aroundhelp WHERE ' + whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from aroundhelp WHERE '+ whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
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
            const SQL = `SELECT COUNT(id) AS totalCount from aroundhelp WHERE id = '${formParam.id}'`;
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
                  const SQL = `INSERT INTO aroundhelp (
                    id,
                    type,
                    helpername,
                    contact,
                    phone,
                    relatedrules,
                    remark,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.type}','${formParam.helpername}'
            ,'${formParam.contact}','${formParam.phone}','${formParam.relatedrules}','${formParam.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from aroundhelp WHERE id = '${formParam.id}'`;
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
                  const SQL = `UPDATE aroundhelp SET
          type='${formParam.type}'
          ,helpername='${formParam.helpername}'
          ,contact='${formParam.contact}'
          ,phone='${formParam.phone}'
          ,relatedrules='${formParam.relatedrules}'
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
    // Button 添加函数
    Add() {
      this.title = '添加周边可用支援力量信息';
      this.form = {
        id: '',
        type: '',
        helpername: '',
        contact: '',
        phone: '',
        relatedrules: '',
        remark: '',
        isdel: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改周边可用支援力量信息';
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
      this.$logger(this.code);
      this.getDataList(this.code);
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
          const deleteSQL = `UPDATE aroundhelp SET isdel='1' WHERE id = '${row.id}'`;
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
            type: e.类别?e.类别:'',
            helpername: e.支援单位名称?e.支援单位名称:'',
            contact: e.联系人?e.联系人:'',
            phone: e.联系电话?e.联系电话:'',
            relatedrules: e.相关机制建立情况?e.相关机制建立情况:'',
            remark: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(formParam, index){
      const SQL = `INSERT INTO aroundhelp (
                    id,
                    type,
                    helpername,
                    contact,
                    phone,
                    relatedrules,
                    remark,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.type}','${formParam.helpername}'
            ,'${formParam.contact}','${formParam.phone}','${formParam.relatedrules}','${formParam.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '类别', '支援单位名称', '联系人', '联系电话', '相关机制建立情况', '备注' ],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.type,
          item.helpername,
          item.contact,
          item.phone,
          item.relatedrules,
          item.remark,
        ]);
        i++;
      }
      const name = '周边可用支援力量信息';
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

