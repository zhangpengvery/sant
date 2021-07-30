//app.js
App({
  onLaunch: function (options) {
    this.globalData.scene=options.scene
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.windowHeigtn=result.windowHeight
        this.globalData.navbarHeight=result.statusBarHeight*(750/result.windowWidth)+88
      },
    })
  },
  onHide:function(){
    wx.removeStorageSync('newcityname')
  },
  globalData: {
    scene:0,
    userInfo: null,
    windowHeigtn:0,
    navbarHeight:0,
    base_url:"https://api.jbccs.com/api",
    post_url:"https://jbccs.com",
  }
})