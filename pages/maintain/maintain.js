// pages/maintain/maintain.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maintain:1,
    realname:"",
    mobile:0
  },
  xuanzTopFn:function(){
    this.setData({
      maintain:1
    })
  },
  xuanzBtmFn:function(){
    this.setData({
      maintain:2
    })
  },
  addOrder(maintain,mobile,realname){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Maintain/addOrder",{
      maintain:maintain,
      mobile:mobile,
      realname:realname
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      var order_sn=res.data.more_sn
      wx.request({
        url: app.globalData.post_url+"/index.php/index/MiniPay/getPay",
        method: "GET",
        data: {
          "open_id": wx.getStorageSync('openid'),
          "order_sn": order_sn
        },
        header: {
          "content-type": "application/json",
          "XX-Token": wx.getStorageSync('token')
        },
        success: function (e) {
          // 签权调起支付 
          wx.requestPayment({
            timeStamp: e.data.datas.timeStamp,
            nonceStr: e.data.datas.nonceStr,
            package: e.data.datas.package,
            signType: e.data.datas.signType,
            paySign: e.data.datas.paySign,
            success: function (res) {
              console.log(res, "成功")
              wx.showToast({
                title: '支付成功',
                duration:1500,
                mask:true
              })
            },
            fail: function (res) {
              console.log("支付失败", res)
              wx.showToast({
                title: '取消支付',
                icon: 'error',
              })
            },
          })
        }
      })
    })
  },
  bindName:function(e){
    this.setData({
      realname:e.detail.value
    })
  },
  bindPho:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  ljzfFn:function(){
    if(wx.getStorageSync('token') == []){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else if(this.data.realname==""){
      wx.showToast({
        icon:'none',
        title: '请输入姓名',
      })
    }else if(this.data.mobile==0){
      wx.showToast({
        icon:'none',
        title: '请输入手机号',
      })
    }else{
      this.addOrder(this.data.maintain,this.data.mobile,this.data.realname)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      maintain:options.id
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