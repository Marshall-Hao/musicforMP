// pages/music-player/index.js
import {getSongDetail} from '../../services/api_player'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSong:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    this.getPageData(id)
  },

  // * services
  getPageData(id) {
    getSongDetail(id).then(res=>{
      this.setData({
        currentSong:res.songs[0]
      })
    })
  }
})