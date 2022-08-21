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
    durationTime:0,
    currentTime:0,
    sliderValue:0,
    // slider 拖拽优化体验
    isSliderChanging: false
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
        durationTime: parseInt(res.songs[0].dt /1000)*1000
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
  handleSliderChange(event) {
    const {value} = event.detail

    //  百分比进度
    const currentTime = this.data.durationTime * value / 100000
    // this.setData({
    //   currentTime
    // })

    // 定位音乐播放时间
    audioContext.pause()
    // seek api 寻找特定播放时间 只支持到s
    audioContext.seek(currentTime)

      this.setData({
        sliderValue:value,
        isSliderChanging:false
      })
    
  },
  handleSliderChanging(event) {
    const {value} = event.detail
    const currentTime = parseInt(this.data.durationTime * value / 100000) * 1000
    this.setData({isSliderChanging:true, currentTime})
  },
  handlePause() {
    audioContext.pause()
  },
  // * api
  createAudio(url) {
    // * 全局只需要一个 音乐播放对象即可 共享对象
    audioContext.src = url
    audioContext.autoplay = true
    // * 检测是否解析完的回调 因为有解码时间
    audioContext.onCanplay(()=>{
      audioContext.play()
    })

    audioContext.onTimeUpdate(()=>{
      // * 转为毫秒
      if (!this.data.isSliderChanging) {
        const currentTime =  parseInt(audioContext.currentTime) * 1000
        this.setData({
          currentTime
        })
        const sliderValue = currentTime/this.data.durationTime * 100
        this.setData({
          sliderValue:sliderValue
        })
      }
    })
  }
})