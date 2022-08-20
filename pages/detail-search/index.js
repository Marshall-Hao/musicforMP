// pages/detail-search/index.js
import {getHotSearch,getSuggestSearch} from '../../services/api_search'
import debounce from '../../utils/debounce'

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
    suggestSongsNodes:[]
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
      const suggestSongs = res.result.allMatch
      this.setData({
        suggestSongs
      })

      //  转成nodes节点
      const suggestKeywords= suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = []
        if (keyword.startsWith(searchValue.toUpperCase())) {
          // * 字符串切割 因为是匹配开头
          const key1 = keyword.slice(0,searchValue.length)
          const key2 = keyword.slice(searchValue.length)

          const node1 = {
            name:'span',
            attrs:{
              style:"color:#26ce8a"
            },
            children:[{type:"text", text:key1}]
          }
          nodes.push(node1)
          const node2 = {
            name:'span',
            attrs:{
              style:"color:#000000"
            },
            children:[{type:"text", text:key2}]
          }
          nodes.push(node2)
        } else {
          const node3 = {
            name:'span',
            attrs:{
              style:"color:#000000"
            },
            children:[{type:"text", text:keyword}]
          }
          nodes.push(node3)
        }
        suggestSongsNodes.push(nodes)
      }
      this.setData({
        suggestSongsNodes
      })
    })
  }
})