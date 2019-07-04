<template>
  <div class="navmenu-container">
    <el-menu
      :default-active="active"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="select">
      <el-menu-item index="garbage">
        <i class="el-icon-delete"></i>
        <span slot="title">Garbage</span>
      </el-menu-item>
      <el-menu-item index="search">
        <i class="el-icon-search"></i>
        <span slot="title">HotSearch</span>
      </el-menu-item>
      <el-menu-item index="knowledge">
        <i class="el-icon-document"></i>
        <span slot="title">Knowledge</span>
      </el-menu-item>
      <el-menu-item index="logout">
        <i class="el-icon-user"></i>
        <span slot="title">退出</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {
        active: 'garbage'
      }
    },
    created() {
      this.active = this.$route.name
    },
    methods: {
      select(index) {
        if (index === 'logout') {
          this.$http.post('api/user/logout').then(res => {
            const result = res.data
            if (result.code === 200) {
              this.$router.push({path: '/login'})
            } else {
              this.$message({
                message: result.message,
                type: 'error'
              })
            }
          })
        } else {
          this.$router.push({path: `/${index}`})
        }
      }
    },
    watch: {
      $route() {
        this.active = this.$route.name
      }
    }
  }
</script>


<style lang="scss">
  .navmenu-container {
    height: 100%;
  }
  .el-menu-vertical {
    height: 100%;
    text-align: left;
  }
  .logout-btn {
    position: absolute;
    top: 300px;
    left: 0;
  }
</style>

