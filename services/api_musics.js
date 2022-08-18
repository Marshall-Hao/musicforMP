import hyRequest from './index'

export function getBanners() {
  return hyRequest.get('banner',{
    type:2
  })
}

export function getRankings(idx) {
  return hyRequest.get('toplist').then(res=>{
    return hyRequest.get('playlist/detail',{
      id:res.list[0].id
    })
  })
}