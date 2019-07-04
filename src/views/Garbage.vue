<template>
  <div class="garbage-container">
    <base-table 
      :fieldData="fieldData" 
      :tableData="tableData" 
      :searchContent="searchContent" 
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      :loading="loading"
      collection="garbage"
      :submitDataTmpelate="submitDataTmpelate"
      @searchHandle="searchHandle"
      @getFilter="getFilter"
      @changePage="changePage">
    </base-table>
  </div>
</template>

<script>
  import BaseTable from '@/components/BaseTable'
  const {garbageType} = require('../const')
  export default {
    name: 'garbage',
    data() {
      return {
        fieldData: ['name', 'type', 'descr', 'similar', 'feature', 'verify', 'image'],
        tableData: [],
        condition: {},
        searchContent: [],
        pageNum: 1,
        pageSize: 30,
        total: 0,
        loading: false,
        submitDataTmpelate: {
          name: '',
          type: 0,
          descr: '',
          similar: '',
          feature: '',
          verify: 0,
          image: '',
          date: new Date()
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        this.$http.post('api/garbage/getGarbage', {
          data: {
            condition: this.condition,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.loading = false
          const result = res.data
          if (result.errcode === 0) {
            result.data.forEach((item, index) => {
              let data = JSON.parse(item)
              result.data.splice(index, 1, data)
            })
            this.tableData = result.data
            this.total = result.total
          }
        })
      },
      searchHandle(keyWord) {
        if (keyWord === '') {
          this.searchContent = []
          this.condition = {}
          this.getData()
          return
        }
        this.$http.post('api/search/searchGarbage', {
          data: {
            keyWord
          }
        }).then(res => {
          const result = res.data
          if (result.code === 200) {
            this.searchContent = result.message.searchContent
          }
        })
      },
      getFilter(condition) {
        this.pageNum = 1
        this.condition = condition
        if (!condition.searchFlag) {
          this.searchContent = []
        }
        delete this.condition.searchFlag
        this.getData()
      },
      changePage(pageNum) {
        this.pageNum = pageNum
        this.getData()
      }
    },
    components: {
      BaseTable
    }
  }
</script>

<style lang="scss">

</style>
