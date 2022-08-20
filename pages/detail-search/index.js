// pages/detail-search/index.js
import {getHotSearch,getSuggestSearch} from '../../services/api_search'
import debounce from '../../utils/debounce'

const debounceGetSearchSuggest = debounce(getSuggestSearch,300)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords:[],
    suggestSongs:[],
    searchValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
  },

  // * services
  getPageData() {
    getHotSearch().then(res=>{
      this.setData({
        hotKeywords: res.result.hots
      })
    })
  },

  // * event
  handleSearchChange(e) {
    const searchValue = e.detail

    // * 优化搜索值为空的逻辑，因为直接retun 还保留之前的建议列表
    if (!searchValue) {
      this.setData({
        suggestSongs:[]
      })
    }
    this.setData({
      searchValue
    })
    debounceGetSearchSuggest(searchValue).then(res=>{
      this.setData({
        suggestSongs:res.result.allMatch
      })
    })
  }
})