import HYrequest from './index'
import hyRequest from './index.js'

export function getTopMVs(offset,limit = 10) {
  return hyRequest.get('top/mv',{
    offset,
    limit
  })
}