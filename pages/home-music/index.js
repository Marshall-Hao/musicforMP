// pages/home-music/index.js
Page({


  data: {

  },


  onLoad: function (options) {

  },

  // * events
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  }


})