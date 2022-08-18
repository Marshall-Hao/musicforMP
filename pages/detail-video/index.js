// pages/detail-video/index.js
import {getMVUrl,getMVDetail,getRelatedVideos} from '../../services/api_videos'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrlInfo:{},
    mvDetails:{},
    relatedVideos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // * 全部await 效率有点低 一行一行执行
  onLoad:  function (options) {
    const {id} = options
    this.getPageData(id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getPageData(id) {
    getMVDetail(id).then(res=> {
      this.setData({
        mvDetails: res.data
      })
    })

    // getMVUrl(id).then(res=> {
    //   this.setData({
    //     mvUrlInfo:res.data
    //   })
    // })

    getRelatedVideos(id).then(res=> {
      this.setData({
        relatedVideos:res.data
      })
    })
  }
})