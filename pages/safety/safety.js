// pages/safety/safety.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    disabled:false,
    mobile:0,
    code:"",
    type:5,
    codetext:"获取验证码",
    user_mobile:0,
    one:false,
    tow:false,
    three:false,
    four:false,
    focus:false,
    timer:''
  },
  //获取验证码
  postverification(type,mobile){
    requestApi1(app.globalData.post_url+"/index.php/Wap/Api/msg_gets",{
      type:type,
      mobile:mobile
    }).then(res=>{
      console.log(res);
    })
  },
  getCode() {
    var that = this;
    if (that.data.disabled == true) {
      return;
    }
    if(this.data.mobile.length!=11){
      wx.showToast({
        icon:'none',
        title: '请输入手机号',
      })
      return;
    }else{
      this.setData({
        active:3
      })
    }
    that.postverification(that.data.type,that.data.mobile)
    var time = 60;
    that.setData({
      codetext: '60s后重新获取',
      disabled: true
    })
    this.data.timer = setInterval(function () {
      time--;
      if (time > 0) {
        that.setData({
          codetext: time + 's后重新获取'
        })
      } else {
        clearInterval(that.data.timer);
        that.setData({
          codetext: '获取验证码',
          disabled: false
        })
      }
    }, 1000)
  },
  xgjFn:function(){
    this.setData({
      active:2
    })
  },
  bindphoFn:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  bindcodeFn:function(e){
    this.setData({
      code:e.detail.value
    })
  },
  updateMobile(code,mobile){
    requestApi1(app.globalData.post_url+"/index.php/Api/User/updateMobile",{
      code:code,
      mobile:mobile
    }).then(res=>{
      if(res.data.code==400){
        var title=res.data.datas.error
        wx.showToast({
          title: title,
        })
      }else if(res.data.code==200){
        wx.showToast({
          title: '修改成功',
        })
      }
      console.log(res);
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
      this.updateMobile(this.data.code,this.data.mobile)
    }else{
      this.setData({
        four:false
      })
    }
  },
  bindback:function(){
    this.setData({
      disabled:false,
      active:2
    })
    this.endInter()
  },
  endInter: function () {
    clearInterval(this.data.timer)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_mobile:options.user_mobile
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