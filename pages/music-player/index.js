// pages/music-player/index.js
import {getSongDetail} from '../../services/api_player'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSong:{},
    currentPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    this.getPageData(id)

    // *动态计算高度
    const globalData = app.globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusHeight
    const navHeight = globalData.navBarHeight
    const contentHeight = screenHeight - statusBarHeight - navHeight
    this.setData({
      contentHeight
    })

  },

  // * services
  getPageData(id) {
    getSongDetail(id).then(res=>{
      this.setData({
        currentSong:res.songs[0]
      })
    })
  },

  // events
  handleSwiperChange(e) {
    const {current} = e.detail
    this.setData({
      currentPage:current
    })
  }
})