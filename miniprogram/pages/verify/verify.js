var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbageType: {
      0: {name: '可回收物', class: 'color-recyclable-bg'},
      1: {name: '厨余垃圾(湿垃圾)', class: 'color-kitchen-bg'},
      2: {name: '有害垃圾', class: 'color-harmful-bg'},
      3: {name: '其他垃圾(干垃圾)', class: 'color-other-bg'},
    },
    garbageData: [],
    pageNum: 0,
    pageSize: 30,
    total: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.getData()
  },

  getData() {
    wx.showLoading({
      title: '加载中'
    })
    this.setData({
      loading: true
    })
    const condition = {verify: 0}
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
        garbageData: this.data.activeType == -1 && this.data.pageNum != 0 ? this.data.garbageData.concat(result.garbageData) : result.garbageData,
        total: result.total,
        loading: false
      })
      wx.hideLoading()
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

  getUserInfo(e) {
    var userInfo = e.detail.userInfo;
    if (userInfo) {
      app.globalData.userInfo = userInfo;
      app.globalData.addName = '';
      wx.navigateTo({
        url: '../addGarbage/addGarbage'
      })
    }
  }
})