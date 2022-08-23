// pages/music-player/index.js
import {audioContext,playerStore} from '../../store/index'
const playModeNames = ['order','repeat','random']
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    currentSong:{},
    currentLyricInfos:[],
    durationTime:0,
    currentTime:0,
    currentLyricIndex: 0,
    currentLyricText:"",
    
    isMusicLyric: true,
    currentPage: 0,
    sliderValue:0,
    // slider 拖拽优化体验
    isSliderChanging: false,
    lyric:'',
    lyricScrollTop:0,

    playMode:0,
    playModeName:'order',

    isPlaying:false,
    playingName: 'pause',

    playListSongs:[],
    playListIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    // this.getPageData(id)
    this.setUpPlayerStore(id)
    // *动态计算高度
    const globalData = app.globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusHeight
    const navHeight = globalData.navBarHeight
    const deviceRatio = globalData.deviceRatio
    const contentHeight = screenHeight - statusBarHeight - navHeight
    this.setData({
      id,
      contentHeight,
      isMusicLyric: deviceRatio >=2
    })

  },

  // * services

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

  handleClick() {
    wx.navigateBack()
  },
  handlePause() {
    // 判断播放状态
    playerStore.dispatch('changeMusicPlayingAction',!this.data.isPlaying)
  },
  handleModeBtnClick() {

    let playMode = this.data.playMode + 1
    if (playMode === 3) playMode = 0

    //  设置global state 里面的值
    playerStore.setState("playMode",playMode)
  },

  // * 需要根据playMode
  handlePrev() {
    playerStore.dispatch("changeMusicAction",false)
  },
  handleNext() {
    playerStore.dispatch("changeMusicAction")
  },
  // store
  setUpPlayerStore() {
    // * 监听这几个
    playerStore.onStates(["currentSong","durationTime","currentLyricInfos"],({
      currentSong,
      durationTime,
      currentLyricInfos
    })=>{
      // * 性能优化，只在发生变化的那个改变数据
      if (currentSong) this.setData({currentSong})
      if (durationTime) this.setData({durationTime})
      if ( currentLyricInfos) this.setData({ currentLyricInfos})
    })

    // 监听另外几个
    playerStore.onStates(["currentTime","currentLyricIndex","currentLyricText"],({
      currentTime,
      currentLyricIndex,
      currentLyricText
    })=>{
      // 时间变化
      if (currentTime && !this.data.isSliderChanging) {
        this.setData({currentTime}) 
        const sliderValue = currentTime/this.data.durationTime * 100
        this.setData({
          sliderValue:sliderValue
        })
      }
      // 歌词变化
      if(currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          lyricScrollTop: currentLyricIndex * 35
        })
      }
      if (currentLyricText) {
        this.setData({currentLyricText})
      }
    })

    //  监听播放模式
    playerStore.onStates(["playMode","isPlaying"],({playMode,isPlaying})=>{ 
      // 可能会为0
    if (playMode !== undefined) {
      this.setData({
         playMode,
         playModeName:playModeNames[playMode] 
       })
    }

    // 可能会为false
      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playingName: isPlaying ? 'pause':'resume'
        })
      }
    })
  }
})