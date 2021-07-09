<template>
  <div class="login">
    <div class="login-box">
      <!-- avatar -->
      <div class="avatar">
        <img src="~assets/img/logo.png"
             alt="">
      </div>
      <!-- 登录区 -->
      <el-form label-width="0px"
               class="login-form"
               :model="loginForm"
               :rules="loginFormRules"
               ref="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user"
                    v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima"
                    v-model="loginForm.password"
                    type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登录</el-button>
          <el-button type="info"
                     @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //登录表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' },
        { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    reset () {   //点击重置登录表单
      // console.log(this);
      this.$refs.loginForm.resetFields()
    },
    login () {
      this.$refs.loginForm.validate(async valid => {
        // console.log(valid);
        if (!valid) return;
        //post方法返回一个Promise对象 使用async 函数
        //async表示该函数中有异步操作 await表示后面表达式需要等待结果
        //使用对象解构 并起别名，此时获得的data数据干净
        const { data: res } = await this.$http.post("login", this.loginForm);
        //通过res.meta.status状态码判断请求
        console.log(res);

        if (res.meta.status !== 200) {
          return this.$message.error("登陆失败！");
        }
        this.$message({
          message: "登录成功！",
          type: "success"
        });
        //1，将登录成功后服务器派发给我们的token保存到客户端的sessionStorage中
        //1.1 项目中除了登录之外的其他api接口，必须在登录之后才能访问
        //1.2 token只应该在当前网站打开期间生效，所以保存到sessionStorage
        //2，通过代码进行路由跳转
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      })
    }
  }
}

</script>

<style lang="less" scoped>
.login {
  background-color: #2b4b6b;
  height: 100vh;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 12px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
