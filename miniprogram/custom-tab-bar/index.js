Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/garbage/garbage",
        iconPath: '/images/searchlist.png',
        selectedIconPath: '/images/searchlist-active.png',
        text: "查询"
      },
      {
        pagePath: "/pages/knowledge/knowledge",
        iconPath: '/images/knowledge.png',
        selectedIconPath: '/images/knowledge-active.png',
        text: "小知识"
      },
      {
        pagePath: "/pages/verify/verify",
        iconPath: '/images/verify.png',
        selectedIconPath: '/images/verify-active.png',
        text: "审核中"
      },
      // {
      //   pagePath: "/pages/miniGame/miniGame",
      //   iconPath: '/images/user.png',
      //   selectedIconPath: '/images/user-active.png',
      //   text: "我的"
      // }
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