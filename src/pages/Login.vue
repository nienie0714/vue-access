<template>
  <div class="login-wrap">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <div class="login-btn">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import ElementUI from 'element-ui';

  export default {
    data: function() {
      return {
        ruleForm: {
          username: 'admin',
          password: '123123'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      // this.getUser();
    },
    methods: {
      ...mapActions(['ajax']),
      getUser() {
        let req = this.ajax({
          name: 'getUser',
          method: 'get'
        });
        req.then(res => {
          console.log('user success', res);
        })
          .catch(err => {
            ElementUI.Message('a');
            console.log('user catch', err);
          });
      },
      postLoginForm(ruleForm) {
        let req = this.ajax({
          name: 'postLoginForm',
          data: this.ruleForm
        });
        console.log(1111, req);
        req.then(res => {
          console.log('postLoginForm success', res);
        })
          .catch(err => {
            ElementUI.Message('失败');
            console.log('postLoginForm catch', err);
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            localStorage.setItem('v_username', this.ruleForm.username);
            this.postLoginForm(formName);
            this.$router.push('/');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>