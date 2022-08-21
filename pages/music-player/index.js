// pages/music-player/index.js
import {getSongDetail,getMusicUrl} from '../../services/api_player'
import {audioContext} from '../../store/index'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSong:{},
    currentPage: 0,
    isMusicLyric: true,
    duration:0
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
    const deviceRatio = globalData.deviceRatio
    const contentHeight = screenHeight - statusBarHeight - navHeight
    this.setData({
      contentHeight,
      isMusicLyric: deviceRatio >=2
    })

    // 创建播放器
    this.getAudioPlay(id)
  },

  // * services
  getPageData(id) {
    getSongDetail(id).then(res=>{
      this.setData({
        currentSong:res.songs[0],
        duration: res.songs[0].dt
      })
    })
  },

  getAudioPlay(id) {
    getMusicUrl(id).then(res=>{
      const url = res.data[0].url
      this.createAudio(url)
    })
  },

  // events
  handleSwiperChange(e) {
    const {current} = e.detail
    this.setData({
      currentPage:current
    })
  },

  // * api
  createAudio(url) {
    // * 全局只需要一个 音乐播放对象即可 共享对象
    audioContext.src = url
    audioContext.play()
  }
})