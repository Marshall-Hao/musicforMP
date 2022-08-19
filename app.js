// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0
  },
  onLaunch() {
    const info = wx.getSystemInfoSync() 
    // * 因为不用响应书渲染页面 直接赋值就好
    this.globalData.screenWidth= info.screenWidth
    this.globalData.screenHeight= info.screenHeight
  },
})
