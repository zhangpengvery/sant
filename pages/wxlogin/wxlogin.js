// pages/wxlogin/wxlogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo: function (e) {
    if (e.detail.errMsg.length == 14) {
      wx.request({
        url: 'https://api.jbccs.com/api/wxLogin',
        data: {
          mobile: wx.getStorageSync('phoneObj'),
          open_id: wx.getStorageSync('openid'),
          wechat_img: e.detail.userInfo.avatarUrl,
          user_name: e.detail.userInfo.nickName
        },
        method: 'POST',
        success: (res => {
          wx.setStorage({
            data: res.data.data.token,
            key: 'token',
          })
          wx.setStorage({
            data:res.data.data.user,
            key:'user',
          })
          wx.setStorage({
            data: res.data.data.user.user_id,
            key: 'user_id',
          })
          wx.removeStorage({
            key: 'phoneObj',
          })
          wx.reLaunch({
            url: '/pages/home/home',
          })
        })
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '授权失败',
      })
    }
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   wx.request({
  //     url: 'https://api.jbccs.com/api/wxLogin',
  //     data: {
  //       mobile: wx.getStorageSync('phoneObj'),
  //       open_id: wx.getStorageSync('openid'),
  //       wechat_img: e.detail.userInfo.avatarUrl,
  //       user_name: e.detail.userInfo.nickName
  //     },
  //     method: 'POST',
  //     success: (res => {
  //       console.log(res);
  //     })
  //   })
  // },
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