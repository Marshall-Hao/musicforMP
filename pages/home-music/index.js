// pages/home-music/index.js
import {rankingStore} from '../../store/index'
import {getBanners} from '../../services/api_musics'
import {queryRect} from '../../utils/selectorRec'
import throttle from '../../utils/throttle'

const thorttleQueryRect = throttle(queryRect)

Page({


  data: {
    banners: [],
    swiperHeight: 60,
    recommendSongs: []
  },


  onLoad: function (options) {
    this.getPageData()
    // * 执行action
    rankingStore.dispatch("getRankingDataAction")
    //  获取store中的数据
    rankingStore.onState('hotRanking',res=>{
      const recommendSongs = res.tracks?.slice(0,6)
      this.setData({
        recommendSongs
      })
    })
  },

  // * events
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
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

  // * services
  getPageData() {
    getBanners().then(res=> {
      this.setData({
        banners: res.banners
      })
    })
  }

})