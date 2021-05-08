// pages/wxlogin/wxlogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"",
    warn:false,
    marker:false
  },
  bindguan:function(){
    this.setData({
      warn:false,
      marker:false
    })
  },
  getUserProfile(){
    wx.getUserProfile({
      desc:'用于完善会员资料',
      lang :'zh_CN',
      success:(res)=>{
        wx.showLoading({
          title: '登录中...',
        })
        wx.request({
          url: 'https://api.jbccs.com/api/wxLogin',
          data: {
            mobile: wx.getStorageSync('phoneObj'),
            open_id: wx.getStorageSync('openid'),
            wechat_img: res.userInfo.avatarUrl,
            user_name: res.userInfo.nickName,
            union_id:wx.getStorageSync('unionid')
          },
          method: 'POST',
          success: (res => {
            wx.hideLoading()
            if(res.data.code==1){
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
            }else{
              this.setData({
                msg:res.data.msg,
                warn:true,
                marker:true
              })
            }
          })
        })
      },
      fail:(res)=>{
        wx.showToast({
          icon:'none',
          title: '用户取消授权',
        })
      }
    })
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