// pages/detail-search/index.js
import {getHotSearch} from '../../services/api_search'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
  },

  // * services
  getPageData() {
    getHotSearch().then(res=>{
      this.setData({
        hotKeywords: res.result.hots
      })
    })
  }
})