<template>
  <div class="login-container">
    <el-form :model="form" label-position="left" label-width="50px" size="small">
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="login-btn" type="primary" size="mini" @click="login">登陆</el-button>
  </div>
</template>

<script>
  const crypto = require('crypto')
  export default {
    data() {
      return {
        form: {
          account: '',
          password: ''
        },
      }
    },
    created() {
      this.getSession()
    },
    methods: {
      login() {
        if (this.subWait) {
          return
        }
        if (this.form.account === '' || this.form.password === '') {
          this.$message({type: 'error', message: '请输入用户和密码'})
          return
        }
        this.$http.post('api/user/login', {
          data: this.form
        }).then(res => {
          const result = res.data
          if (result.code === 200) {
            this.$router.push({path: '/garbage'})
          } else {
            this.$message({
              message: result.message,
              type: 'error'
            })
          }
        })
      },
      getSession() {
        this.$http.post('api/user/getSession').then(res => {
          const result = res.data
          if (result.code === 200) {
            this.$router.push({path: '/garbage'})
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .login-btn {
    width: 200px;
  }
</style>
