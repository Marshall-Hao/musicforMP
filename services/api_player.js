
import hyRequest from './index'

export function getSongDetail(ids) {
  return hyRequest.get('song/detail',{
    ids
  })
}

export function getMusicUrl(id) {
  return hyRequest.get('song/url',{
    id
  })
}