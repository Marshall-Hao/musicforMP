// pages/detail-search/index.js
import {getHotSearch,getSuggestSearch,getSearchResult} from '../../services/api_search'
import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes'

// * 防抖 性能优化
const debounceGetSearchSuggest = debounce(getSuggestSearch,300)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords:[],
    suggestSongs:[],
    searchValue:'',
    suggestSongsNodes:[],
    resultSongs: []
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

    this.setData({
      searchValue,
      resultSongs:[]
    })
    // * 优化搜索值为空的逻辑，因为直接retun 还保留之前的建议列表
    if (!searchValue) {
      this.setData({
        suggestSongs:[],
        resultSongs:[]
      })
      // * 因为是防抖，“”不会执行 所以会执行上一次的 会有结果 
      debounceGetSearchSuggest.cancel()
      return
    }
    debounceGetSearchSuggest(searchValue).then(res=>{
      const suggestSongs = res.result.allMatch
      this.setData({
        suggestSongs
      })

      //  转成nodes节点
      const suggestKeywords= suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        // * 封装
        const nodes = stringToNodes(keyword,searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({
        suggestSongsNodes
      })
    })
  },

  handleSearchAction() {
    // * 可以添加历史搜索功能 使用LRU 优化

    const {searchValue} = this.data
    getSearchResult(searchValue).then(res=>{
      console.log(res)
      this.setData({
        resultSongs:res.result.songs
      })
    })
  },
  handleSuggestItemClick(e) {
    const keyword = e.currentTarget.dataset.item

    this.setData({searchValue:keyword})

    this.handleSearchAction()
  }
})