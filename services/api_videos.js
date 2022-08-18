import hyRequest from './index.js'

export function getTopMVs(offset,limit = 10) {
  return hyRequest.get('top/mv',{
    offset,
    limit
  })
}

export function getMVDetail(mvid) {
  return hyRequest.get('mv/detail', {
    mvid
  })
}

/**
 * mv detail
 * @param {number}} mvid 
 */
export function getMVUrl(id) {
  return hyRequest.get('mv/url', {
    id
  })
}

export function getRelatedVideos(id) {
  return hyRequest.get('related/allvideo',{
    id
  })
}