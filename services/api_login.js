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

export function checkToken() {
  return hyLoginRequest.post('auth',{},true)
}

export function checkSession() {
  return new Promise((resolve,reject)=>{
    wx.checkSession({
      success: (res) => {
        resolve(true)
      },
      fail: () =>{
       resolve(false)
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      desc: '你好啊',
      success:res =>{
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}