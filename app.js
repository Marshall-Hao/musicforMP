// app.js
import {getLoginCode,sendCodeToServer} from './services/api_login'

App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusHeight:0,
    navBarHeight:44,
    deviceRatio: 0
  },
  onLaunch() {
    const info = wx.getSystemInfoSync() 
    // console.log(info)
    // * 因为不用响应书渲染页面 直接赋值就好
    this.globalData.screenWidth= info.screenWidth
    this.globalData.screenHeight= info.screenHeight
    this.globalData.statusHeight = info.statusBarHeight

    const deviceRatio = info.screenHeight / info.screenWidth
    this.globalData.deviceRatio = deviceRatio

    // 让用户默认进行登录
    this.loginAction()
  },

  async loginAction() {
    //  获取code
    const code =  await getLoginCode()
    
    // code 发送给服务器
    const result = await sendCodeToServer(code)
    const token = result.token
    wx.setStorageSync('token', token)
    // 
  }
})
