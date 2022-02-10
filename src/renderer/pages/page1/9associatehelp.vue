<template>
  <el-container class="home1-container">
    <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="serchParam.name" placeholder="请输入联勤保障力量"></el-input>
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
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column align="center" prop="name" label="单位名称" min-width="120" sortable></el-table-column>
      <el-table-column align="center" prop="class" label="级别" min-width="120"></el-table-column>
      <el-table-column align="center" prop="lishuguanxi" label="隶属关系" min-width="120"></el-table-column>
      <el-table-column align="center" prop="type" label="类别" min-width="120"></el-table-column>
      <el-table-column align="center" prop="province" label="省" min-width="120"></el-table-column>
      <el-table-column align="center" prop="city" label="市" min-width="120"></el-table-column>
      <el-table-column align="center" prop="area" label="区" min-width="120"></el-table-column>
      <el-table-column align="center" prop="address" label="详细地址" min-width="120"></el-table-column>
      <el-table-column align="center" prop="bianzhi" label="编制员额" min-width="120"></el-table-column>
      <el-table-column align="center" prop="shiyou" label="实有员额" min-width="120"></el-table-column>
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
      <el-form-item label="单位名称" prop="name" style="width: 90%">
        <el-input v-model="form.name" placeholder="请输入联勤保障力量名称"></el-input>
      </el-form-item>
      <el-form-item label="级别" prop="class" style="width: 90%">
        <el-input v-model="form.class" placeholder="请输入级别"></el-input>
      </el-form-item>
      <el-form-item label="隶属关系" prop="lishuguanxi" style="width: 90%">
        <el-input v-model="form.lishuguanxi" placeholder="请输入隶属关系"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="type" style="width: 90%">
        <el-input v-model="form.type" placeholder="请输入类别"></el-input>
      </el-form-item>
      <el-form-item label="位置" prop="area" style="width: 85%">
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
      <el-form-item label="详细地址" prop="address" style="width: 90%">
        <el-input type="textarea" autosize v-model="form.address" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="编制员额" prop="bianzhi" style="width: 90%">
        <el-input v-model="form.bianzhi" placeholder="请输入编制员额"></el-input>
      </el-form-item>
      <el-form-item label="实有员额" prop="shiyou" style="width: 90%">
        <el-input v-model="form.shiyou" placeholder="请输入实有员额"></el-input>
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
        name: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        class: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
        lishuguanxi: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
        area: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
        address: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
        bianzhi: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
        shiyou: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
        baozhangnengli: [{ required: true, message: '不允许为空！', trigger: 'blur' },],
      },
      // 批量删除用
      multipleTable: [],
      // 原始样例数据
      tableData: null,
      // 查询字段
      serchParam: {
        name: '',
      },
    };
  },
  created() {
    this.getDataList();
    this.form = {
      id: '',
      name: '',
      class: '',
      lishuguanxi: '',
      type: '',
      province: '',
      city: '',
      area: '',
      address: '',
      bianzhi: '',
      shiyou: '',
      baozhangnengli: '',
      contact: '',
      phone: '',
      remark: '',
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
            const deleteSQL = `UPDATE associatehelp SET
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
      const whereSQL2 = `name LIKE '%${this.serchParam.name}%' AND `;
      const whereSQL3 = 'isdel = 0 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        whereSQL = 'SELECT * from associatehelp WHERE ' + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from associatehelp WHERE ' + whereSQL3 + pageSQL;
      } else {
        whereSQL = 'SELECT * from associatehelp WHERE ' + whereSQL2 + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from associatehelp WHERE '+ whereSQL2 + whereSQL3 + pageSQL;
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
            formParam.campcode = this.code;
            const SQL = `SELECT COUNT(id) AS totalCount from associatehelp WHERE id = '${formParam.id}'`;
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
                  const SQL = `INSERT INTO associatehelp (
                    id,
                    name,
                    class,
                    lishuguanxi,
                    type,
                    province,
                    city,
                    area,
                    address,
                    bianzhi,
                    shiyou,
                    baozhangnengli,
                    contact,
                    phone,
                    remark,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.name}','${formParam.class}','${formParam.lishuguanxi}'
            ,'${formParam.type}','${formParam.province}','${formParam.city}','${formParam.area}','${formParam.address}'
            ,'${formParam.bianzhi}','${formParam.shiyou}','${formParam.baozhangnengli}'
            ,'${formParam.contact}','${formParam.phone}','${formParam.remark}'
            ,'${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from associatehelp WHERE id = '${formParam.id}'`;
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
                  const SQL = `UPDATE associatehelp SET
          name='${formParam.name}'
          ,class='${formParam.class}'
          ,lishuguanxi='${formParam.lishuguanxi}'
          ,type='${formParam.type}'
          ,province='${formParam.province}'
          ,city='${formParam.city}'
          ,area='${formParam.area}'
          ,address='${formParam.address}'
          ,bianzhi='${formParam.bianzhi}'
          ,shiyou='${formParam.shiyou}'
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
      this.title = '添加联勤保障力量信息';
      this.form = {
        id: '',
      name: '',
      class: '',
      lishuguanxi: '',
      type: '',
      province: '',
      city: '',
      area: '',
      address: '',
      bianzhi: '',
      shiyou: '',
      baozhangnengli: '',
      contact: '',
      phone: '',
      remark: '',
      isdel: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改联勤保障力量信息';
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
          const deleteSQL = `UPDATE associatehelp SET isdel='1' WHERE id = '${row.id}'`;
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
            name: e.单位名称?e.单位名称:'',
            class: e.级别?e.级别:'',
            lishuguanxi: e.隶属关系?e.隶属关系:'',
            type: e.类别?e.类别:'',
            province: e.省?e.省:'',
            city: e.市?e.市:'',
            area: e.区?e.区:'',
            address: e.详细地址?e.详细地址:'',
            bianzhi: e.编制员额?e.编制员额:'',
            shiyou: e.实有员额?e.实有员额:'',
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
      const SQL = `INSERT INTO associatehelp (
                    id,
                    name,
                    class,
                    lishuguanxi,
                    type,
                    province,
                    city,
                    area,
                    address,
                    bianzhi,
                    shiyou,
                    baozhangnengli,
                    contact,
                    phone,
                    remark,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.name}','${formParam.class}','${formParam.lishuguanxi}'
            ,'${formParam.type}','${formParam.province}','${formParam.city}','${formParam.area}','${formParam.address}'
            ,'${formParam.bianzhi}','${formParam.shiyou}','${formParam.baozhangnengli}'
            ,'${formParam.contact}','${formParam.phone}','${formParam.remark}'
            ,'${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '单位名称', '级别', '隶属关系', '类别', '省', '市', '区', '详细地址'
        , '编制员额', '实有员额', '保障能力', '联系人', '联系电话', '备注'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.name,
                    item.class,
                    item.lishuguanxi,
                    item.type,
                    item.province,
                    item.city,
                    item.area,
                    item.address,
                    item.bianzhi,
                    item.shiyou,
                    item.baozhangnengli,
                    item.contact,
                    item.phone,
                    item.remark,
        ]);
        i++;
      }
      const name = '联勤保障力量信息';
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

