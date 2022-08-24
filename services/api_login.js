import {hyLoginRequest} from './index'

export function getLoginCode() {
  return new Promise((resolve,reject) =>{
    wx.login({
      timeout:1000,
      success:res=>{
        const code = res.code
        resolve(code)
      },
      fail: err =>{
        console.log(err)
        reject(err)
      }
    })
  })
}

export function sendCodeToServer(code) {
  return hyLoginRequest.post('login',{code})
}
