<template>
  <el-container class="home1-container">
    <div class="block">
  <el-slider
  v-model="sidewidth"
  :max="90"
  vertical
  height="200px">
  </el-slider>
  </div>
    <el-aside :width="sidewidth+'%'">
      <el-card>
        <el-input
        placeholder="输入单位-营区关键字进行过滤"
        prefix-icon="el-icon-search"
        v-model="filterText">
        </el-input>
        <el-tree
        :data="treedata"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :props="defaultProps"
        ref="tree"
        @node-click="getCurrentNodeclick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
            <span v-show="data.class === '5'">
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              添加信息
            </el-button>
          </span>
        </span>
      </el-tree>
      </el-card>
    </el-aside>
    <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="serchParam.campname" placeholder="请输入营区名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="serchParam.type" filterable placeholder="请选择类型">
          <el-option
          v-for="item in typeoptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="serchParam.project" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="findbyname()"><i class="el-icon-search"></i>查询</el-button>
      </el-form-item>
      <el-form-item label="  " label-width="30px">
        <el-button type="success" @click="loadExcell()" :loading="downloadExcelLoading"><i class="el-icon-search"></i>导出</el-button>
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
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column
        v-for="item in zsstatustable"
        :key="item.prop"
        align="left"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width">
      </el-table-column>
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      align="center">
    </el-pagination>
  </div>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
      <el-form-item label="类型" prop="type" style="width: 90%">
        <el-select v-model="form.type" filterable placeholder="请选择类型">
          <el-option
          v-for="item in typeoptions"
          :key="item.value"
          :label="item.value"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目" prop="project" style="width: 90%">
        <el-input v-model="form.project" placeholder="请输入项目"></el-input>
      </el-form-item>
      <el-form-item label="简述" prop="describe" style="width: 90%">
        <el-input type="textarea" autosize v-model="form.describe" placeholder="请输入简述"></el-input>
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
export default {
  name: 'position',
  components: { VDistpicker },
  data() {
    return {
      downloadExcelLoading: false,
      // 单位树的宽度
      sidewidth: 25,
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
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        project: [
          { required: true, message: '请输入项目', trigger: 'blur' },
        ],
        describe: [
          { required: true, message: '请输入简述', trigger: 'blur' },
        ],
      },
      // select 选择器字段
      typeoptions: this.$val.typeoptions,
      // table字段
      zsstatustable: this.$val.zsstatustable,
      // 原始样例数据
      tableData: null,
      // 统一查询编码
      code: '',
      // 查询字段
      serchParam: {
        type: '',
        project: '',
        campname: '',
      },
      // 筛选过滤用
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      // Tree data
      treedata: [{
        id: '00',
        class: 1,
        label: '部队',
        children: [],
      }],
    };
  },
  created() {
    this.form = {
      id: '',
      campcode: '',
      type: '',
      project: '',
      describe: '',
      campname: '',
      isdel: '',
    };
    // 初始化单位营区树
    this.initTree();
  },
  watch: {
    // 过滤单位树文本
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 初始化和更新tree
    initTree() {
      this.treedata = [{
        id: '00',
        class: 1,
        label: '部队',
        children: [],
      }];
      let campres;
      const rowSQL1 = 'SELECT campcode,campname,departmentcode FROM camp WHERE isdel = 0';
      const rowSQL2 = 'SELECT departmentcode,departmentname,class FROM department WHERE isdel = 0';
      this.$db.all(rowSQL1, (err, res1) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '营区树加载失败',
            desc: err,
          });
        } else {
          campres = res1;
        }
      });
      this.$db.all(rowSQL2, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '单位树加载失败',
            desc: err,
          });
        } else {
          // 三级单位与三级营区
          const temp3 = [];
          // 三级单位与下属营区的挂钩
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '4') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              for (let j = 0; j < campres.length; j++) {
                if (campres[j].departmentcode === res[i].departmentcode) {
                  const campChild = { id: campres[j].campcode, class: '5', label: campres[j].campname };
                  newChild.children.push(campChild);
                }
              }
              temp3.push(newChild);
            }
          }
          // 建立一级和二级单位字典库
          const temp2 = [];
          const temp1 = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].class === '3') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              temp2.push(newChild);
            }
            if (res[i].class === '2') {
              const newChild = { id: res[i].departmentcode, class: res[i].class, label: res[i].departmentname, children: [] };
              temp1.push(newChild);
            }
          }
          // 二级单位与三级单位挂钩
          for (let i = 0; i < temp2.length; i++) {
            for (let j = 0; j < temp3.length; j++) {
              const tempflag = temp3[j].id.substring(0, temp3[j].id.lastIndexOf('-'));
              if (tempflag === temp2[i].id) {
                temp2[i].children.push(temp3[j]);
              }
            }
          }
          // 二级单位与下属营区挂钩
          for (let i = 0; i < temp2.length; i++) {
            for (let j = 0; j < campres.length; j++) {
              const tempflag = campres[j].departmentcode;
              if (tempflag === temp2[i].id) {
                const newChild = { id: campres[j].campcode, class: '5', label: campres[j].campname };
                temp2[i].children.push(newChild);
              }
            }
          }
          // 一级单位与二级单位挂钩
          for (let i = 0; i < temp1.length; i++) {
            for (let j = 0; j < temp2.length; j++) {
              const tempflag = temp2[j].id.substring(0, temp2[j].id.lastIndexOf('-'));
              if (tempflag === temp1[i].id) {
                temp1[i].children.push(temp2[j]);
              }
            }
          }
          // 一级单位与下属营区挂钩
          for (let i = 0; i < temp1.length; i++) {
            for (let j = 0; j < campres.length; j++) {
              const tempflag = campres[j].departmentcode;
              if (tempflag === temp1[i].id) {
                const newChild = { id: campres[j].campcode, class: '5', label: campres[j].campname };
                temp1[i].children.push(newChild);
              }
            }
          }
          // 一级单位与部队挂钩
          for (let i = 0; i < temp1.length; i++) {
            this.treedata[0].children.push(temp1[i]);
          }
        }
      });
    },
    // 添加阵地
    append(data) {
      // 获取营区编码
      this.code = data.id;
      this.Add();
    },
    // 获取当前选中node的数据
    getCurrentNodeclick(data) {
      this.serchParam = {
        type: '',
        project: '',
        campname: '',
      };
      this.code = data.id;
      this.getDataList(data.id);
      this.$logger(data.id);
    },
    // 执行查询操作
    getDataList(code) {
      // 主查询语句
      let whereSQL = '';
      const pageSQL = `LIMIT ${this.size} OFFSET ${(this.page - 1) * this.size} `;
      const selectSQL = `SELECT
        zsstatus.id,
        zsstatus.campcode,
        zsstatus.type,
        zsstatus.project,
        zsstatus.describe,
        camp.campname
        FROM zsstatus LEFT OUTER JOIN camp ON 
        zsstatus.campcode = camp.campcode `;
        // 查询数量
      const whereSQL1 = `WHERE zsstatus.campcode LIKE '%${code}%' `;
      const whereSQL2 = `AND zsstatus.type LIKE '%${this.serchParam.type}%' `;
      const whereSQL3 = `AND zsstatus.project LIKE '%${this.serchParam.project}%' `;
      const whereSQL4 = `AND camp.campname LIKE '%${this.serchParam.campname}%' `;
      const whereSQL5 = 'AND zsstatus.isdel = 0 ';
      const countSQL = `SELECT COUNT(zsstatus.id) AS total FROM zsstatus LEFT OUTER JOIN camp ON 
      zsstatus.campcode = camp.campcode ` + whereSQL1 + whereSQL2 + whereSQL3 + whereSQL4 + whereSQL5 + pageSQL;
      // 如果查询参数为空，则默认查询所有数据
      if (this.serchParam.campname === '' && this.serchParam.type === '' && this.serchParam.project === '') {
        whereSQL = selectSQL + whereSQL1 + whereSQL5 + pageSQL;
      } else {
        whereSQL = selectSQL + whereSQL1 + whereSQL2 + whereSQL3 + whereSQL4 + whereSQL5 + pageSQL;
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
            formParam.id = this.generateCode(this.code);
            formParam.campcode = this.code;
            const SQL = `SELECT COUNT(id) AS totalCount from zsstatus WHERE id = '${formParam.id}'`;
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
                  const SQL = `INSERT INTO zsstatus (
                    id,
                    campcode,
                    type,
                    project,
                    describe,
                    isdel)
            VALUES ('${formParam.id}','${formParam.campcode}','${formParam.type}','${formParam.project}','${formParam.describe}','0')`;
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
                      this.getDataList(this.code);
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
            const SQL = `SELECT id from zsstatus WHERE id = '${formParam.id}'`;
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
                  const SQL = `UPDATE zsstatus SET
          campcode='${formParam.campcode}'
          ,type='${formParam.type}'
          ,project='${formParam.project}'
          ,describe='${formParam.describe}'
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
      this.title = '添加专业机构及设施设备信息';
      this.form = {
        id: '',
        campcode: '',
        type: '',
        project: '',
        describe: '',
        campname: '',
        isdel: '',
      };
      this.choose = true;
      this.dialogFormVisible = true;
    },
    // Table 修改函数
    editClick(row) {
      this.choose = false;
      this.title = '修改专业机构及设施设备信息';
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
      this.$confirm('是否删除该专业机构及设施设备信息？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 执行删除操作
        this.$db.serialize(() => {
          this.$db.run('BEGIN');
          const deleteSQL = `UPDATE zsstatus SET isdel='1' WHERE id = '${row.id}'`;
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
    // 生成随机四位编码
    getrandom() {
      const data = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
      let nums = '';
      for (let j = 0; j < 4; j++) {
        const r = parseInt(Math.random() * 61);
        nums += data[r];
      }
      return nums;
    },
    // 单位生成编码
    generateCode(code) {
      return code + '-' + this.getrandom();
    },
    // 导出excel
    loadExcell() {
      if (this.tableData === null) {
        this.$message({
          message: '导出失败，请先选择单位-营区！',
          type: 'error',
        });
        return false;
      }
      const data = [
        [ '序号', '营区名称', '类型', '项目', '简述' ],
      ];
      let i = 1;
      for (const item of this.tableData) {
        data.push([
          i,
          item.campname,
          item.type,
          item.project,
          item.describe,
        ]);
        i++;
      }
      const name = '专业机构及设施设备信息';
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

