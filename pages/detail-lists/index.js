// pages/detail-lists/index.js
import {rankingStore} from '../../store/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:'',
    rankingInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // * 根据不同的 点击起点 有不同的 ranking 类型
    const {ranking} = options
    this.setData({
      ranking
    })
    rankingStore.onState(ranking,this.getRankingDataHandler)
  },

  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // * 停止监听store变化
    rankingStore.offState(this.data.ranking,this.getRankingDataHandler)
  },

  // * store
  getRankingDataHandler(res) {
    this.setData({
      rankingInfo:res
    })
  }

})