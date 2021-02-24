// pages/stordetail/stordetail.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getFoursInfo:[],
    latitude:0,
    longitude:0,
    id:0
  },
  async getFoursInfo(lng,lat,id) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/Wap/Api/getFoursInfo",{
      lng:lng,
      lat:lat,
      id:id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    console.log(result);
    this.setData({
      getFoursInfo: result.data.datas
    })
  },
  goGoingFn:function(e){
    wx.openLocation({
      latitude:Number(e.currentTarget.dataset.lat),
      longitude:Number(e.currentTarget.dataset.lng),
      scale:18,
      name:e.currentTarget.dataset.name,
      address:e.currentTarget.dataset.address
    })
  },
  bindShopFn:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.shop,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    console.log(options.id);
    wx.getLocation({
      type: 'gcj02',
      success:(res)=> {
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        this.getFoursInfo(this.data.longitude,this.data.latitude,this.data.id)
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