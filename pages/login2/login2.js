// pages/login2/login2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getPhoneNumber: function (e) {
    var that = this
    // console.log("errMsg:" + e.detail.errMsg)
    console.log("iv:" + e.detail.iv)
    console.log("未转 encryptedData:" + e.detail.encryptedData)
    // console.log("encryptedData:" + encodeURIComponent(e.detail.encryptedData))
    console.log("js_code:" + encodeURIComponent(app.data.js_code))
    wx.request({
      url: url1,
      data: {
        act: "binding_little_program",
        code: encodeURIComponent(app.data.js_code),
        encryptedData: encodeURIComponent(e.detail.encryptedData),
        iv: encodeURIComponent(e.detail.iv),
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // success
        console.log(res)
        console.log("result_msg:"+res.data.result_msg)
        if (res.data.result_code == 0) {
          util.showAlert(res.data.result_msg)
        } else {
          console.log(res.data.uid)
          util.showAlert1(res.data.result_msg, 'success')
          app.globalData.uid = res.data.uid
          app.globalData.card_id = res.data.card_id
          app.globalData.fullname = res.data.fullname
          app.globalData.photo_img = res.data.photo_img
          app.globalData.usertel = res.data.telephone
          app.globalData.sex = res.data.sex
          console.log('aaphoto = ' + app.globalData.usertel)
 
          wx.setStorage({
            key: "uid",
            data: res.data.uid,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "usertel",
            data: res.data.telephone,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "card_id",
            data: res.data.card_id,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "fullname",
            data: res.data.fullname,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "photo_img",
            data: res.data.photo_img,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "sex",
            data: res.data.sex,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          var pages = getCurrentPages();
          console.log("length" + pages.length);
          //更新ui
          that.setData({
            uid: res.data.uid
          })
          if (that.data.uid > 0)
          { that.getUserInfo(); }
        }
 
 
      },
      fail: function () {
        // fail
        util.showAlert('操作失败')
      },
      complete: function () {
        // complete
      }
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})