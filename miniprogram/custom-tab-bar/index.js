Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/garbage/garbage",
        iconPath: '/images/pig.png',
        selectedIconPath: '/images/pig.png',
        text: "查询"
      },
      {
        pagePath: "/pages/knowledge/knowledge",
        iconPath: '/images/pig.png',
        selectedIconPath: '/images/pig.png',
        text: "小知识"
      },
      {
        pagePath: "/pages/verify/verify",
        iconPath: '/images/pig.png',
        selectedIconPath: '/images/pig.png',
        text: "审核中"
      },
      {
        pagePath: "/pages/miniGame/miniGame",
        iconPath: '/images/pig.png',
        selectedIconPath: '/images/pig.png',
        text: "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})