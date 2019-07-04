<template>
  <div class="garbage-container">
    <base-table 
      :fieldData="fieldData" 
      :tableData="tableData" 
      :searchFlag="false"
      :total="total"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :loading="loading"
      collection="hot-search"
      :submitDataTmpelate="submitDataTmpelate"
      @changePage="changePage">
    </base-table>
  </div>
</template>


<script>
  import BaseTable from '@/components/BaseTable'
  export default {
    name: 'garbage',
    data() {
      return {
        fieldData: ['name', 'count', 'verify'],
        tableData: [],
        pageNum: 1,
        pageSize: 30,
        total: 0,
        loading: false,
        submitDataTmpelate: {
          name: '',
          count: 0,
          verify: 0
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        this.$http.post('api/search/getHotSearch', {
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.loading = false
          const result = res.data
          if (result.errcode === 0) {
            result.data.forEach((item, index) => {
              result.data.splice(index, 1, JSON.parse(item))
            })
            this.tableData = result.data
            this.total = result.total
          }
        })
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
