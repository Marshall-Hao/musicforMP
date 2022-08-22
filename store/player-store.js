// * 引用同一个对象
const audioContext =  wx.createInnerAudioContext()
import {getSongDetail,getSongLyric} from '../services/api_player'
import {HYEventStore} from 'hy-event-store'
import parseLyric from '../utils/parse-lyric'
/**
 *  id:0,
    currentSong:{},
    currentLyricInfos:[],
    durationTime:0,
    currentTime:0,
    currentLyricIndex: 0,
    currentLyricText:"",
 */
const playerStore = new HYEventStore({
  state:{
    id:0,
    currentSong:{},
    durationTime:0,
    currentLyricInfos:[],
  },
  actions:{
    playMusicWithSongIdAction(ctx, {id}) {
      // 详情
      getSongDetail(id).then(res=>{
          ctx.currentSong=  res.songs[0],
          ctx.durationTime =  parseInt(res.songs[0].dt /1000)*1000
      })
      // 歌词
      getSongLyric(id).then(res=>{
        const lyric = res.lrc.lyric
        const lyrics =  parseLyric(lyric)
        ctx.currentLyricInfos = lyrics
      })
    },
  }
})

export {
  audioContext,
  playerStore
}