// miniprogram/pages/miniGame/miniGame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbage: {},
    garbageType: {
      0: {name: '可回收物', class: 'color-recyclable'},
      1: {name: '厨余垃圾(湿垃圾)', class: 'color-kitchen'},
      2: {name: '有害垃圾', class: 'color-harmful'},
      3: {name: '其他垃圾(干垃圾)', class: 'color-other'}
    },
    garbageBin: [
      {
        type: 0,
        binOff: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-recyclable(off).png',
        binOn: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-recyclable(on).png'
      },
      {
        type: 1,
        binOff: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-wet(off).png',
        binOn: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-wet(on).png'
      },
      {
        type: 3,
        binOff: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-dry(off).png',
        binOn: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-dry(on).png'
      },
      {
        type: 2,
        binOff: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-harmful(off).png',
        binOn: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-harmful(on).png'
      }
      
    ],
    garbageBinAlias: [
      {type: -1, binOff: '', binOn: ''},
      {
        type: 1,
        binOff: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-kitchen(off).png',
        binOn: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-kitchen(on).png'
      },
      {
        type: 3,
        binOff: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-other(off).png',
        binOn: 'https://green-earth-1255423800.cos.ap-chengdu.myqcloud.com/bin-other(on).png'
      },
      {type: -1, binOff: '', binOn: ''}
    ],
    right: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  getData() {
    wx.showLoading({
      title: '加载中'
    })
    wx.cloud.callFunction({
      name: 'getGarbage',
      data: {
        rankFlag: true
      }
    }).then(res => {
      const result = res.result
      this.setData({
        garbage: result.garbageData && result.garbageData[0]
      })
      wx.hideLoading()
    })
  },

  selectBin(e) {
    const type = e.currentTarget.dataset.type
    if (this.data.right) {
      return
    }
    if (type == this.data.garbage.type) {
      this.setData({
        right: true
      })
    } else {
      wx.showToast({
        title: '',
        image: '../../images/pig.png'
      })
    }
  },

  next() {
    this.setData({
      right: false
    })
    this.getData()
  },

  answer() {
    this.setData({
      right: true
    })
  }
})