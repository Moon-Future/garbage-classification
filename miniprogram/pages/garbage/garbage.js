Page({
  data: {
    searchFlag: false,
    searchContent: [],
    scrollviewHieght: 458,
    searchFocus: false,
    keyWord: '',
    garbageType: {
      0: {name: '可回收物', class: 'color-recyclable'},
      1: {name: '厨余垃圾(湿垃圾)', class: 'color-kitchen'},
      2: {name: '有害垃圾', class: 'color-harmful'},
      3: {name: '其他垃圾(干垃圾)', class: 'color-other'},
    },
    typeImgList: [
      {type: 0, image: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/recyclable.jpg'},
      {type: 1, image: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/wet(kitchen).jpg'},
      {type: 2, image: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/harmful.jpg'},
      {type: 3, image: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/dry(other).jpg'},
    ],
    activeType: -1,
    garbageData: [],
    pageNum: 0,
    pageSize: 30,
    total: 0
  },

  onLoad() {
    let wh = wx.getSystemInfoSync().windowHeight
    this.setData({
      scrollviewHeight: wh - 50
    })
    this.getData()
  },

  getData() {
    wx.showLoading({
      title: '加载中'
    })
    const condition = this.data.activeType == -1 ? {} : {type: this.data.activeType}
    wx.cloud.callFunction({
      name: 'getGarbage',
      data: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        condition: condition
      }
    }).then(res => {
      const result = res.result
      this.setData({
        garbageData: this.data.activeType == -1 ? this.data.garbageData.concat(result.garbageData) : result.garbageData,
        total: result.total
      })
      wx.hideLoading()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '上拉刷新'
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const pageNum = this.data.pageNum + 1
    if (pageNum > Math.ceil(this.data.total / this.data.pageSize) - 1) {
      return;
    }
    this.setData({
      pageNum: pageNum
    })
    this.getData()
  },

  bindfocus() {
    this.setData({
      searchFlag: true,
      searchFocus: true
    })
  },

  bindconfirm(e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'searchGarbage',
      data: {
        keyWord: e.detail.value
      }
    }).then(res => {
      wx.hideLoading()
      this.setData({
        searchContent: res.result.searchContent,
        searchFocus: false
      })
    }).catch(console.error)
  },

  cancelSearch() {
    this.setData({
      searchFlag: false,
      keyWord: '',
      searchContent: []
    })
  },

  selectType(e) {
    let type = e.currentTarget.dataset.type
    let activeType = this.data.activeType
    if (type == activeType) {
      activeType = -1;
    } else {
      activeType = type;
    }
    this.setData({
      activeType: activeType,
      pageNum: 0,
      pageSize: 30,
    })
    this.getData()
  },

  goDetail(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})