<template>
    <div class="login_container">
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
        <div class="login_box">
            <!--头像区域-->
            <div class="avatar_box">
                <img src="../assets/imgs/1.png" alt="">
            </div>
            <!--登录表单区域-->
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
                  <el-button type="primary" @click="login">登录</el-button>
                  <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
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
  methods: {
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
    // 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 表单验证
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        const WhereSQL = ` select * from user where username = '${this.loginForm.username}'`;
        this.$logger(WhereSQL);
        this.$db.all(WhereSQL, (err, res) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '搜索失败',
              desc: err,
            });
          } else {
            if (res[0] === undefined) {
              this.$message({ message: '该用户不存在，请重新输入！', type: 'warning' });
            } else {
              if (res[0].password === this.loginForm.password) {
                this.$message({ message: '登录成功', type: 'success' });
                this.$router.push('/loginPageVisual');
              } else {
                this.$message({ message: '用户名或密码错误，请重新输入！', type: 'warning' });
                this.$refs.loginFormRef.resetFields();
              }
            }
          }
        });
      });
    },
  },
};
</script>

<!--统一背景颜色-->
<!--333744-->
<style lang="less" scoped>
.login_container {
  background-color: #373d41;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    -webkit-app-region: drag;
    align-items: center;
    color: rgb(255, 255, 255);
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
          color: #fff;
          margin-right: 10px;
        }
    }
}
    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        top: 50%;
        transform:translate(-50%,-50%) ;

        .avatar_box{
            height: 150px;
            width: 150px;
            border: 1px solid #eee ;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                /*background-color: #eee ;*/
            }
        }
    }
    .btns{
        display: flex;
        justify-content: center;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 25px;
        box-sizing: border-box;
    }
    .closefun{
        position: absolute;
        right: 15px;
        top: 15px;
    }
    // 拖动样式
    body,html {
        -webkit-app-region: drag;
    }
    .button-sound {
        -webkit-app-region: no-drag;
    }

</style>
