<template>
  <el-container class="home1-container">
    <el-main>
    <span class="showdata">人员共计 军官 {{showdata.temp1}}名 文职人员 {{showdata.temp2}}名 士兵 {{showdata.temp3}}名</span>
    <el-form :inline="true" class="demo-form-inline">
      <!-- 查询框 -->
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
    v-loading="listLoading"
    :default-sort="{prop: 'phone', order: 'descending'}"
    :data="tableData"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    style="width: 100%"
    @selection-change="handleSelect">
    <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column align="center" prop="phone" label="是否后勤人员" min-width="120"
      :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]" sortable
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.phone === '是' ? 'primary': 'success'">{{scope.row.phone}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in peopletable"
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
      <el-form-item label="是否后勤官兵" prop="phone" style="width: 90%">
        <el-radio-group v-model="form.phone">
          <el-radio-button label="是"></el-radio-button>
          <el-radio-button label="否"></el-radio-button>
        </el-radio-group>
        <!-- <el-input v-model="form.phone" placeholder="请选择是否后勤官兵"></el-input> -->
      </el-form-item>
      <el-form-item label="专业" prop="major" style="width: 90%">
        <el-select v-model="form.major" filterable placeholder="请选择专业">
          <el-option
          v-for="item in majoroptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兼职专业" prop="othermajor" style="width: 90%">
        <el-select
        v-model="othermajors"
        multiple
        filterable
        placeholder="请选择兼职专业">
        <el-option
          v-for="item in majoroptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
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
  name: 'people',
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
        peopletype: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        peopleclass: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        peopledp: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        homeplace: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        partintime: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        phone: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        major: [{ required: true,  message: '不允许为空！', trigger: 'blur' }],
      },
      // 批量删除用
      multipleTable: [],
      // select 选择器字段
      peopleoptions: this.$val.peopleoptions,
      majoroptions: null,
      // table字段
      peopletable: this.$val.peopletable,
      // 原始样例数据
      tableData: null,
      // 查询字段
      serchParam: {
        peopletype: '',
        major: '',
      },
      // 展示的数据
      showdata: {
        temp1: 0,
        temp2: 0,
        temp3: 0,
      },
      // 其他专业列表
      othermajors: [],
    };
  },
  created() {
    this.getDataList();
    this.form = {
      id: '',
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
            const deleteSQL = `UPDATE peoplecondition SET
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
    // 执行统计查询操作
    getDataforShow(label, code) {
      // 统计查询语句
      const calSQL = `SELECT peopletype FROM peoplecondition`;
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
    getDataList() {
      // 主查询语句
      let WhereSQL = '';
      let CountSQL = '';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      const whereSQL1 = `peoplecondition.peopletype LIKE '%${this.serchParam.peopletype}%' AND `;
      const whereSQL2 = `peoplecondition.major LIKE '%${this.serchParam.major}%' AND `;
      const whereSQL3 = 'peoplecondition.isdel = 0 ';
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam.peopletype === '' && this.serchParam.major === '') {
        WhereSQL = 'SELECT * from peoplecondition WHERE ' + whereSQL3 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from peoplecondition WHERE ' + whereSQL3 + pageSQL;
      } else {
        WhereSQL = 'SELECT * from peoplecondition WHERE ' + whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from peoplecondition WHERE ' + whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
      }
      this.listLoading = true;
      this.$logger(WhereSQL);
      this.$db.all(WhereSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          this.$logger(res);
          this.tableData = res;
          this.showdata.temp1 = 0;
          this.showdata.temp2 = 0;
          this.showdata.temp3 = 0;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].peopletype === '军官') this.showdata.temp1++;
            else if (this.tableData[i].peopletype === '士兵') this.showdata.temp3++;
            else this.showdata.temp2++;
          }
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
            formParam.id = this.getrandom();
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
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.name}','${formParam.peopletype}',
            '${formParam.major}','${formParam.peopleclass}','${formParam.peopledp}','${formParam.homeplace}','${formParam.partintime}'
            ,'${formParam.phone}','${formParam.othermajor}','${formParam.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
          name='${formParam.name}'
          ,peopletype='${formParam.peopletype}'
          ,major='${formParam.major}'
          ,peopleclass='${formParam.peopleclass}'
          ,peopledp='${formParam.peopledp}'
          ,homeplace='${formParam.homeplace}'
          ,partintime='${formParam.partintime}'
          ,phone='${formParam.phone}'
          ,othermajor='${formParam.othermajor}'
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
      this.title = '添加人员信息';
      this.form = {
        id: '',
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
      this.$confirm('是否删除该信息？, 是否继续?', '提示', {
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
            name: e.人员姓名?e.人员姓名:'',
            peopletype: e.人员类别?e.人员类别:'',
            major: e.专业?e.专业:'',
            peopleclass: e.人员类别?e.人员类别:'',
            peopledp: e.职级?e.职级:'',
            homeplace: e.籍贯?e.籍贯:'',
            partintime: e.入伍年月?e.入伍年月:'',
            phone: e.电话?e.电话:'',
            othermajor: e.兼职专业?e.兼职专业:'',
            remark: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(formParam, index){
      const SQL = `INSERT INTO peoplecondition (
                    id,
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
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.name}','${formParam.peopletype}',
            '${formParam.major}','${formParam.peopleclass}','${formParam.peopledp}','${formParam.homeplace}','${formParam.partintime}'
            ,'${formParam.phone}','${formParam.othermajor}','${formParam.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '人员姓名', '人员类别', '职级', '部职别', '籍贯', '入伍年月', '电话', '专业', '兼职专业', '备注' ],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
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

