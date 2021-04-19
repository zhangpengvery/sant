// pages/evendeta/evendeta.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
let wxParse = require("../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:34.72491238064236,
    longitude:113.82838704427083,
    id:0,
    realname:"",
    mobile:"",
    getInfo:[],

  },
  async getInfo(id) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Activity/getInfo",{
      id:id
    })
    this.setData({
      getInfo: result.data
    })
    // wxParse.wxParse('content', 'html', result.data.content, this);
    console.log(this.data.getInfo);
  },
  ActivityAdd(id,mobile,realname){
    wx.showLoading({
      title: '提交中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Activity/add",{
      id:id,
      mobile:mobile,
      realname:realname
    }).then(res=>{
      wx.hideLoading()
      if(res.data.datas==1){
        wx.showToast({
          title: '报名成功',
        })
      }else if(res.data.code==400){
        wx.showToast({
          icon:'none',
          title: res.data.datas.error,
        })
      }
    })
  },
  onShareAppMessage:function(res) {
    return {
      title:'分享标题',
      path:'/pages/evendeta/evendeta?id='+this.data.id,
    }
  },
  onShareTimeline: function () {
    return {
      title: '分享标题',
      imageUrl: this.data.getInfo.img
    }
  },
  binddianhua:function(){
    wx.makePhoneCall({
      phoneNumber: '4009007819',
    })
  },
  goGoingFn: function (e) {
    wx.openLocation({
      latitude:Number(e.currentTarget.dataset.lat) ,
      longitude:Number(e.currentTarget.dataset.lng) ,
      scale: 18,
      name: '三泰汽车郑州总部',
      address: e.currentTarget.dataset.address
    })
  },
  bindname:function(e){
    this.setData({
      realname:e.detail.value
    })
  },
  bindpho:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  bindbao:function(){
    if(this.data.realname==""){
      wx.showToast({
        title: '请输入姓名',
      })
    }else if(this.data.mobile==""){
      wx.showToast({
        title: '请输入手机号',
      })
    }else{
      this.ActivityAdd(this.data.id,this.data.mobile,this.data.realname)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options.id)
    this.setData({
      id:options.id
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