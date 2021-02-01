//封装一个请求数据的方法
function requestApi(url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "content-type": "application/json",
        'XX-Token':wx.getStorageSync('token'),
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
function requestApiNo(url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "content-type": "application/json",
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
function requestApi1(url, data = {}, method = "post") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'XX-Token':wx.getStorageSync('token'),
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
//暴露
module.exports = {
  requestApi,
  requestApi1,
  requestApiNo
}