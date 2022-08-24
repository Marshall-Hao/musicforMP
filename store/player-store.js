// * 引用同一个对象
// const audioContext =  wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

import {getSongDetail,getSongLyric,getMusicUrl} from '../services/api_player'
import {HYEventStore} from 'hy-event-store'
import parseLyric from '../utils/parse-lyric'

function getAudioPlay(id) {
  getMusicUrl(id).then(res=>{
    const url = res.data[0].url
    createAudio(url,id)
  })
}

function  createAudio(url,id) {
  // * 全局只需要一个 音乐播放对象即可 共享对象
  audioContext.src = url
  audioContext.title = id
  audioContext.autoplay = true

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
    url:'',
    ifFirstPlay: true,
    isStoping: false,

    id:0,
    currentSong:{},
    durationTime:0,
    currentLyricInfos:[],

    currentTime:0,
    currentLyricIndex: 0,
    currentLyricText:"",

    playMode:0, //* 0顺序 1单曲 2随机
    isPlaying: false,

    playListSongs:[],
    playListIndex:0
  },
  actions:{
    playMusicWithSongIdAction(ctx, {id,isRefresh= false}) {
      // 隐式转换
      if (ctx.id == id && !isRefresh) {
        this.dispatch('changeMusicPlayingAction',true)
        return
      }
      ctx.id = id
      ctx.isPlaying = true
      //  重置去除 切歌残影
      ctx.currentTime = {}
      ctx.durationTime = 0
      ctx.currentLyricInfos = []

      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ''
      // 详情
      getSongDetail(id).then(res=>{
    
          ctx.currentSong=  res.songs[0],
          ctx.durationTime =  parseInt(res.songs[0].dt /1000)*1000
          // getBackgroundAudioManager 特殊 需求
          audioContext.title = res.songs[0].name
      })
      // 歌词
      getSongLyric(id).then(res=>{
        const lyric = res.lrc.lyric
        const lyrics =  parseLyric(lyric)
        ctx.currentLyricInfos = lyrics
      })
      getMusicUrl(id).then(res=>{
        const url = res.data[0].url
        ctx.url = url
        audioContext.src = url
        audioContext.title = id
        audioContext.autoplay = true
      })
      if (ctx.ifFirstPlay) {
        // * 只需要在第一次播放的时候去注册 播放器监听时间，后续的用它就好了 一种优化
          this.dispatch("setupAudioContextListner")
          ctx.ifFirstPlay = false
      }
    },
    setupAudioContextListner(ctx) {
       // * 检测是否解析完的回调 因为有解码时间
      audioContext.onCanplay(()=>{
        audioContext.play()
      })

      audioContext.onTimeUpdate(()=>{
        // * 转为毫秒
        const currentTime =  parseInt(audioContext.currentTime) * 1000
       
        ctx.currentTime = currentTime
        // 查找当前播放的歌词
        for (let i =0;i<ctx.currentLyricInfos.length;i++) {
          const lyricInfo = ctx.currentLyricInfos[i]
          // 设置歌词 与 索引
          if (currentTime < lyricInfo.time) {
            const currentIndex = i -1
            if (ctx.currentLyricIndex === currentIndex) return
            const currentLyricInfo = ctx.currentLyricInfos[currentIndex]
            // console.log(currentLyricInfo.text)
            ctx.currentLyricIndex = currentIndex
            ctx.currentLyricText = currentLyricInfo.text
            // * 在当前的currentTime 找到了对应的i 就可以不找了 break跳出循环
            break
          }
        }
      })
      
      audioContext.onEnded(() =>{
        this.dispatch("changeMusicAction")
      })

      // 监听音乐暂停 播放
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })

      audioContext.onPause(() =>{
        ctx.isPlaying = false
      })
      // 停止状态
      audioContext.onStop(()=>{
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },
    // 提高拓展性
    changeMusicPlayingAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      // 优化 后台停止 再返回 重新播放
      if (ctx.isPlaying && ctx.isStoping) {
        audioContext.src = ctx.url
        audioContext.title = ctx.currentSong.name
        ctx.isStoping = false
      }
      ctx.isPlaying ? audioContext.play():audioContext.pause()
    },
    // 因为歌曲切换是全局需要用到的 所以封装到 globalstore里 全局享用
    changeMusicAction(ctx,isNext = true) {
      let index = ctx.playListIndex

      //  * 根据不同播放模式 决定下一首索引
      switch(ctx.playMode) {
        case 0: // 顺序
          index = isNext? index + 1 : index - 1
          //  边际情况
          if (index == -1) index = ctx.playListSongs.length - 1
          if (index == ctx.playListSongs.length) index = 0
          break
        case 1: // 重复
          break
        case 2: //随机
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }
      //  获取歌曲
      let currentSong = ctx.playListSongs[index]
      // 考虑没有播放列表的情况
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 更新索引
        ctx.playListIndex = index
      }

      //  播放新的歌曲
      this.dispatch("playMusicWithSongIdAction",{id:currentSong.id,isRefresh:true})
      // if (action === 'next') {

      // }
    }
  }
})

export {
  audioContext,
  playerStore
}