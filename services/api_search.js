import hyRequest from './index'
export function getHotSearch() {
  return hyRequest.get('search/hot')
}