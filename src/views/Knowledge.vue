<template>
  <div class="garbage-container" v-loading.fullscreen.lock="loading">
    <div class="knowledge-wrapper" v-for="(item, i) in tableData" :key="i">
      <template v-for="(field, j) in fieldData">
        <el-form :key="j" label-position="right" label-width="80px" size="mini">
          <el-form-item :label="field" :prop="field">
            <el-input v-show="field === 'descr' && !item.edit" type="textarea" v-model="item[field]" v-html="item[field]" :readonly="!item.edit"></el-input>
            <el-input v-show="field !== 'descr'" v-model="item[field]" :readonly="!item.edit"></el-input>
            <el-input v-show="field === 'descr' && item.edit" type="textarea" rows="20" v-model="item[field]" :readonly="!item.edit"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <div class="knowledge-contrl">
        <el-button v-show="!item.edit" type="primary" size="mini" @click="editHandle(item, i)">编 辑</el-button>
        <el-button v-show="item.edit && !item.add" size="mini" @click="backHandle(item, i)">返 回</el-button>
        <el-button v-show="item.edit" type="primary" size="mini" @click="subHandle(item, i)">提 交</el-button>
        <el-button v-show="item.edit" type="danger" size="mini" @click="delHandle(item, i)">删 除</el-button>
      </div>
    </div>
    <div class="knowledge-add">
      <el-button type="primary" v-show="!loading" size="mini" @click="addHandle">新 增</el-button>
    </div>
  </div>
</template>


<script>
  import BaseTable from '@/components/BaseTable'
  export default {
    name: 'garbage',
    data() {
      return {
        fieldData: ['title', 'answer', 'summary', 'descr', 'image'],
        tableData: [],
        pageNum: 1,
        pageSize: 30,
        total: 0,
        loading: false,
        copyData: {}
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        this.$http.post('api/knowledge/getKnowledge', {
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.loading = false
          const result = res.data
          if (result.errcode === 0) {
            result.data.forEach((item, index) => {
              let data = JSON.parse(item)
              data.edit = false
              result.data.splice(index, 1, data)
            })
            this.tableData = result.data
            this.total = result.total
          }
        })
      },
      changePage(pageNum) {
        this.pageNum = pageNum
        this.getData()
      },
      editHandle(item, i) {
        this.copyData[item._id] = JSON.parse(JSON.stringify(item))
        item.edit = true
        this.tableData.splice(i, 1, item)
      },
      delHandle(item, i) {
        if (item.add) {
          this.tableData.splice(i, 1)
        } else {
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
            this.$http.post('api/cloud/editData', {
              data: {
                data: item,
                editType: 'del',
                collection: 'knowledge'
              }
            }).then(res => {
              this.loading = false
              if (res.data.errcode === 0) {
                this.tableData.splice(i, 1)
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: result.message,
                  type: 'error'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })         
          })
        }
      },
      backHandle(item, i) {
        this.tableData.splice(i, 1, JSON.parse(JSON.stringify(this.copyData[item._id])))
      },
      addHandle() {
        this.tableData.push({
          title: '',
          answer: '',
          summary: '',
          descr: '',
          image: '',
          edit: true,
          add: true
        })
      },
      subHandle(item, i) {
        if (item.title === '') {
          this.$message({
            message: '请填写title',
            type: 'error'
          })
          return false
        }
        this.loading = true
        this.$http.post('api/cloud/editData', {
          data: {
            data: item,
            editType: item.add ? 'add' : 'upd',
            collection: 'knowledge'
          }
        }).then(res => {
          this.loading = false
          const result = res.data
          if (result.errcode === 0) {
            item.add ? item._id = result.id_list[0] : false
            item.edit = false
            delete item.add
            this.tableData.splice(i, 1, item)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: result.message,
              type: 'error'
            })
          }
        })
      }
    },
    components: {
      BaseTable
    }
  }
</script>

<style lang="scss">
  .knowledge-wrapper {
    border-bottom: 1px solid #26f10b;
    margin-bottom: 15px;
  }
  .knowledge-content {
    margin: 0;
  }
  p, h1, h2, h3, div {
    margin: 0;
    text-align: left;
  }

  .knowledge-contrl {
    text-align: right;
    margin-bottom: 10px;
  }

  .knowledge-add button {
    width: 100%;
  }
</style>
