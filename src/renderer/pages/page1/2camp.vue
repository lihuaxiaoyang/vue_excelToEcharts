<template>
<el-container>
   <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="  " label-width="30px">
        <el-input v-model="serchParam" placeholder="请输入营区名称"></el-input>
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
    <el-table-column align="center" prop="name" label="营区/阵地名称" min-width="120" sortable></el-table-column>
    <el-table-column align="center" prop="province" label="省" min-width="120"></el-table-column>
    <el-table-column align="center" prop="city" label="市" min-width="120"></el-table-column>
    <el-table-column align="center" prop="area" label="区" min-width="120"></el-table-column>
    <el-table-column align="center" prop="address" label="详细地址" min-width="120"></el-table-column>
    <el-table-column align="center" prop="takearea" label="占地面积" min-width="120"></el-table-column>
    <el-table-column align="center" prop="buildarea" label="建筑面积" min-width="120"></el-table-column>
    <el-table-column align="center" prop="yongdifenlei" label="用地分类" min-width="120"></el-table-column>
    <el-table-column align="center" prop="gongshui" label="供水方式" min-width="120"></el-table-column>
    <el-table-column align="center" prop="gongdian" label="供电方式" min-width="120"></el-table-column>
    <el-table-column align="center" prop="gongqi" label="供气方式" min-width="120"></el-table-column>
    <el-table-column align="center" prop="gongnuan" label="供暖方式" min-width="120"></el-table-column>
    <el-table-column align="center" prop="liyongzk" label="利用状况" min-width="120"></el-table-column>
    <el-table-column align="center" prop="ziranhj" label="自然环境" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shehuihj" label="社会环境" min-width="120"></el-table-column>
    <el-table-column align="center" prop="remark" label="备注" min-width="120"></el-table-column>
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
      <el-form-item label="营区/阵地名称" prop="name" style="width: 80%">
        <el-input v-model="form.name" placeholder="请输入营区/阵地名称"></el-input>
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
      <el-form-item label="占地面积" prop="takearea" style="width: 80%">
        <el-input v-model="form.takearea" placeholder="请输入占地面积"></el-input>
      </el-form-item>
      <el-form-item label="建筑面积" prop="buildarea" style="width: 80%">
        <el-input v-model="form.buildarea" placeholder="请输入建筑面积"></el-input>
      </el-form-item>
      <el-form-item label="用地分类" prop="yongdifenlei" style="width: 80%">
        <el-input v-model="form.yongdifenlei" placeholder="请输入用地分类"></el-input>
      </el-form-item>
      <el-form-item label="供水方式" prop="gongshui" style="width: 80%">
        <el-input v-model="form.gongshui" placeholder="请输入供水方式"></el-input>
      </el-form-item>
      <el-form-item label="供电方式" prop="gongdian" style="width: 80%">
        <el-input v-model="form.gongdian" placeholder="请输入供电方式"></el-input>
      </el-form-item>
      <el-form-item label="供气方式" prop="gongqi" style="width: 80%">
        <el-input v-model="form.gongqi" placeholder="请输入供气方式"></el-input>
      </el-form-item>
      <el-form-item label="供暖方式" prop="gongnuan" style="width: 80%">
        <el-input v-model="form.gongnuan" placeholder="请输入供暖方式"></el-input>
      </el-form-item>
      <el-form-item label="利用状况" prop="liyongzk" style="width: 80%">
        <el-input v-model="form.liyongzk" placeholder="请输入利用状况"></el-input>
      </el-form-item>
      <el-form-item label="自然环境" prop="ziranhj" style="width: 80%">
        <el-input v-model="form.ziranhj" placeholder="请输入自然环境"></el-input>
      </el-form-item>
      <el-form-item label="社会环境" prop="shehuihj" style="width: 80%">
        <el-input v-model="form.shehuihj" placeholder="请输入社会环境"></el-input>
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
        area: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        address: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        takearea: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        buildarea: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        yongdifenlei: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        gongshui: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        gongdian: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        gongqi: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        gongnuan: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        liyongzk: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        ziranhj: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
        shehuihj: [ { required: true, message: '不允许为空！', trigger: 'blur' } ],
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
      province: '',
      city: '',
      area: '',
      address: '',
      takearea: '',
      buildarea: '',
      yongdifenlei: '',
      gongshui: '',
      gongdian: '',
      gongqi: '',
      gongnuan: '',
      liyongzk: '',
      ziranhj: '',
      shehuihj: '',
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
            const deleteSQL = `UPDATE camp SET
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
    // // 单位生成编码
    // generateCode(code) {
    //   return code + '-' + this.getrandom();
    // },
    // 执行查询操作
    getDataList() {
      let WhereSQL = '';
      let CountSQL = '';
      const whereSQL1 = `name LIKE '%${this.serchParam}%' AND `;
      const whereSQL2 = 'isdel = 0 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        WhereSQL = 'SELECT * from camp WHERE ' + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from camp WHERE ' + whereSQL2 + pageSQL;
      } else {
        WhereSQL = 'SELECT * from camp WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from camp WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
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
      this.title = '添加营区/阵地信息';
      this.form = {
        name: '',
      province: '',
      city: '',
      area: '',
      address: '',
      takearea: '',
      buildarea: '',
      yongdifenlei: '',
      gongshui: '',
      gongdian: '',
      gongqi: '',
      gongnuan: '',
      liyongzk: '',
      ziranhj: '',
      shehuihj: '',
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
            const SQL = `SELECT COUNT(id) AS totalCount from camp WHERE id = '${D.id}'`;
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
                  const SQL = `INSERT INTO camp (id,name,province,city,area,address,
                  takearea,buildarea,yongdifenlei,gongshui,gongdian,gongqi,gongnuan,
                  liyongzk,ziranhj,shehuihj,remark,starttime,isdel)
            VALUES ('${D.id}','${D.name}','${D.province}','${D.city}','${D.area}','${D.address}'
            ,'${D.takearea}','${D.buildarea}','${D.yongdifenlei}','${D.gongshui}','${D.gongdian}',
            '${D.gongqi}','${D.gongnuan}','${D.liyongzk}'
            ,'${D.ziranhj}','${D.shehuihj}','${D.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from camp WHERE id = '${D.id}'`;
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
                  const SQL = `UPDATE camp SET
          name='${D.name}'
          ,province='${D.province}'
          ,city='${D.city}'
          ,area='${D.area}'
          ,address='${D.address}'
          ,takearea='${D.takearea}'
          ,buildarea='${D.buildarea}'
          ,yongdifenlei='${D.yongdifenlei}'
          ,gongshui='${D.gongshui}'
          ,gongdian='${D.gongdian}' 
          ,gongqi='${D.gongqi}'
          ,gongnuan='${D.gongnuan}'
          ,liyongzk='${D.liyongzk}'
          ,ziranhj='${D.ziranhj}'
          ,shehuihj='${D.shehuihj}'
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
      this.title = '修改营区/阵地信息';
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
          const deleteSQL = `UPDATE camp SET
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
            name: e.营区阵地名称?e.营区阵地名称:'',
            province: e.省?e.省:'',
            city: e.市?e.市:'',
            area: e.区?e.区:'',
            address: e.详细地址?e.详细地址:'',
            takearea: e.占地面积?e.占地面积:'',
            buildarea: e.建筑面积?e.建筑面积:'',
            yongdifenlei: e.用地分类?e.用地分类:'',
            gongshui: e.供水方式?e.供水方式:'',
            gongdian: e.供电方式?e.供电方式:'',
            gongqi: e.供气方式?e.供气方式:'',
            gongnuan: e.供暖方式?e.供暖方式:'',
            liyongzk: e.利用状况?e.利用状况:'',
            ziranhj: e.自然环境?e.自然环境:'',
            shehuihj: e.社会环境?e.社会环境:'',
            remark: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(D, index){
      const SQL = `INSERT INTO camp (id,name,province,city,area,address,
                  takearea,buildarea,yongdifenlei,gongshui,gongdian,gongqi,gongnuan,
                  liyongzk,ziranhj,shehuihj,remark,starttime,isdel)
            VALUES ('${D.id}','${D.name}','${D.province}','${D.city}','${D.area}','${D.address}'
            ,'${D.takearea}','${D.buildarea}','${D.yongdifenlei}','${D.gongshui}','${D.gongdian}',
            '${D.gongqi}','${D.gongnuan}','${D.liyongzk}'
            ,'${D.ziranhj}','${D.shehuihj}','${D.remark}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '营区阵地名称', '省', '市', '区', '详细地址', '占地面积', '建筑面积', '用地分类', '供水方式', 
        '供电方式', '供气方式', '供暖方式', '利用状况', '自然环境', '社会环境', '备注'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.name,
          item.province,
          item.city,
          item.area,
          item.address,
          item.takearea,
          item.buildarea,
          item.yongdifenlei,
          item.gongshui,
          item.gongdian,
          item.gongqi,
          item.gongnuan,
          item.liyongzk,
          item.ziranhj,
          item.shehuihj,
          item.remark,
        ]);
        i++;
      }
      const name = '营区阵地信息';
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
