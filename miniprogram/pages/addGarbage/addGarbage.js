// miniprogram/pages/addGarbage/addGarbage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbageType: [
      // 可回收物，厨余垃圾(湿垃圾)，有害垃圾，其他垃圾(干垃圾)
      {name: '可回收物', class: 'color-recyclable', type: 0, icon: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/icon-recyclable.jpg'},
      {name: '厨余垃圾(湿垃圾)', class: 'color-kitchen', type: 1, icon: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/icon-wet.jpg'},
      {name: '有害垃圾', class: 'color-harmful', type: 2, icon: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/icon-harmful.jpg'},
      {name: '其他垃圾(干垃圾)', class: 'color-other', type: 3, icon: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/icon-dry.jpg'},
    ],
    index: -1,
    subData: {
      image: '',
      name: '',
      type: -1,
      descr: '',
      similar: '', // 同类产品，别名
      feature: '',  // 特性
      search: 0,  // 查询热度
      check: 0  // 待审核
    },
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'subData.name': app.globalData.addName || ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindPickerChange(e) {
    const index = e.detail.value
    this.setData({
      index: index,
      'subData.type': this.data.garbageType[index].type,
      'subData.image': this.data.garbageType[index].icon
    })
  },
  bindblur(e) {
    let val = e.detail.value
    let field = e.currentTarget.dataset.field
    switch(field) {
      case 'name':
        this.setData({ 'subData.name': val })
        break
      case 'descr':
        this.setData({ 'subData.descr': val })
        break
      case 'feature':
        this.setData({ 'subData.feature': val })
        break
    }
  },
  submit() {
    if (this.data.loading) {
      return false;
    }
    let subData = this.data.subData
    if (subData.name === '' || subData.type == -1) {
      wx.showToast({
        title: '请完善表单',
        icon: 'none'
      })
      return false
    }
    this.setData({loading: true})
    wx.cloud.callFunction({
      name: 'addGarbage',
      data: subData
    }).then(res => {
      this.setData({loading: false})
      wx.showToast({
        title: res.result.msg,
        icon: 'none',
        success: function() {
          wx.navigateTo({
            url: '../garbage/garbage'
          })
        }
      })
    })
  }
})