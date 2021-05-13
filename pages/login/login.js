// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    dian: false,
    btn: false,
    guanIf: false,
    session_key:"",
  },
  //获取input框的内容
  userpho: function (e) {
    this.setData({
      mobile: e.detail.value
    })
    if (this.data.mobile.length > 0) {
      this.setData({
        guanIf: true
      })
    } else {
      this.setData({
        guanIf: false
      })
    }
    if (this.data.mobile.length > 10 && this.data.dian) {
      this.setData({
        btn: true
      })
    } else {
      this.setData({
        btn: false
      })
    }
  },
  //点击清除input框中的内容
  phoguanFn: function (e) {
    this.setData({
      mobile: "",
      guanIf: false,
      btn: false
    })
  },
  dianbian: function (e) {
    if (e.detail.value && this.data.mobile.length > 10) {
      this.setData({
        btn: true,
        dian: true
      })
    }
    if (e.detail.value == false) {
      this.setData({
        btn: false
      })
    }
  },
  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = encodeURI(e.detail.encryptedData)
    var sessionObj = this.data.session_key
    wx.request({
      url: 'https://api.jbccs.com/api/getWxTel',
      method: 'POST',
      data: {
        encryptedData: telObj,
        iv: ivObj,
        session_key: sessionObj
      },
      success: function (res) {
        var phoneObj = JSON.parse(res.data.data).tel;
        wx.setStorage({  //存储数据并准备发送给下一页使用
          key: "phoneObj",
          data: phoneObj,
        })
        if (phoneObj>1) {
          wx.redirectTo({
            url: '/pages/wxlogin/wxlogin',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.jbccs.com/api/getJscode2session',
            data: {
              code: res.code,
            },
            success(res) {
              that.setData({
                session_key: res.data.data.session_key
              })
              wx.setStorage({
                data: res.data.data.openid,
                key: 'openid',
              })
              wx.setStorage({
                data: res.data.data.unionid,
                key: 'unionid',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
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