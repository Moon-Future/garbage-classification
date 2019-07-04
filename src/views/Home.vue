<template>
  <div class="home" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="menu-container">
      <nav-menu></nav-menu>
    </div>
    <div class="table-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import BaseTable from '@/components/BaseTable'

export default {
  name: 'home',
  data() {
    return {
      fullscreenLoading: false
    }
  },
  created() {
    this.getSession()
  },
  methods: {
    getSession() {
      this.fullscreenLoading = true
      this.$http.post('api/user/getSession').then(res => {
        const result = res.data
        if (result.code !== 200) {
          this.$router.push({path: '/login'})
        } else {
          this.fullscreenLoading = false
        }
      })
    }
  },
  components: {
    NavMenu,
    BaseTable
  }
}
</script>

<style lang="scss" scoped>
  .menu-container {
    position: fixed;
    width: 200px;
    top: 0;
    bottom: 0;
    left: 0;
  }

  .table-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 200px;
    right: 0;
    overflow: auto;
    padding: 10px;
  }
</style>

