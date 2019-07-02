var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0,
    pageSize: 10,
    total: 0,
    list: [],
    summaryWidth: 250
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()

    let ww = wx.getSystemInfoSync().windowWidth
    this.setData({
      summaryWidth: ww - 70
    })

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    wx.stopPullDownRefresh({
      success: function() {
        that.setData({
          pageNum: 0,
          pageSize: 10
        })
        that.getData()
      }
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

  getData() {
    wx.showLoading({
      title: '加载中'
    })
    wx.cloud.callFunction({
      name: 'getKnowledge',
      data: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      }
    }).then(res => {
      const result = res.result
      result.knowledgeData.forEach(item => {
        item.image = item.image || 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/green-earth.jpg'
      })
      this.setData({
        list: this.data.pageNum != 0 ? this.data.list.concat(result.knowledgeData) : result.knowledgeData,
        total: result.total
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },

  goDetail(e) {
    app.globalData.knowledgeData = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../knowDetail/knowDetail'
    })
  }
})