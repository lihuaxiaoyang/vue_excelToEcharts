<template>
  <el-container class="home1-container">
    <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="serchParam.type" placeholder="请输入装备类型"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="serchParam.name" placeholder="请输入装备名称"></el-input>
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
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column align="center" prop="type" label="类型" min-width="120" sortable></el-table-column>
      <el-table-column align="center" prop="name" label="名称" min-width="120"></el-table-column>
      <el-table-column align="center" prop="zhuangbeiID" label="装备ID" min-width="120"></el-table-column>
      <el-table-column align="center" prop="danwei" label="单位" min-width="120"></el-table-column>
      <el-table-column align="center" prop="shiyongdanwei" label="使用单位" min-width="120"></el-table-column>
      <el-table-column align="center" prop="zerenren" label="责任人" min-width="120"></el-table-column>
      <el-table-column align="center" prop="shilishuliang" label="实际数量" min-width="120"></el-table-column>
      <el-table-column align="center" prop="jiliangdanwei" label="计量单位" min-width="120"></el-table-column>
      <el-table-column align="center" prop="danjia" label="单价" min-width="120"></el-table-column>
      <el-table-column align="center" prop="jine" label="金额" min-width="120"></el-table-column>
      <el-table-column align="center" prop="chuchangriqi" label="出厂日期" min-width="120"></el-table-column>
      <el-table-column align="center" prop="qudefangshi" label="取得方式" min-width="120"></el-table-column>
      <el-table-column align="center" prop="shiyongzhuangtai" label="使用状态" min-width="120"></el-table-column>
      <el-table-column align="center" prop="zhiliangdengji" label="质量等级" min-width="120"></el-table-column>
      <el-table-column align="center" prop="pandiandanwei" label="盘点单位" min-width="120"></el-table-column>
      <el-table-column align="center" prop="zairennengli" label="载人能力" min-width="120"></el-table-column>
      <el-table-column align="center" prop="zaihuonengli" label="载货能力" min-width="120"></el-table-column>
      <el-table-column align="center" prop="sudu" label="速度" min-width="120"></el-table-column>
      <el-table-column align="center" prop="shifouxiaohaoyouliao" label="是否消耗油料" min-width="120"></el-table-column>
      <el-table-column align="center" prop="zhuyouxiangrongliang" label="主油箱容量" min-width="120"></el-table-column>
      <el-table-column align="center" prop="fuyouxiangrongliang" label="副油箱容量" min-width="120"></el-table-column>
      <el-table-column align="center" prop="xingcheyouhao" label="行程油耗" min-width="120"></el-table-column>
      <el-table-column align="center" prop="shifouzhuangpeiyouji" label="是否装备油机" min-width="120"></el-table-column>
      <el-table-column align="center" prop="kaijiyouhao" label="开机油耗" min-width="120"></el-table-column>
      <el-table-column align="center" prop="beizhu" label="备注" min-width="120"></el-table-column>
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
      <el-form-item label="类型" prop="type" style="width: 80%">
        <el-input v-model="form.type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name" style="width: 80%">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="装备ID" prop="zhuangbeiID" style="width: 80%">
        <el-input v-model="form.zhuangbeiID" placeholder="请输入装备ID"></el-input>
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
      <el-form-item label="实际数量" prop="shilishuliang" style="width: 80%">
        <el-input v-model="form.shilishuliang" placeholder="请输入实际数量"></el-input>
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
      <el-form-item label="出厂日期" prop="chuchangriqi" style="width: 80%">
        <el-input v-model="form.chuchangriqi" placeholder="请输入出厂日期"></el-input>
      </el-form-item>
      <el-form-item label="取得方式" prop="qudefangshi" style="width: 80%">
        <el-input v-model="form.qudefangshi" placeholder="请输入取得方式"></el-input>
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
      <el-form-item label="载人能力" prop="zairennengli" style="width: 80%">
        <el-input v-model="form.zairennengli" placeholder="请输入载人能力"></el-input>
      </el-form-item>
      <el-form-item label="载货能力" prop="zaihuonengli" style="width: 80%">
        <el-input v-model="form.zaihuonengli" placeholder="请输入载货能力"></el-input>
      </el-form-item>
      <el-form-item label="速度" prop="sudu" style="width: 80%">
        <el-input v-model="form.sudu" placeholder="请输入速度"></el-input>
      </el-form-item>
      <el-form-item label="是否消耗油料" prop="shifouxiaohaoyouliao" style="width: 80%">
        <el-radio-group v-model="form.shifouxiaohaoyouliao">
          <el-radio-button label="是"></el-radio-button>
          <el-radio-button label="否"></el-radio-button>
        </el-radio-group>
        <!-- <el-input v-model="form.shifouxiaohaoyouliao" placeholder="请输入是否消耗油料"></el-input> -->
      </el-form-item>
      <el-form-item label="主油箱容量" prop="zhuyouxiangrongliang" style="width: 80%">
        <el-input v-model="form.zhuyouxiangrongliang" placeholder="请输入主油箱容量"></el-input>
      </el-form-item>
      <el-form-item label="副油箱容量" prop="fuyouxiangrongliang" style="width: 80%">
        <el-input v-model="form.fuyouxiangrongliang" placeholder="请输入副油箱容量"></el-input>
      </el-form-item>
      <el-form-item label="行程油耗" prop="xingcheyouhao" style="width: 80%">
        <el-input v-model="form.xingcheyouhao" placeholder="请输入行程油耗"></el-input>
      </el-form-item>
      <el-form-item label="是否装备油机" prop="shifouzhuangpeiyouji" style="width: 80%">
        <el-input v-model="form.shifouzhuangpeiyouji" placeholder="请输入是否装备油机"></el-input>
      </el-form-item>
      <el-form-item label="开机油耗" prop="kaijiyouhao" style="width: 80%">
        <el-input v-model="form.kaijiyouhao" placeholder="请输入开机油耗"></el-input>
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
  name: 'zhuangbei',
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
        type: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        name: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zhuangbeiID: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        danwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shiyongdanwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zerenren: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shilishuliang: [{ required: true, message: '不允许为空！', trigger: 'blur' },
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
        chuchangriqi: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        qudefangshi: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shiyongzhuangtai: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zhiliangdengji: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        pandiandanwei: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zairennengli: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zaihuonengli: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        sudu: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shifouxiaohaoyouliao: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        zhuyouxiangrongliang: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        fuyouxiangrongliang: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        xingcheyouhao: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        shifouzhuangpeiyouji: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
        kaijiyouhao: [{ required: true, message: '不允许为空！', trigger: 'blur' }],
      },
      // 批量删除用
      multipleTable: [],
      // 原始样例数据
      tableData: null,
      // 查询字段
      serchParam: {
        type: '',
        name: '',
      },
    };
  },
  created() {
    this.getDataList();
    this.form = {
      id: '',
      type: '',
      name: '',
      zhuangbeiID: '',
      danwei: '',
      shiyongdanwei: '',
      zerenren: '',
      shilishuliang: '',
      jiliangdanwei: '',
      danjia: '',
      jine: '',
      chuchangriqi: '',
      qudefangshi: '',
      shiyongzhuangtai: '',
      zhiliangdengji: '',
      pandiandanwei: '',
      zairennengli: '',
      zaihuonengli: '',
      sudu: '',
      shifouxiaohaoyouliao: '',
      zhuyouxiangrongliang: '',
      fuyouxiangrongliang: '',
      xingcheyouhao: '',
      shifouzhuangpeiyouji: '',
      kaijiyouhao: '',
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
            const deleteSQL = `UPDATE zhuangbei SET
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
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      const whereSQL1 = `type LIKE '%${this.serchParam.type}%' AND `;
      const whereSQL2 = `name LIKE '%${this.serchParam.name}%' AND `;
      const whereSQL3 = 'isdel = 0 ';
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam.peopletype === '' && this.serchParam.major === '') {
        whereSQL = 'SELECT * from zhuangbei WHERE ' + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from zhuangbei WHERE ' + whereSQL3 + pageSQL;
      } else {
        whereSQL = 'SELECT * from zhuangbei WHERE ' + whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
        countSQL = 'SELECT COUNT(id) AS total from zhuangbei WHERE ' + whereSQL1 + whereSQL2 + whereSQL3 + pageSQL;
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
            const SQL = `SELECT COUNT(id) AS totalCount from zhuangbei WHERE id = '${formParam.id}'`;
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
                  const SQL = `INSERT INTO zhuangbei (
                    id,
                    type,
                    name,
                    zhuangbeiID,
                    danwei,
                    shiyongdanwei,
                    zerenren,
                    shilishuliang,
                    jiliangdanwei,
                    danjia,
                    jine,
                    chuchangriqi,
                    qudefangshi,
                    shiyongzhuangtai,
                    zhiliangdengji,
                    pandiandanwei,
                    zairennengli,
                    zaihuonengli,
                    sudu,
                    shifouxiaohaoyouliao,
                    zhuyouxiangrongliang,
                    fuyouxiangrongliang,
                    xingcheyouhao,
                    shifouzhuangpeiyouji,
                    kaijiyouhao,
                    beizhu,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.type}','${formParam.name}','${formParam.zhuangbeiID}','${formParam.danwei}','${formParam.shiyongdanwei}',
            '${formParam.zerenren}','${formParam.shilishuliang}','${formParam.jiliangdanwei}','${formParam.danjia}','${formParam.jine}','${formParam.chuchangriqi}',
            '${formParam.qudefangshi}','${formParam.shiyongzhuangtai}','${formParam.zhiliangdengji}','${formParam.pandiandanwei}',
            '${formParam.zairennengli}','${formParam.zaihuonengli}','${formParam.sudu}','${formParam.shifouxiaohaoyouliao}',
            '${formParam.zhuyouxiangrongliang}','${formParam.fuyouxiangrongliang}','${formParam.xingcheyouhao}','${formParam.shifouzhuangpeiyouji}'
            ,'${formParam.kaijiyouhao}','${formParam.beizhu}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
            const SQL = `SELECT id from zhuangbei WHERE id = '${formParam.id}'`;
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
                  const SQL = `UPDATE zhuangbei SET
          type='${formParam.type}'
          ,name='${formParam.name}'
          ,zhuangbeiID='${formParam.zhuangbeiID}'
          ,danwei='${formParam.danwei}'
          ,shiyongdanwei='${formParam.shiyongdanwei}'
          ,zerenren='${formParam.zerenren}'
          ,shilishuliang='${formParam.shilishuliang}'
          ,jiliangdanwei='${formParam.jiliangdanwei}'
          ,danjia='${formParam.danjia}'
          ,jine='${formParam.jine}'
          ,chuchangriqi='${formParam.chuchangriqi}'
          ,qudefangshi='${formParam.qudefangshi}'
          ,shiyongzhuangtai='${formParam.shiyongzhuangtai}'
          ,zhiliangdengji='${formParam.zhiliangdengji}'
          ,pandiandanwei='${formParam.pandiandanwei}'
          ,zairennengli='${formParam.zairennengli}'
          ,zaihuonengli='${formParam.zaihuonengli}'
          ,sudu='${formParam.sudu}'
          ,shifouxiaohaoyouliao='${formParam.shifouxiaohaoyouliao}'
          ,zhuyouxiangrongliang='${formParam.zhuyouxiangrongliang}'
          ,fuyouxiangrongliang='${formParam.fuyouxiangrongliang}'
          ,xingcheyouhao='${formParam.xingcheyouhao}'
          ,shifouzhuangpeiyouji='${formParam.shifouzhuangpeiyouji}'
          ,kaijiyouhao='${formParam.kaijiyouhao}'
          ,beizhu='${formParam.beizhu}'
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
      this.title = '添加装备信息';
      this.form = {
        id: '',
      type: '',
      name: '',
      zhuangbeiID: '',
      danwei: '',
      shiyongdanwei: '',
      zerenren: '',
      shilishuliang: '',
      jiliangdanwei: '',
      danjia: '',
      jine: '',
      chuchangriqi: '',
      qudefangshi: '',
      shiyongzhuangtai: '',
      zhiliangdengji: '',
      pandiandanwei: '',
      zairennengli: '',
      zaihuonengli: '',
      sudu: '',
      shifouxiaohaoyouliao: '',
      zhuyouxiangrongliang: '',
      fuyouxiangrongliang: '',
      xingcheyouhao: '',
      shifouzhuangpeiyouji: '',
      kaijiyouhao: '',
      beizhu: '',
      isdel: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改装备信息';
      this.form = row;
      this.dialogFormVisible = true;
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
          const deleteSQL = `UPDATE zhuangbei SET isdel='1' WHERE id = '${row.id}'`;
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
            name: e.名称?e.名称:'',
            zhuangbeiID: e.装备ID?e.装备ID:'',
            danwei: e.单位?e.单位:'',
            shiyongdanwei: e.使用单位?e.使用单位:'',
            zerenren: e.责任人?e.责任人:'',
            shilishuliang: e.实际数量?e.实际数量:'',
            jiliangdanwei: e.计量单位?e.计量单位:'',
            danjia: e.单价?e.单价:'',
            jine: e.金额?e.金额:'',
            chuchangriqi: e.出厂日期?e.出厂日期:'',
            qudefangshi: e.取得方式?e.取得方式:'',
            shiyongzhuangtai: e.使用状态?e.使用状态:'',
            zhiliangdengji: e.质量等级?e.质量等级:'',
            pandiandanwei: e.盘点单位?e.盘点单位:'',
            zairennengli: e.载人能力?e.载人能力:'',
            zaihuonengli: e.载货能力?e.载货能力:'',
            sudu: e.速度?e.速度:'',
            shifouxiaohaoyouliao: e.是否消耗油料?e.是否消耗油料:'',
            zhuyouxiangrongliang: e.主油箱容量?e.主油箱容量:'',
            fuyouxiangrongliang: e.副油箱容量?e.副油箱容量:'',
            xingcheyouhao: e.行程油耗?e.行程油耗:'',
            shifouzhuangpeiyouji: e.是否装备油机?e.是否装备油机:'',
            kaijiyouhao: e.开机油耗?e.开机油耗:'',
            beizhu: e.备注?e.备注:'',
          };
          this.insetdata(temp, i);
          i++;
      }
      this.getDataList();
    },
    // 插入数据
    insetdata(formParam, index){
      const SQL = `INSERT INTO zhuangbei (
                    id,
                    type,
                    name,
                    zhuangbeiID,
                    danwei,
                    shiyongdanwei,
                    zerenren,
                    shilishuliang,
                    jiliangdanwei,
                    danjia,
                    jine,
                    chuchangriqi,
                    qudefangshi,
                    shiyongzhuangtai,
                    zhiliangdengji,
                    pandiandanwei,
                    zairennengli,
                    zaihuonengli,
                    sudu,
                    shifouxiaohaoyouliao,
                    zhuyouxiangrongliang,
                    fuyouxiangrongliang,
                    xingcheyouhao,
                    shifouzhuangpeiyouji,
                    kaijiyouhao,
                    beizhu,
                    starttime,
                    isdel)
            VALUES ('${formParam.id}','${formParam.type}','${formParam.name}','${formParam.zhuangbeiID}','${formParam.danwei}','${formParam.shiyongdanwei}',
            '${formParam.zerenren}','${formParam.shilishuliang}','${formParam.jiliangdanwei}','${formParam.danjia}','${formParam.jine}','${formParam.chuchangriqi}',
            '${formParam.qudefangshi}','${formParam.shiyongzhuangtai}','${formParam.zhiliangdengji}','${formParam.pandiandanwei}',
            '${formParam.zairennengli}','${formParam.zaihuonengli}','${formParam.sudu}','${formParam.shifouxiaohaoyouliao}',
            '${formParam.zhuyouxiangrongliang}','${formParam.fuyouxiangrongliang}','${formParam.xingcheyouhao}','${formParam.shifouzhuangpeiyouji}'
            ,'${formParam.kaijiyouhao}','${formParam.beizhu}','${day().format('YYYY-MM-DD HH:mm:ss')}','0')`;
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
        [ '序号', '类型', '名称', '装备ID', '单位', '使用单位', '责任人', '实际数量', '计量单位'
        , '单价', '金额', '出厂日期', '取得方式', '使用状态', '质量等级', '盘点单位'
        , '载人能力', '载货能力', '速度', '是否消耗油料', '主油箱容量', '副油箱容量', '行程油耗'
        , '是否装备油机', '开机油耗', '备注'],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.type,
      item.name,
      item.zhuangbeiID,
      item.danwei,
      item.shiyongdanwei,
      item.zerenren,
      item.shilishuliang,
      item.jiliangdanwei,
      item.danjia,
      item.jine,
      item.chuchangriqi,
      item.qudefangshi,
      item.shiyongzhuangtai,
      item.zhiliangdengji,
      item.pandiandanwei,
      item.zairennengli,
      item.zaihuonengli,
      item.sudu,
      item.shifouxiaohaoyouliao,
      item.zhuyouxiangrongliang,
      item.fuyouxiangrongliang,
      item.xingcheyouhao,
      item.shifouzhuangpeiyouji,
      item.kaijiyouhao,
      item.beizhu,
        ]);
        i++;
      }
      const name = '装备信息';
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

