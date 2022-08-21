import hyRequest from './index'

export function getBanners() {
  return hyRequest.get('banner',{
    type:2
  })
}

export function getRankings(idx) {
  return hyRequest.get('toplist').then(res=>{
    return hyRequest.get('playlist/detail',{
      id:res.list[idx].id
    })
  })
}

export function getSongMenu(cat="全部",limit=6,offset=10) {
    return hyRequest.get('top/playlist',{
      cat,
      limit,
      offset
    })
}

export function getSongMenuDetails(id) {
  return hyRequest.get('playlist/detail/dynamic',{
    id
  })
}

