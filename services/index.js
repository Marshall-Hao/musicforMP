const BASE_URL = "http://192.168.2.33:3000/"

const LOGIN_BASE_URL = "http://192.168.2.33:4000/"
const token = wx.getStorageSync('token')

class HYRequest {
  constructor(baseUrl,authHeader) {
    this.baseUrl = baseUrl
    this.authHeader = authHeader
  }
  // * 可以提高可拓展性 和 复用性
  request(url,method,params,isAuth=false,header={}) {
    const finalHeader = isAuth ? {...this.authHeader,...header}:header

    return new Promise((resolve,reject)=> {
      wx.request({
        url: this.baseUrl + url,
        method,
        header: finalHeader,
        data: params,
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  get(url,params,isAuth=false,header) {
    return this.request(url,"GET",params,isAuth,header)
  }

  post(url,data,isAuth=false,header) {
    return this.request(url,"POST",data,isAuth,header)
  }
}

const hyRequest = new HYRequest(BASE_URL)

const hyLoginRequest = new HYRequest(LOGIN_BASE_URL,{token})

export default hyRequest

export {
  hyLoginRequest
}