// pages/catinfor/catinfor.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    navH:0,
    allshow:0,
    allactive:0,
    addressList:[],
    dixian:true
  },
  tokenFn(){
    requestApi1(app.globalData.base_url+"/txjLogin",).then(res=>{
      var timestamp=Date.parse(new Date())
      var expiration=timestamp+1200000
      wx.setStorage({
        data: res.data.data.data.token,
        key: 'txj-token',
      })
      wx.setStorage({
        data: expiration,
        key: 'txjTime',
      })
      console.log(res);
    })
  },
  bindallshowFn:function(){
    if(this.data.allactive==1){
      this.setData({
        allactive:0,
        allshow:0,
      })
    }else if(this.data.allactive==0){
      this.setData({
        allshow:64,
        allactive:1
      })
    }
  },
  bindallcarFn:function(){
    wx.navigateTo({
      url: '/pages/tjclcar/tjclcar',
    })
  },
  bindincrease:function(e){
    wx.navigateTo({
      url: '/pages/position/position?vin='+e.currentTarget.dataset.vin,
    })
  },
  bindallTjcl:function(e){
    wx.navigateTo({
      url: '/pages/track/track?vin='+e.currentTarget.dataset.vin,
    })
  },
  async addressList() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Car/address_list")
    if(result.data.datas.car_list.length==0){
      this.setData({
        dixian:false
      })
    }
    this.setData({
      addressList: result.data.datas.car_list
    })
    console.log(this.data.addressList);
  },
  bindtabCar:function(e){
    // console.log(e.currentTarget.dataset.index);
    this.setData({
      active:e.currentTarget.dataset.index,
      allshow:0,
      allactive:0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addressList()
    var timestamp=Date.parse(new Date())
    if(wx.getStorageSync('txj-token')==[]){
      this.tokenFn()
    }else if(timestamp>wx.getStorageSync('txjTime')){
      this.tokenFn()
    }
    // this.tokenFn()
    this.setData({
      navH:app.globalData.navbarHeight,
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