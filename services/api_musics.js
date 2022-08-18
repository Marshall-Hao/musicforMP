import hyRequest from './index'

export function getBanners() {
  return hyRequest.get('banner',{
    type:2
  })
}