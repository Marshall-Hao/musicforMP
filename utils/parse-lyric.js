
const timePattern = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
// 歌词解析
export default function parseLyric(lyricString) {
  const lyrics = []
  const lyricStrings = lyricString.split('\n')
  for (const lineString of lyricStrings) {
    const timeResult =  timePattern.exec(lineString)
    // * 获取时间
    if (!timeResult) continue
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime
    const time = minute + second + parseInt(millsecond)
    // * 获取文本
    const text = lineString.replace(timeResult[0],'')
    const lyricInfo = {time,text}
    lyrics.push(lyricInfo)
  }
  return lyrics
}