export function queryRect(name) {
  return new Promise((resolve,reject)=> {
    const query = wx.createSelectorQuery()
  query.select(name).boundingClientRect()
  // * 视口滚动绑定
  // query.selectViewport().scrollOffset()
  //用一个promise 传递到数据
  query.exec(resolve)
  })
}