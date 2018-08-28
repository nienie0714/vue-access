<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="title">Nova在线升级系统</div>
          </el-col>
          <el-col :span="12">
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" background-color='#2b2b2b' text-color='#fff' active-text-color='#ffd04b'>
              <el-menu-item index="1">视频控制器</el-menu-item>
              <el-submenu index="2">
                <template slot="title">同步控制器</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title">Vnnox</template>
                  <el-menu-item index="2-4-1">选项1</el-menu-item>
                  <el-menu-item index="2-4-2">选项2</el-menu-item>
                  <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="3">Vnnox</el-menu-item>
              <el-menu-item index="4">iCare</el-menu-item>
              <el-menu-item index="5">V-can</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6" class="user">
            <div class="user-avator"><img src="static/img/logo.jpg"></div>
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                  {{username}} <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <a href='#'>
                  <el-dropdown-item>下载记录</el-dropdown-item>
                </a>
                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
  import ElementUI from 'element-ui';
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    computed: {
      username() {
        let username = localStorage.getItem('v_username');
        return username ? username : this.name;
      }
    },
    methods: {
      // 导航栏index
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if(command == 'loginout') {
          localStorage.removeItem('v_username')
          this.$router.push('/login');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .el-container {
    width: 100%;
    .el-header {
      position: absolute;
      background-color: #2b2b2b;
      width: 100%;
      z-index: 2;
      left: 0;
      top: 0;
      .title {
        color: #fff;
        line-height: 60px;
        font-size: 28px;
      }
      .user {
        align-items: center;
        .user-avator {
          display: inline-block;
          margin-right: 20px;
          img {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .user-name {
        }
      }
    }
    .el-main {
      width: 100%;
    }
    .el-footer {
      position: absolute;
      width: 100%;
      z-index: 2;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      text-align: center;
      line-height: 60px;
    }
  }
</style>
