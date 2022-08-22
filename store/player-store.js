// * 引用同一个对象
const audioContext =  wx.createInnerAudioContext()
import {getSongDetail,getSongLyric,getMusicUrl} from '../services/api_player'
import {HYEventStore} from 'hy-event-store'
import parseLyric from '../utils/parse-lyric'

function getAudioPlay(id) {
  getMusicUrl(id).then(res=>{
    const url = res.data[0].url
    createAudio(url)
  })
}

function  createAudio(url) {
  // * 全局只需要一个 音乐播放对象即可 共享对象
  audioContext.src = url
  audioContext.autoplay = true
  // * 检测是否解析完的回调 因为有解码时间
  audioContext.onCanplay(()=>{
    audioContext.play()
  })

}


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
      getAudioPlay(id)
    },
  }
})

export {
  audioContext,
  playerStore
}