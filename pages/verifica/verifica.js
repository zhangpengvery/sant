// pages/verifica/verifica.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      showBack:true,
      navTitle:true,
      navInput:false,
      r:255,
      g:255,
      b:255,
      w:20,
      l:20,
      fz:32,
      fw:"",
      col:"#000",
      navColor:1,
      title:"三泰之家"
    },
    navH:0,
    mobile:0,
    one:false,
    tow:false,
    three:false,
    four:false,
    focus:false,
    disabled: false,
    code:"",
    codetext:"获取验证码",
    loginData:[]
  },
  //判断登录
  postlogin(mobile,code){
    requestApi1(app.globalData.base_url+"/mLogin",{
      mobile:mobile,
      code:code
    }).then(res=>{
      console.log(res);
      this.setData({
        loginData:res.data
      })
      if(this.data.loginData.code==1){
        wx.setStorage({
          data: this.data.loginData.data.token,
          key: 'token',
        })
        wx.setStorage({
          data:this.data.loginData.data.user,
          key:'user',
        })
        wx.setStorage({
          data: this.data.loginData.data.user.user_id,
          key: 'user_id',
        })
        wx.reLaunch({
          url: '/pages/home/home',
        })
        wx.showTabBar({
          animation: true,
        })
      }else{
        wx.showToast({
          title: '验证码错误',
          icon:'error',
          duration: 2000
        })
      }
    })
  },
  //获取验证码
  postverification(mobile){
    requestApi1(app.globalData.post_url+"/index.php/Wap/Api/msg_gets",{
      type:5,
      mobile:mobile
    }).then(res=>{
    })
  },
  //点击获取验证码
  getCode() {
    var that = this;
    if (that.data.disabled == true) {
      return;
    }
    that.postverification(that.data.mobile)
    var time = 60;
    that.setData({
      codetext: '60s后重新获取',
      disabled: true
    })
    var Interval = setInterval(function () {
      time--;
      if (time > 0) {
        that.setData({
          codetext: time + 's后重新获取'
        })
      } else {
        clearInterval(Interval);
        that.setData({
          codetext: '获取验证码',
          disabled: false
        })
      }
    }, 1000)
  },
  dianji:function(e){
    this.setData({
      focus:true
    })
  },
  verificaFn:function(e){
    this.setData({
      code:e.detail.value
    })
    if(this.data.code.length>0){
      this.setData({
        one:true
      })
    }else{
      this.setData({
        one:false
      })
    }
    if(this.data.code.length>1){
      this.setData({
        tow:true
      })
    }else{
      this.setData({
        tow:false
      })
    }
    if(this.data.code.length>2){
      this.setData({
        three:true
      })
    }else{
      this.setData({
        three:false
      })
    }
    if(this.data.code.length>3){
      this.setData({
        four:true
      })
      this.postlogin(this.data.mobile,this.data.code)
    }else{
      this.setData({
        four:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传递的手机号
    this.setData({
      mobile:options.mobile
    })
    // this.postverification(this.data.mobile)
    this.getCode()
    //获取高度
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          widH:result.windowHeight-app.globalData.navbarHeight,
          navH:app.globalData.navbarHeight
         })
      },
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