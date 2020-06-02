<template>
  <div class="login_box">
    <div class="login_form">
      <h1 style="text-align:center">
        Wills 博客登录
      </h1>
      <el-form
        class="login_input"
        ref="form"
        :model="login"
        label-width="60px"
      >
        <el-form-item label="用户名">
          <el-input
            :size="inputSize"
            v-model="login.userName"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            show-password
            :size="inputSize"
            v-model="login.password"
          />
        </el-form-item>
        <el-form-item label="验证码">
          <div id="authCode" />
        </el-form-item>
        <el-form-item class="marginCenter">
          <el-button
            type="primary"
            @click="loginOption"
          >
            登陆
          </el-button>
          <el-button @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputSize: 'samll',
      token: '',
      login: {
        userName: '',
        password: ''
      }
    }
  },
  created () {},
  mounted () {
    const that = this
    _dx.Captcha(document.getElementById('authCode'), {
      appId: '70ff989b1432edb9cdae844cfb0fbec1', // appId，在控制台中“应用管理”或“应用配置”模块获取
      style: 'oneclick',
      success: function (token) {
        that.token = token
      }
    })
  },
  methods: {
    async loginOption () {
      const { data: res } = await this.$http.post(
        '/wills/user/login/' + this.token,
        { userName: this.login.userName, password: this.login.password }
      )
      localStorage.setItem('token', res.data)
      // console.log(res)
      if (res.statusCode === 200) {
        this.$router.push('/background')
      } else {
        this.$notify.error('对不起，您输入的用户名/密码错误！')
      }
    },
    reset () {
      this.login.userName = ''
      this.login.password = ''
      this.login.authCode = ''
    }
  }
}
</script>

<style lang="less">
.login_box {
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #ee7752, #e75b91, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 10s ease infinite;
  .login_form {
  border-radius: 10px;
  min-width: 400px;
    width: 35%;
    height: 35%;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    .login_input {
      margin-top: 20px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .marginCenter {
        text-align: center;
      }
    }
  }
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
