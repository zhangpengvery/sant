// pages/pushbx/pushbx.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service_uid:"",
    lat:"",
    lng:"",
    reason:"",
    name:"",
    address:""
  },
  bindaddress:function(e){
    this.setData({
      reason:e.detail.value
    })
  },
  postRepair(service_uid,lat,lng,reason,address) {
    wx.showLoading({
      title: '提交中...',
    })
    var that = this
    requestApi1(app.globalData.post_url + "/index.php/Api/Map/repair", {
      service_uid: service_uid,
      lat:lat,
      lng,lng,
      reason:reason,
      address:address
    }).then(res => {
      if(res.data.datas==1){
        wx.showToast({
          title: '提交成功',
          duration:1500,
          mask:true
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/warranty/warranty?id='+res.data.id,
          })
        }, 1500)
      }else{
        wx.showToast({
          icon:'none',
          title: '提交失败',
        })
      }
    })
  },
  bddhFn:function(){
    this.postRepair(this.data.service_uid,this.data.lat,this.data.lng,this.data.reason,this.data.address)
  },
  getProvinceName(latitude, longitude) {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',
      data: {},
      success: (res) => {
        this.setData({
          address: res.data.result.address
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          lat: res.latitude,
          lng: res.longitude
        }, function () {
          that.getProvinceName(res.latitude, res.longitude)
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '请开启定位',
        })
      }
    })
    this.setData({
      service_uid:options.service_uid,
      name:options.user_name
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