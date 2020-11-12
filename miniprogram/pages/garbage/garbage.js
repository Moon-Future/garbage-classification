var app = getApp()
Page({
  data: {
    searchFlag: false,
    searchContent: [],
    scrollviewHeight: 458,
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
    total: 0,
    tableShow: false,
    topShow: false,
    scrollTop: 0,
    searchHistory: [],
    hotSearch: [],
    searchFirst: true,
    loading: false
  },

  onLoad() {
    var searchHistory = wx.getStorageSync('searchHistory')
    this.setData({
      searchHistory: searchHistory || []
    })

    let wh = wx.getSystemInfoSync().windowHeight
    this.setData({
      scrollviewHeight: wh - 100
    })
    this.getData()
    this.getSearch()

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  bindblur() {

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
        garbageData: this.data.pageNum != 0 ? this.data.garbageData.concat(result.garbageData) : result.garbageData,
        total: result.total
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '网络拥堵，请稍后重试'
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '下拉刷新'
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.searchFlag) {
      return
    }
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

  getSearch() {
    if (this.data.searchFirst) {
      wx.cloud.callFunction({
        name: 'getHotSearch'
      }).then(res => {
        const result = res.result
        this.setData({
          hotSearch: result.hotSearch,
          searchFirst: false
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  bindconfirm(e) {
    var dataset = e.currentTarget.dataset
    var keyWord = dataset.name || e.detail.value.trim()
    if (this.data.searchHistory.indexOf(keyWord) === -1) {
      this.data.searchHistory.push(keyWord)
      this.setHistory(this.data.searchHistory)
    }
    this.setData({
      keyWord: keyWord,
      loading: true,
      searchFocus: false
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'searchGarbage',
      data: {
        keyWord: keyWord
      }
    }).then(res => {
      wx.hideLoading()
      this.setData({
        searchContent: res.result.searchContent,
        loading: false
      })
      if (this.data.searchContent.length === 0) {
        app.globalData.addName = keyWord.trim()
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },

  cancelSearch() {
    this.setData({
      searchFlag: false,
      keyWord: '',
      searchContent: []
    })
    wx.pageScrollTo({
      scrollTop: this.data.scrollTop,
      duration: 0
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
    app.globalData.garbageDetail = e.currentTarget.dataset.detail
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  // 显示方式
  switchModel() {
    this.setData({
      tableShow: !this.data.tableShow
    })
  },

  onPageScroll(e) {
    if (e.scrollTop > 2000 && !this.data.topShow) {
      this.setData({
        topShow: true
      })
    }
    if (e.scrollTop < 2000 && this.data.topShow) {
      this.setData({
        topShow: false
      })
    }
    if (!this.data.searchFlag) {
      this.setData({
        scrollTop: e.scrollTop
      })
    }
  },

  scrollToTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  goToMiniGame() {
    wx.navigateTo({
      url: '../miniGame/miniGame'
    })
  },

  getUserInfo(e) {
    var userInfo = e.detail.userInfo;
    if (userInfo) {
      app.globalData.userInfo = userInfo;
      wx.navigateTo({
        url: '../addGarbage/addGarbage'
      })
    }
  },

  setHistory(data) {
    this.setData({
      searchHistory: data
    })
    wx.getStorageSync('searchHistory', data)
  },

  delAllHistory() {
    this.setHistory([])
  },

  delRowHistory(e) {
    var name = e.currentTarget.dataset.name
    var searchHistory = this.data.searchHistory;
    searchHistory.splice(searchHistory.indexOf(name), 1)
    this.setHistory(searchHistory)
  }
})