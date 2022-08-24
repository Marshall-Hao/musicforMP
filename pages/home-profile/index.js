// pages/home-profile/index.js
import {getUserInfo} from '../../services/api_login'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // event
  async handleGetUser() {
      const userInfo = await getUserInfo()
      console.log(userInfo) 
  }
})