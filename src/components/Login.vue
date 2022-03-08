<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单 -->
         <h1 style="position:relative;color: #fff;left: 50%;transform: translateX(-50%); top: -40px;">操作系统接口集及兼容性检测系统</h1>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="60px"
          class="login_form"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              prefix-icon="iconfont icon-3702mima"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" class="el-icon-mobile-phone" @click="login">登录</el-button>
            <el-button type="info" class="el-icon-refresh" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>   
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单重置按钮
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单预验证
      // valid：bool类型
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
         const { data: res } = await this.$http.post('doLogin/', {params:this.loginForm})
       if (res.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('user', this.loginForm.username)
        // window.sessionStorage.setItem('token', 112344)
        // window.sessionStorage.setItem('user', this.loginForm.username)

        this.$router.push('/home')
      })
    }
  }
}
</script>

<style Lang="less" scoped>
.login_container {
  background-color: #2D3A4B;
  height: 100%;
}
.login_box {
  position: absolute;
  top:40%;
  left:50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: relative;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0px auto;
  width: 370px;
  padding: 60px 35px 20px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.info {
  font-size: 13px;
  margin: 10px 15px;
}
</style>
