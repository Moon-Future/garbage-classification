<template>
  <div class="basedata-container" v-loading.fullscreen.lock="loading || selfLoading">
    <div class="search-container" v-if="searchFlag">
      <el-button type="primary" size="mini" @click="getAll">全部</el-button>
      <el-button type="danger" size="mini" @click="getVerify">审核中</el-button>
       <el-input v-model="keyWorld" clearable placeholder="请输入内容" size="mini" class="search-input" @keyup.enter.native="searchHandle">
        <el-button slot="append" icon="el-icon-search" size="mini" @click="searchHandle"></el-button>
      </el-input>
      <el-select v-model="type" clearable placeholder="请选择" size="mini" @change="changeType">
        <el-option
          v-for="item in garbageTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search-content" v-show="searchFlag">
        <template v-if="searchContent.length !== 0">
          <div v-for="(item, i) in searchContent" :key="i">
            <span @click="search(item.name)">{{ item.name }}</span>
          </div>
        </template>
    </div>
    <div class="el-table-container">
      <el-table
        :data="tableData"
        size="mini"
        border
        style="width: 100%">
        <template v-for="(item, index) in fieldData" v-key="index">
          <el-table-column
            :prop="item"
            :label="item"
            :key="index">
            <template slot-scope="scope">
              <img class="table-image" v-if="item === 'image'" :src="scope.row[item]" alt="">
              <span v-else-if="item === 'type'" :class="garbageType[scope.row[item]].class">{{ garbageType[scope.row[item]].name }}</span>
              <span v-else>{{ scope.row[item] }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editHandle(scope.row, scope.$index)">编辑</el-button>
            <el-button type="text" size="small" @click="delHandle(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-add">
        <el-button type="primary" v-show="!loading" size="mini" @click="addHandle">新 增</el-button>
      </div>

      <el-pagination
        v-show="!loading"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="changePage">
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="editFlag"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="70%">
      <template v-for="(field, i) in fieldData">
        <el-form :key="i" label-position="right" label-width="80px" size="mini">
          <el-form-item v-if="field !== 'type'" :label="field" :prop="field">
            <el-input v-model="submitData[field]"></el-input>
          </el-form-item>
          <el-form-item v-if="field === 'type'" :label="field">
            <el-select v-model="submitData[field]" placeholder="请选择" size="mini">
              <el-option
                v-for="item in garbageTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="field === 'image'" label="图片">
            <img class="table-image" :src="submitData[field]" alt="">
          </el-form-item>

          <el-form-item v-if="field === 'name'" label="地址">
            <span>https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/garbage/{{ encodeURIComponent(submitData.name) }}.jpg</span>
          </el-form-item>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFlag = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="subHandle" size="mini">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  const {garbageTypeList, garbageType} = require('../const')

  export default {
    name: 'baseTable',
    props: {
      searchFlag: {
        type: Boolean,
        default: true
      },
      fieldData: {
        type: Array,
        default() {
          return []
        }
      },
      tableData: {
        type: Array,
        default() {
          return []
        }
      },
      searchContent: {
        type: Array,
        default() {
          return []
        }
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 30
      },
      pageNum: {
        type: Number,
        default: 1
      },
      loading: {
        type: Boolean,
        default: false
      },
      submitDataTmpelate: {
        type: Object,
        default() {
          return {}
        }
      },
      collection: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        garbageTypeList,
        garbageType,
        type: '',
        keyWorld: '',
        editFlag: false,
        add: false,
        submitData: {},
        index: -1,
        selfLoading: false,
        verifyFlag: false
      }
    },
    methods: {
      searchHandle() {
        this.$emit('searchHandle', this.keyWorld)
      },
      search(name) {
        this.verifyFlag = false
        this.type = ''
        this.keyWorld = name
        this.$emit('getFilter', {name: this.keyWorld, searchFlag: true})
      },
      getAll() {
        this.verifyFlag = false
        this.keyWorld = ''
        this.type = ''
        this.$emit('getFilter', {})
      },
      getVerify() {
        this.verifyFlag = true
        this.keyWorld = ''
        this.type = ''
        this.$emit('getFilter', {verify: 0})
      },
      changeType(type) {
        this.verifyFlag = false
        this.keyWorld = ''
        if (type === '') {
          this.$emit('getFilter', {})
        } else {
          this.$emit('getFilter', {type: type})
        }
      },
      changePage(pageNum) {
        this.$emit('changePage', pageNum)
      },
      addHandle() {
        this.add = true
        this.editFlag = true
        this.submitData = JSON.parse(JSON.stringify(this.submitDataTmpelate))
      },
      editHandle(item, index) {
        this.index = index
        this.add = false
        this.editFlag = true
        this.submitData = JSON.parse(JSON.stringify(item))
      },
      delHandle(item, index) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selfLoading = true
          this.$http.post('api/cloud/editData', {
            data: {
              data: item,
              editType: 'del',
              collection: this.collection
            }
          }).then(res => {
            this.selfLoading = false
            if (res.data.errcode === 0) {
              this.tableData.splice(index, 1)
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
      },
      subHandle() {
        if (this.submitData.name === '') {
          this.$message({
            message: '请填写name',
            type: 'error'
          })
          return false
        }
        this.selfLoading = true
        this.submitData.verify = Number(this.submitData.verify === undefined ? 1 : this.submitData.verify)
        this.submitData.count = Number(this.submitData.count === undefined ? 0 : this.submitData.count)
        this.$http.post('api/cloud/editData', {
          data: {
            data: this.submitData,
            editType: this.add ? 'add' : 'upd',
            collection: this.collection
          }
        }).then(res => {
          this.selfLoading = false
          const result = res.data
          if (result.errcode === 0) {
            if (this.add) {
              this.getAll()
            } else {
              if (this.verifyFlag && this.submitData.verify !== 0) {
                this.tableData.splice(this.index, 1)
              } else {
                this.tableData.splice(this.index, 1, this.submitData)
              }
            }
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.editFlag = false
          } else {
            this.$message({
              message: result.message,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-container {
    display: flex;
    margin-bottom: 10px;

    .search-input {
      margin: 0 10px;
      width: 300px;
    }
  }

  .search-content {
    font-size: 12px;
    margin-bottom: 10px;
    text-align: left;
    div {
      display: inline-block;
      margin-bottom: 5px;
    }
    span {
      margin-right: 5px;
      padding: 0 3px;
      color: #ffffff;
      background: #c0c0c0;
      border-radius: 4px;
      border: 1px solid #c0c0c0;
      cursor: pointer;
    }
  }

  .table-image {
    width: 50px;
    height: 50px;
  }

  .table-add {
    margin: 10px 0;
    button {
      width: 100%;
    }
  }
</style>

