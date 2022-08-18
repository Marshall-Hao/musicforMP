// pages/home-music/index.js

import {getBanners} from '../../services/api_musics'
Page({


  data: {
    banners: [],
    swiperHeight: 60
  },


  onLoad: function (options) {
    this.getPageData()
  },

  // * events
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  handleImageLoad() {
    // * swiper组件与图片进行完全的匹配 在任何机型上
    const query = wx.createSelectorQuery()
    query.select('.swiper-image').boundingClientRect()
    // * 视口滚动绑定
    // query.selectViewport().scrollOffset()
    query.exec(res => {
      const rect = res[0]
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