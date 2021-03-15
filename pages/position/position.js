// pages/position/position.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:39.90960456049752,
    longitude:116.3972282409668,
    markers:[
      {
        id:0,
        latitude:39.90960456049752,
        longitude:116.3972282409668,
        iconPath:"/assets/images/stcar.png",
        width:45,
        height:35
      }
    ]
  },
  txjLocation(vins,token){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url+"/txjLocation",{
      vins:vins,
      token:token
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      var lat="markers[" + 0 + "].latitude";
      var lng="markers[" + 0 + "].longitude"
      this.setData({
        latitude:res.data.data.data[0].lat,
        longitude:res.data.data.data[0].lng,
        [lat]:res.data.data.data[0].lat,
        [lng]:res.data.data.data[0].lng,
        txjLocation:res.data.data.data[0]
      })
      console.log(res);
    })
  },
  bindgo:function(e){
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      scale: 18,
      name: e.currentTarget.dataset.address,
      address: e.currentTarget.dataset.address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.vin);
    this.txjLocation(options.vin,wx.getStorageSync('txj-token'))
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
    // this.getUserLocation()
    // const _locationChangeFn = res => {
    //   console.log('location change', res.latitude, res.longitude)
    // }
    // wx.onLocationChange(_locationChangeFn);
    //----------------分界线----------------
    // wx.startLocationUpdate({
    //   success: (res) => {
    //     wx.onLocationChange((res) => {
    //       //获取当前时间
    //       var currentTime = new Date().getTime();
    //       //获取上次保存的位置信息
    //       var oldLocation = wx.getStorageSync('oldLocation');
    //       //获取上次执行的时间
    //       var oldTime = wx.getStorageSync('oldTime');
    //       //将经纬度拼接
    //       var newLocation = res.latitude + "" + res.longitude;
    //       //判断当前的位置是否和上次位置不一致
    //       if (oldLocation != newLocation) {
    //         //缓存当前最新位置
    //         wx.setStorageSync('oldLocation', newLocation);
    //         //缓存当前执行的时间
    //         wx.setStorageSync('oldTime', currentTime);
    //         //如果本次执行时间距离上次时间超过5s，将位置信息上传后台
    //         if (currentTime - oldTime > 3000) {
    //           console.log(res.latitude);
    //           console.log(res.longitude);
    //           this.setData({
    //             latitude:res.latitude,
    //             longitude:res.longitude
    //           })
    //         }
    //       }
    //     });
    //   },
    //   fail: (err) => {
    //     that.setData({
    //       modalName: 'DialogModal1'
    //     });
    //   }
    // })
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