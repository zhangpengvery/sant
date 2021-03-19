// pages/switch/switch.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    type:3,
    typeIndex:0,
    user_list:[],
    user_id:0,
    markers:[
      {
        user_name:'请选择'
      }
    ],
  },
  scanTrans(trans_id,id){
    requestApi1(app.globalData.post_url+"/index.php/Api/Scan/trans",{
      trans_id:trans_id,
      id:id
    }).then(res=>{
      if(res.data.datas==1){
        wx.redirectTo({
          url: '/pages/finlist/finlist',
        })
      }
    })
  },
  userListFn: function () {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://jbccs.com/index.php/Api/Map/getMapDatas',
      data: {
        lng: this.data.longitude,
        lat: this.data.latitude,
        type: this.data.type
      },
      method: "GET",
      header: {
        "content-type": "application/json",
        'XX-Token': wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res.data.datas);
        if (res.statusCode == 200) {
          wx.hideLoading()
        }
        this.setData({
          user_list: res.data.datas.user_list
        }, function () {
          that.setData({
            markers:that.data.markers.concat(that.getLingyuanMarkers()) 
          })
        })
      }
    })
  },
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.user_list) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  createMarker(point) {
    let marker = {
      user_id: point.user_id,
      user_name:point.user_name
    };
    return marker;
  },
  bindTypeChange: function (e) {
    this.setData({
      user_id: this.data.markers[e.detail.value].user_id,
      typeIndex: e.detail.value
    })
  },
  bddhFn:function(){
    if(this.data.typeIndex>0){
      this.scanTrans(this.data.user_id,this.data.id)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude: latitude,
          longitude: longitude
        }, function () {
          that.userListFn()
        })
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