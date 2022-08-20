import hyRequest from './index'
export function getHotSearch() {
  return hyRequest.get('search/hot')
}

export function getSuggestSearch(keywords) {
  return hyRequest.get('search/suggest',{
    keywords,
    type:'mobile'
  })
}

export function getSearchResult(keywords) {
  hyRequest.get('search', {
    keywords
  })
}