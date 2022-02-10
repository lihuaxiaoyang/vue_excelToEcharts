<template>
<el-container>
   <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="  " label-width="30px">
        <el-input v-model="serchParam" placeholder="请输入类型"></el-input>
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
    <el-table-column align="center" label="序号" width="60" type="index">
    </el-table-column>
    <el-table-column align="center" prop="type" label="类型" min-width="120" sortable></el-table-column>
    <el-table-column align="center" prop="name" label="规格型号" min-width="120"></el-table-column>
    <el-table-column align="center" prop="danwei" label="单位" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shiyongdanwei" label="使用单位" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zerenren" label="责任人" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhangmianshuliang" label="账面数量" min-width="120"></el-table-column>
    <el-table-column align="center" prop="jiliangdanwei" label="计量单位" min-width="120"></el-table-column>
    <el-table-column align="center" prop="danjia" label="单价" min-width="120"></el-table-column>
    <el-table-column align="center" prop="jine" label="金额" min-width="120"></el-table-column>
    <el-table-column align="center" prop="qudefangshi" label="取得方式" min-width="120"></el-table-column>
    <el-table-column align="center" prop="quderiqi" label="取得日期" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shiyongnianxian" label="使用年限" min-width="120"></el-table-column>
    <el-table-column align="center" prop="shiyongzhuangtai" label="使用状态" min-width="120"></el-table-column>
    <el-table-column align="center" prop="zhiliangdengji" label="质量等级" min-width="120"></el-table-column>
    <el-table-column align="center" prop="pandiandanwei" label="盘点单位" min-width="120"></el-table-column>
    <el-table-column align="center" prop="beizhu" label="备注" min-width="120"></el-table-column>
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
      <el-form-item label="类型" prop="type" style="width: 80%">
        <el-input v-model="form.type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <el-form-item label="规格型号" prop="name" style="width: 80%">
        <el-input v-model="form.name" placeholder="请输入规格型号"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="danwei" style="width: 80%">
        <el-input v-model="form.danwei" placeholder="请输入单位"></el-input>
      </el-form-item>
      <el-form-item label="使用单位" prop="shiyongdanwei" style="width: 80%">
        <el-input v-model="form.shiyongdanwei" placeholder="请输入使用单位"></el-input>
      </el-form-item>
      <el-form-item label="责任人" prop="zerenren" style="width: 80%">
        <el-input v-model="form.zerenren" placeholder="请输入责任人"></el-input>
      </el-form-item>
      <el-form-item label="账面数量" prop="zhangmianshuliang" style="width: 80%">
        <el-input v-model="form.zhangmianshuliang" placeholder="请输入账面数量"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="jiliangdanwei" style="width: 80%">
        <el-input v-model="form.jiliangdanwei" placeholder="请输入计量单位"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="danjia" style="width: 80%">
        <el-input v-model="form.danjia" placeholder="请输入单价"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="jine" style="width: 80%">
        <el-input v-model="form.jine" placeholder="请输入金额"></el-input>
      </el-form-item>
      <el-form-item label="取得方式" prop="qudefangshi" style="width: 80%">
        <el-input v-model="form.qudefangshi" placeholder="请输入取得方式"></el-input>
      </el-form-item>
      <el-form-item label="取得日期" prop="quderiqi" style="width: 80%">
        <el-input v-model="form.quderiqi" placeholder="请输入取得日期"></el-input>
      </el-form-item>
      <el-form-item label="使用年限" prop="shiyongnianxian" style="width: 80%">
        <el-input v-model="form.shiyongnianxian" placeholder="请输入使用年限"></el-input>
      </el-form-item>
      <el-form-item label="使用状态" prop="shiyongzhuangtai" style="width: 80%">
        <el-input v-model="form.shiyongzhuangtai" placeholder="请输入使用状态"></el-input>
      </el-form-item>
      <el-form-item label="质量等级" prop="zhiliangdengji" style="width: 80%">
        <el-input v-model="form.zhiliangdengji" placeholder="请输入质量等级"></el-input>
      </el-form-item>
      <el-form-item label="盘点单位" prop="pandiandanwei" style="width: 80%">
        <el-input v-model="form.pandiandanwei" placeholder="请输入盘点单位"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="beizhu" style="width: 80%">
        <el-input type="textarea" v-model="form.beizhu" placeholder="请输入备注"></el-input>
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
import day from 'dayjs';
import Xlsx from 'xlsx';
export default {
  name: 'shebeiqicai',
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
        type: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        name: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        danwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shiyongdanwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zerenren: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zhangmianshuliang: [{ required: true, message: '不允许为空！', trigger: 'blur' },
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
          }],
        jiliangdanwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        danjia: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        jine: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        qudefangshi: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        quderiqi: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shiyongnianxian: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shiyongzhuangtai: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zhiliangdengji: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        pandiandanwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
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
      name: '',
      danwei: '',
      shiyongdanwei: '',
      zerenren: '',
      zhangmianshuliang: '',
      jiliangdanwei: '',
      danjia: '',
      jine: '',
      qudefangshi: '',
      quderiqi: '',
      shiyongnianxian: '',
      shiyongzhuangtai: '',
      zhiliangdengji: '',
      pandiandanwei: '',
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
            const deleteSQL = `UPDATE shebeiqicai SET
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
      const whereSQL1 = `type LIKE '%${this.serchParam}%' AND `;
      const whereSQL2 = 'isdel = 0 ';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam === '') {
        WhereSQL = 'SELECT * from shebeiqicai WHERE ' + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from shebeiqicai WHERE ' + whereSQL2 + pageSQL;
      } else {
        WhereSQL = 'SELECT * from shebeiqicai WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
        CountSQL = 'SELECT COUNT(id) AS total from shebeiqicai WHERE ' + whereSQL1 + whereSQL2 + pageSQL;
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
      this.title = '添加';
      this.form = {
        id: '',
      type: '',
      name: '',
      danwei: '',
      shiyongdanwei: '',
      zerenren: '',
      zhangmianshuliang: '',
      jiliangdanwei: '',
      danjia: '',
      jine: '',
      qudefangshi: '',
      quderiqi: '',
      shiyongnianxian: '',
      shiyongzhuangtai: '',
      zhiliangdengji: '',
      pandiandanwei: '',
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
            const SQL = `SELECT COUNT(id) AS totalCount from shebeiqicai WHERE id = '${D.id}'`;
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
                  const SQL = `INSERT INTO shebeiqicai (id,type,name,danwei,shiyongdanwei,zerenren,
                  zhangmianshuliang,jiliangdanwei,danjia,jine,qudefangshi,quderiqi,shiyongnianxian,shiyongzhuangtai,
                  zhiliangdengji,pandiandanwei,beizhu,starttime,isdel)
            VALUES ('${D.id}','${D.type}','${D.name}','${D.danwei}','${D.shiyongdanwei}','${D.zerenren}'
            ,'${D.zhangmianshuliang}','${D.jiliangdanwei}','${D.danjia}','${D.jine}','${D.qudefangshi}','${D.quderiqi}'
            ,'${D.shiyongnianxian}','${D.shiyongzhuangtai}','${D.zhiliangdengji}','${D.pandiandanwei}','${D.beizhu}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from shebeiqicai WHERE id = '${D.id}'`;
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
                  const SQL = `UPDATE shebeiqicai SET
          type='${D.type}'
          ,name='${D.name}'
          ,danwei='${D.danwei}'
          ,shiyongdanwei='${D.shiyongdanwei}'
          ,zerenren='${D.zerenren}'
          ,zhangmianshuliang='${D.zhangmianshuliang}'
          ,jiliangdanwei='${D.jiliangdanwei}'
          ,danjia='${D.danjia}'
          ,jine='${D.jine}'
          ,qudefangshi='${D.qudefangshi}'
          ,quderiqi='${D.quderiqi}'
          ,shiyongnianxian='${D.shiyongnianxian}'
          ,shiyongzhuangtai='${D.shiyongzhuangtai}'
          ,zhiliangdengji='${D.zhiliangdengji}'
          ,pandiandanwei='${D.pandiandanwei}'
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
      this.$confirm('是否删除该信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          const deleteSQL = `UPDATE shebeiqicai SET
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
            type: e.类型?e.类型:'',
            name: e.规格型号?e.规格型号:'',
            danwei: e.单位?e.单位:'',
            shiyongdanwei: e.使用单位?e.使用单位:'',
            zerenren: e.责任人?e.责任人:'',
            zhangmianshuliang: e.账面数量?e.账面数量:'',
            jiliangdanwei: e.计量单位?e.计量单位:'',
            danjia: e.单价?e.单价:'',
            jine: e.金额?e.金额:'',
            qudefangshi: e.取得方式?e.取得方式:'',
            quderiqi: e.取得日期?e.取得日期:'',
            shiyongnianxian: e.使用年限?e.使用年限:'',
            shiyongzhuangtai: e.使用状态?e.使用状态:'',
            zhiliangdengji: e.质量等级?e.质量等级:'',
            pandiandanwei: e.盘点单位?e.盘点单位:'',
            beizhu: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(D, index){
      const SQL = `INSERT INTO shebeiqicai (id,type,name,danwei,shiyongdanwei,zerenren,
                  zhangmianshuliang,jiliangdanwei,danjia,jine,qudefangshi,quderiqi,shiyongnianxian,shiyongzhuangtai,
                  zhiliangdengji,pandiandanwei,beizhu,starttime,isdel)
            VALUES ('${D.id}','${D.type}','${D.name}','${D.danwei}','${D.shiyongdanwei}','${D.zerenren}'
            ,'${D.zhangmianshuliang}','${D.jiliangdanwei}','${D.danjia}','${D.jine}','${D.qudefangshi}','${D.quderiqi}'
            ,'${D.shiyongnianxian}','${D.shiyongzhuangtai}','${D.zhiliangdengji}','${D.pandiandanwei}','${D.beizhu}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '类型', '规格型号', '单位', '使用单位', '责任人', '账面数量', '计量单位', '单价', '金额', '取得方式', '取得日期', '使用年限', 
        '使用状态', '质量等级', '盘点单位', '备注'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.type,
          item.name,
          item.danwei,
          item.shiyongdanwei,
          item.zerenren,
          item.zhangmianshuliang,
          item.jiliangdanwei,
          item.danjia,
          item.jine,
          item.qudefangshi,
          item.quderiqi,
          item.shiyongnianxian,
          item.shiyongzhuangtai,
          item.zhiliangdengji,
          item.pandiandanwei,
          item.beizhu,
        ]);
        i++;
      }
      const name = '设备器材信息';
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
