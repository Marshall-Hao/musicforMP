// pages/detail-lists/index.js
import {rankingStore} from '../../store/index'
import {getSongMenuDetails} from '../../services/api_musics'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:'',
    songInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // * 通过在 params 添加一个type 增添此页面的可拓展性
    const {type} = options
    this.setData({
      type
    })
    // * 根据不同的 点击起点 有不同的 ranking 类型
    if (type === 'menu') {
      const {id} = options
      getSongMenuDetails(id).then(res => {
        this.setData({
          songInfo: res.playlist
        })
      })
    } else if (type==="rank") {
        const {ranking} = options
        this.setData({
          ranking
        })
      rankingStore.onState(ranking,this.getRankingDataHandler)
    }
  },

  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // * 停止监听store变化
    if (this.data.ranking) rankingStore.offState(this.data.ranking,this.getRankingDataHandler)
  },

  // * store
  getRankingDataHandler(res) {
    this.setData({
      songInfo:res
    })
  }

})