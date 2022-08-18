// pages/home-video/index.js
import {getTopMVs} from '../../services/api_videos'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   * 不要滥用async await 会影响性能
   */
  onLoad: async function (options) {
    // * 封装网络请求
    // const res = await getTopMVs(0)
    // this.setData({
    //   topMvs:res.data
    // })
    this.getTopMVs()
 
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
  onPullDownRefresh:async function () {
    // const res = await getTopMVs(0)
    // this.setData({
    //   topMvs:res.data
    // })
    this.getTopMVs()
    this.setData({
      hasMore: true
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    // const res = await getTopMVs(this.data.topMvs.length)
    // this.setData({
    //   topMvs: this.data.topMvs.concat(res.data)
    // })
    this.getTopMVs(this.data.topMvs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getTopMVs: async function(offset = 0) {
    if (!this.data.hasMore && offset !== 0) return
    // * 展示加载动画
    wx.showNavigationBarLoading()
    // * 相当于主动触发 就会无限回调用 触发
    // if (offset === 0) {
    //   wx.startPullDownRefresh()
    // }
    const res = await getTopMVs(offset)
    let newData = []
    if (offset === 0) {
      newData = res.data
    } else {
      newData = this.data.topMvs.concat(res.data)
    }

    this.setData({
      topMvs:newData
    })
    this.setData({
      hasMore: res.hasMore
    })

    // * 停止动画
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

  //  封装事件点击处理
  handleVideoClick(e) {
    const id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  }
})