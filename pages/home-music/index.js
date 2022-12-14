// pages/home-music/index.js
import {rankingStore,rankingMap,playerStore} from '../../store/index'
import {getBanners,getSongMenu} from '../../services/api_musics'
import {queryRect} from '../../utils/selectorRec'
import throttle from '../../utils/throttle'
const RANKING_MAP = {
  0:'newRanking',
  1:'originalRanking',
  2:'upRanking'
}

// * 防止第一次没计算对，最后一次也计算 预防小程序内置bug
const thorttleQueryRect = throttle(queryRect,1000,{trailing:true})
Page({


  data: {
    banners: [],
    swiperHeight: 60,
    recommendSongs: [],
    hotPlaylist:[],
    recommednPlaylist:[],
    // * 为了固定的顺序
    ranking:{0:{},1:{},2:{}},

    currentSong:[],
    isPlaying:false,

    playAnimationState: 'paused'
  },


  onLoad: function (options) {
    this.getPageData()
    this.setUpPlayerStoreListner()
  },

  onUnload: function() {

  },

  // * store
  // * 高阶方程
  getRankingHandler(idx) {
    return (res) =>{
      if (!res || !Object.keys(res).length) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const songList = res.tracks.slice(0,3)
      const playCount = res.playCount
      const rankingObj = {name,coverImgUrl,songList,playCount}
      const newRanking = {...this.data.ranking,[idx]:rankingObj}
      this.setData({
        ranking: newRanking
      })
    }
  },

  // * events
  handleSearchClick() {
    wx.navigateTo({
      url: '/packageDetail/detail-search/index',
    })
  },

  handleImageLoad() {
    // * swiper组件与图片进行完全的匹配 在任何机型上
    // * 减低调用频率，只要一次 节流
    thorttleQueryRect('.swiper-image').then(res =>{
      const rect = res[0]
      // * setData 改变数据是同步，但是渲染是异步的
      this.setData({
        swiperHeight: rect.height
      })
    })
  },
  handleMoreClick() {
    this.navigateToDetailSongsPage('hotRanking')
  },
  handleRankingItemClick(e) {
    const idx = e.currentTarget.dataset.idx
    this.navigateToDetailSongsPage(RANKING_MAP[idx])
  },

  navigateToDetailSongsPage(rankingName) {
    wx.navigateTo({
      url: `/packageDetail/detail-lists/index?ranking=${rankingName}&type=rank`,
    })
  },

  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs',this.data.recommendSongs)
    playerStore.setState('playListIndex',index)

  },

  handlePlayClick() {
       playerStore.dispatch("changeMusicPlayingAction", !this.data.isPlaying )
  },
  handlePlayBarClick() {
    wx.navigateTo({
      url: `/pages/music-player/index?id=${this.data.currentSong.id}`,
    })
  },
  // * services
  getPageData() {
    getBanners().then(res=> {
      this.setData({
        banners: res.banners
      })
    })

    getSongMenu().then(res => {
      this.setData({
        hotPlaylist:res.playlists
      })
    })

    getSongMenu('华语').then(res=>{
        this.setData({
          recommednPlaylist:res.playlists
        })
    })
  },

  //  * store
  setUpPlayerStoreListner() {
       // * 执行action
    rankingStore.dispatch("getRankingDataAction")
    //  获取store中的数据
    rankingStore.onState('hotRanking',res=>{
      const recommendSongs = res?.tracks?.slice(0,6)
      this.setData({
        recommendSongs
      })
    })
    rankingStore.onState('newRanking',this.getRankingHandler(0))
    rankingStore.onState('originalRanking',this.getRankingHandler(1))
    rankingStore.onState('upRanking',this.getRankingHandler(2))

    //  播放器
    playerStore.onStates(["currentSong","isPlaying"],({currentSong,isPlaying}) =>{
      if (currentSong) this.setData({currentSong})
      if (isPlaying !== undefined) this.setData({
          isPlaying,
          playAnimationState: isPlaying?"running":"paused"
        })
    })
  }

})