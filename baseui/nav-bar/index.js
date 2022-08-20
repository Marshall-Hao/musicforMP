// baseui/nav-bar/index.js
const app = getApp()
Component({
  options:{
    // * 多个插槽
    multipleSlots: true
  },  

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type:String,
      value: '默认标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHeight:0
  },

  lifetimes:{
    ready() {
      this.setData({
        statusHeight: app.globalData.statusHeight
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
