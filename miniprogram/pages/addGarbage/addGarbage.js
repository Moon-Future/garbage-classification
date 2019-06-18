// miniprogram/pages/addGarbage/addGarbage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbageType: [
      // 可回收物，厨余垃圾(湿垃圾)，有害垃圾，其他垃圾(干垃圾)
      {name: '可回收物', class: 'color-recyclable', id: 0},
      {name: '厨余垃圾(湿垃圾)', class: 'color-kitchen', id: 1},
      {name: '有害垃圾', class: 'color-harmful', id: 2},
      {name: '其他垃圾(干垃圾)', class: 'color-other', id: 3},
    ],
    index: -1,
    subData: {
      image: 'http://s.lvsediqiu.com/uploads/wiki/452.png',
      name: '',
      type: -1,
      descr: '',
      feature: '',
      search: 0
    },
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      index: e.detail.value,
      'subData.type': e.detail.value
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
      wx.showToast({
        title: res.result.msg,
        icon: 'none'
      })
      this.setData({loading: false})
    })
  }
})