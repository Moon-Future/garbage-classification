// component/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/garbage/garbage",
        icon: 'icon-search1',
        text: "查询"
      },
      {
        pagePath: "/pages/knowledge/knowledge",
        icon: 'icon-Knowledge',
        text: "小知识"
      },
      {
        pagePath: "/pages/verify/verify",
        icon: 'icon-shenhezhong',
        text: "审核中"
      },
      {
        pagePath: "/pages/miniGame/miniGame",
        icon: 'icon-user',
        text: "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.redirectTo({ url })
    }
  }
})
