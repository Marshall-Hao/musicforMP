import {HYEventStore} from 'hy-event-store'
import {getRankings} from '../services/api_musics'

// * 代码的switch 逻辑判断优化 用map代替
const rankingMap = {
  0:"newRanking",
  1:"hotRanking",
  2:"originalRanking",
  3:"upRanking"
}

const rankingStore = new HYEventStore({
  state:{
    newRanking:{},
    hotRanking: {},
    originalRanking:{},
    upRanking:{}
  },
  actions: {
    getRankingDataAction(ctx) {
      for (let i=0;i<4;i++) {
        getRankings(i).then(res=>{
          ctx[rankingMap[i]] = res.playlist
          // switch(i) {
          //   case 0:
          //     console.log('新歌',res)
          //     break;
          //   case 1:
          //     console.log('热歌',res)
          //     break;
          //   case 2:
          //     console.log('原创',res)
          //     break;
          //   case 3:
          //     console.log('飙升',res)
          //     break;
          // }
        })
      }
    }
  }
})

export {rankingStore}