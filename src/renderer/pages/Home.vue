<template>
        <el-container class="home-container">
            <!-- 头部区域 -->
            <el-header>
                <div>
                    <img src="../assets/find.png" alt="">
                    <span>数据可视化系统</span>
                </div>
                <section>
                  <a href="javascript:void(0)" @click="minWindows">
                    <Icon size="14" type="minus-round"></Icon>
                  </a>
                  <a href="javascript:void(0)" @click="maxWindows">
                    <Icon size="14" type="arrow-resize"></Icon>
                  </a>
                  <a href="javascript:void(0)" @click="closeWindows">
                    <Icon size="14" type="close"></Icon>
                  </a>
                </section>
            </el-header>
            <!-- 页面主体区域 -->
            <el-container>
                <!-- 侧边栏区域 -->
                <el-aside :width="iscollapse ? '64px' : '240px' ">
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
                    <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409eff"
                    unique-opened
                    :collapse="iscollapse"
                    :collapse-transition="false"
                    router
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu v-for="item in menuList" :key="item.name" :index="item.name+''">
                      <!-- 一级菜单模板区 -->
                      <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                      </template>
                      <!-- 二级菜单模板区 -->
                      <el-menu-item :index="subitem.path" v-for="subitem in item.children" :key="subitem.name" @click="saveNavState(subitem.path, subitem.name, item.name)">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <!-- <i :class="item.icon"></i> -->
                          <span>{{ subitem.name }}</span>
                        </template>
                      </el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-aside>
                <!-- 右侧内容主体 -->
                <el-main>
                  <!-- 面包屑导航 -->
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item >数据可视化系统</el-breadcrumb-item>
                    <el-breadcrumb-item v-text="sunmenuname+' - '"></el-breadcrumb-item>
                    <el-breadcrumb-item v-text="sunmenuitemname"></el-breadcrumb-item>
                    <el-button
                      class="test"
                      type="text"
                      size="mini"
                      @click="changepasswordbtn()">
                      修改密码
                    </el-button>
                    <el-button
                      class="test"
                      type="text"
                      size="mini"
                      @click="quit()">
                      退出登录
                    </el-button>
                  </el-breadcrumb>
                  <!-- 卡片视图 -->
                  <el-card>
                    <!-- 路由占位符 -->
                    <router-view></router-view>
                  </el-card>
                </el-main>
            </el-container>
            <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
              <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
                </el-form-item>
                <!--按钮区域-->
                <el-form-item class="btns">
                  <el-button type="primary" @click="changepassword">确定</el-button>
                  <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
            </el-dialog>
        </el-container>
</template>
<script>
export default {
  data() {
    return {
      title: '修改账户密码',
      iscollapse: true,
      // 激活状态存储 变量
      activePath: '',
      // 面包屑变量
      sunmenuname: '',
      sunmenuitemname: '',
      menuList: [
        // {
        //   name: '实体信息',
        //   icon: 'el-icon-menu',
        //   path: '',
        //   children: [
        //     { name: '单位', path: '/1department' , icon: 'el-icon-office-building'},
        //     { name: '营区/阵地', path: '/2camp' , icon: 'el-icon-school'},
        //     { name: '人员', path: '/3people' ,icon: 'el-icon-user'},
        //     { name: '保障机构', path: '/10baozhangjigou' ,icon: 'el-icon-s-home'},
        //     { name: '保障单元', path: '/11baozhangdanyuan' ,icon: 'el-icon-s-home'},
        //     { name: '联勤保障力量', path: '/9associatehelp' ,icon: 'el-icon-s-home'},
        //     { name: '社会化保障力量', path: '/7socityhelp' ,icon: 'el-icon-s-home'},
        //     { name: '战备物资', path: '/15zhanbeiwuzi' ,icon: 'el-icon-s-home'},
        //     { name: '装备资产', path: '/6zhuangbei' ,icon: 'el-icon-s-home'},
        //     { name: '设备器材', path: '/5equipment' ,icon: 'el-icon-s-home'},
        //     { name: '国防工程', path: '/14guofanggongcheng' ,icon: 'el-icon-s-home'},
        //     { name: '关键保障设施', path: '/16guanjiansheshi' ,icon: 'el-icon-s-home'},
        //     { name: '房地产资源', path: '/4house' ,icon: 'el-icon-s-home'},
        //   ],
        // },
        // {
        //   name:'关系维护',
        //   icon:'el-icon-s-marketing',
        //   path:'',
        //   children:[
        //     {name:'关系维护',path:'/relationManager',icon:'el-icon-user'},
        //     {name:'定制化表格导出',path:'/exportexcel',icon:'el-icon-user'},
        //   ]
        // },
        {
          name:'可视化分析',
          icon:'el-icon-s-marketing',
          path:'',
          children:[
            {name:'EXCEL数据可视化',path:'/weaponVisual'},
            {name:'人员信息可视化',path:'/peopleVisual',icon:'el-icon-user'},
            // {name:'单位营区可视化',path:'/campVisual'},
            
            {name:'系统信息可视化',path:'/loginPageVisual'},
            {name:'更新与维护',path:'/welcome'}
          ]
        }
        // {
        //   name: '营区实力信息',
        //   icon: 'el-icon-s-data',
        //   path: '',
        //   children: [
        //     { name: '后勤人员情况', path: '/peoplecondition' },
        //     { name: '资源情况', path: '/equipmentcondition' },
        //     { name: '机构及设施情况', path: '/zsstatus' },
        //     { name: '地区联勤机构及力量', path: '/associatehelp' },
        //     // { name: '国防动员力量', path: '/countryhelp' },
        //     { name: '营区保障社会化情况', path: '/societyhelp' },
        //     { name: '周边可用支援力量情况', path: '/aroundhelp' },
        //   ],
        // },
        // {
        //   name: '阵地实力信息',
        //   icon: 'el-icon-s-flag',
        //   path: '',
        //   children: [
        //     { name: '资源情况', path: '/equipmentconditioninfo' },
        //     { name: '保障社会化情况', path: '/societyinfo' },
        //     { name: '周边可用支援力量情况', path: '/aroundinfo' },
        //   ],
        // },
        // {
        //   name: '保障编组信息',
        //   icon: 'el-icon-s-custom',
        //   path: '',
        //   children: [
        //     { name: '保障编组情况', path: '/backupgroup' },
        //     { name: '保障小队情况', path: '/minibackupgroup' },
        //   ],
        // },
        // {
        //   name: '数据共享',
        //   icon: 'el-icon-s-cooperation',
        //   path: '',
        //   children: [
        //     { name: '数据导入导出', path: '/import' },
        //     // { name: '保障小队情况', path: '/minibackupgroup' },
        //   ],
        // },
        // {
        //   name: 'Test',
        //   icon: 'el-icon-s-flag',
        //   path: '',
        //   children: [
        //     // { name: 'test1', path: '/detailList' },
        //     // { name: 'test2', path: '/goods' },
        //     { name: 'echart', path: '/echart' },
        //   ],
        // },
      ],
      // 登录表单的数据绑定对象
      dialogFormVisible: false,
      loginForm: {
        username: '',
        password: '',
      },
      // 表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', transform: value => value, trigger: 'blur' },
          {
            type: 'string',
            message: '请输入不包含空格的字符',
            trigger: 'blur',
            transform(value) {
              if (value && value.indexOf(' ') === -1) {
                return value;
              }
            },
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/;
              if (!passwordreg.test(value)) {
                callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'));
              } else {
                callback();
              }
            } },
        ],
      },
    };
  },
  components: {
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    // 点击按钮 切换菜单的折叠与展开
    toggleCollapse() {
      this.iscollapse = !this.iscollapse;
    },

    saveNavState(activePath, sunmenuitemname, sunmenuname) {
      window.sessionStorage.setItem('activePath', activePath);
      this.activePath = activePath;
      this.sunmenuitemname = sunmenuitemname;
      this.sunmenuname = sunmenuname;
    },
    // 系统功能
    minWindows() {
      this.$electron.ipcRenderer.send('min-window');
    },
    maxWindows() {
      this.$electron.ipcRenderer.send('max-window');
    },
    closeWindows() {
      this.$electron.ipcRenderer.send('close-window');
      this.$db.close();
    },
    quit() {
      this.$router.push('/login');
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    changepasswordbtn() {
      this.dialogFormVisible = true;
    },
    changepassword() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        const WhereSQL = `UPDATE user SET username =  '${this.loginForm.username}', password = '${this.loginForm.password}' WHERE id = 'sdfg'`;
        this.$logger(WhereSQL);
        this.$db.all(WhereSQL, err => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '修改失败',
              desc: err,
            });
          } else {
            this.$message({ message: '修改成功请重新登录!', type: 'success' });
            this.$router.push('/login');
          }
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    -webkit-app-region: drag;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .header-style {
    > div {
      display: flex;
      align-items: center;
      span {
          margin-left: 20px;
          margin-bottom: 10px;
        };
      }
    }
    section {
      float: right;
      a {
          -webkit-app-region: no-drag;
          color: #409eff;
          margin-right: 10px;
        }
    }
}
.el-aside{
    background-color: #333744;
}
.el-main{
    background-color: #eaedf1;
    color: rgb(63, 63, 63);
    .test {
      float: right;
    }
}
.el-menu {
  border-right: none;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 16px;

}
//     @import "../assets/less/global.less";

//     .home-background {
//         position: relative;
//         background-color: @bg-color;
//         .header {
//             position: absolute;
//             top: 0;
//             left: @view-left;
//             right: 0;
//             height: @view-top;
//             line-height: @view-top;
//         }
//         .aside {
//             position: absolute;
//             top: 0;
//             bottom: 0;
//             left: 0;
//             width: @view-left;
//         }
//         .container {
//             position: absolute;
//             top: @view-top;
//             right: 0;
//             left: @view-left;
//             bottom: 0;
//             overflow: auto;
//             padding: @view-padding;
//         }
//     }
</style>
