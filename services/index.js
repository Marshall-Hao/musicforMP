const BASE_URL = "http://127.0.0.1:3000/"

const LOGIN_BASE_URL = "http://127.0.0.1:4000/"

class HYRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  request(url,method,params) {
    return new Promise((resolve,reject)=> {
      wx.request({
        url: this.baseUrl + url,
        method,
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

  get(url,params) {
    return this.request(url,"GET",params)
  }

  post(url,data) {
    return this.request(url,"POST",data)
  }
}

const hyRequest = new HYRequest(BASE_URL)

const hyLoginRequest = new HYRequest(LOGIN_BASE_URL)

export default hyRequest

export {
  hyLoginRequest
}