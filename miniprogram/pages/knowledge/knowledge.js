var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0,
    pageSize: 10,
    total: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
        item.image = 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/recyclable.jpg'
      })
      this.setData({
        list: this.data.pageNum != 0 ? this.data.list.concat(result.knowledgeData) : result.knowledgeData,
        total: result.total
      })
      wx.hideLoading()
    })
  },

  goDetail(e) {
    app.globalData.knowledgeData = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../knowDetail/knowDetail'
    })
  }
})