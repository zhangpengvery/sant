// pages/enquiry/enquiry.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carno:"",
    total_quality:"",
    frameno:"",
    engineno:"",
    weizhangList:[],
    showlist:false,
    active:1,
		msgdata:"",
		neirongList:[],
  },
  enqudatel:function(e){
    this.setData({
      showlist:!this.data.showlist
    })
  },
  async weizhangApi(carno,total_quality,frameno,engineno) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/api/order/weizhang",{
      carno:carno,
      total_quality:total_quality,
      frameno:frameno,
      engineno:engineno
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    if(result.data.datas.code==200){
      this.setData({
        weizhangList: result.data.datas.data
      })
    }else{
      this.setData({
        active:2,
				msgdata:result.data.datas.msg
      })
      wx.showToast({
        icon:'none',
        title: result.data.datas.msg,
      })
    }
    console.log(result);
  },
  towweizhang:function(){
    this.weizhangApi(this.data.carno,this.data.total_quality,this.data.frameno,this.data.engineno)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.weizhangApi(options.carno,options.total_quality,options.frameno,options.engineno)
    this.setData({
      carno:options.carno,
      total_quality:options.total_quality,
      frameno:options.frameno,
      engineno:options.engineno
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