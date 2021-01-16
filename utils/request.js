//封装一个请求数据的方法
function requestApi(url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "content-type": "application/json",
        'XX-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE2MTA2OTg5MjMsIm5iZiI6MTYxMDY5ODkyMywiZXhwIjoxNjI2MjUwOTIzLCJ1aWQiOjc4NH0.uWY3UqMQxyVzVKV_gIo9b7R2ydCXoTtVTss9hsWNmQM',
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
        'XX-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE2MTA2OTg5MjMsIm5iZiI6MTYxMDY5ODkyMywiZXhwIjoxNjI2MjUwOTIzLCJ1aWQiOjc4NH0.uWY3UqMQxyVzVKV_gIo9b7R2ydCXoTtVTss9hsWNmQM',
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
  requestApi1
}