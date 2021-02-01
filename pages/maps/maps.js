// pages/maps/maps.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    longitude: 0,
    latitude: 0,
    scrH: 540,
    boxH: 180,
    scrY: false,
    active: 1,
    name: "",
    shop_name:"",
    distance: 0,
    fwdistance:0,
    avator: "",
    user_mobile: "",
    shop_tel:"",
    text: "",
    shop_address:"",
    is_pay: 0,
    showGao: false,
    showFwz:true,
    showBox:true,
    scrslid:true,
    markers: [],
    userList: [],
    repairList:[],
    starpageY:0,
    chenpageY:0,
  },
  scrTopFn:function(e){
    this.setData({
      scrslid:true
    })
  },
  scrBtnFn:function(){
    this.setData({
      scrslid:false
    })
  },
  bindstartFn:function(e){
    this.setData({
      starpageY:e.changedTouches[0].pageY
    })
  },
  bindchendFn:function(e){
    var that=this
    this.setData({
      chenpageY:e.changedTouches[0].pageY
    },function(){
      if(that.data.scrH == 540){
        var sliding=that.data.starpageY-that.data.chenpageY;
        if(sliding>30){
          that.setData({
            scrH: 1080,
            boxH: 720,
            scrY: true,
            showGao: true
          })
        }else if(sliding<-30){
          that.setData({
            scrH:280,
          })
        }
      }else if(that.data.scrH == 1080){
        var sliding2=that.data.chenpageY-that.data.starpageY;
        if(sliding2>30&&that.data.scrslid){
          that.setData({
            scrH: 540,
            boxH: 180,
            scrY: false,
            showGao: false
          })
        }
      }else if(that.data.scrH==280){
        var sliding3=that.data.starpageY-that.data.chenpageY;
        if(sliding3>30){
          that.setData({
            scrH:540
          })
        }
      }
    })
  },
  bindTapFn: function () {
    if (this.data.scrH == 540) {
      this.setData({
        scrH: 1080,
        boxH: 720,
        scrY: true,
        showGao: true
      })
    } else if (this.data.scrH == 1080) {
      this.setData({
        scrH: 540,
        boxH: 180,
        scrY: false,
        showGao: false
      })
    }else if(this.data.scrH==280){
      this.setData({
        scrH:540
      })
    }
  },
  getMapDatas() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.jbccs.com/index.php/Api/Map/getMapDatas',
      data: {
        lng: this.data.longitude,
        lat: this.data.latitude,
        type: this.data.type
      },
      header: {
        "content-type": "application/json",
      },
      method:"GET",
      success: (res) => {
        if (res.statusCode == 200) {
          wx.hideLoading()
        }
        this.setData({
          userList: res.data.datas.user_list,
        })
      }
    })
  },
  bindFwgj: function () {
    this.setData({
      showFwz:true,
      showBox:true,
      type: 1
    })
    this.userListFn()
  },
  bindCmsc: function () {
    this.setData({
      showFwz:true,
      showBox:true,
      type: 2
    })
    this.userListFn()
  },
  bindJrzy: function () {
    this.setData({
      showFwz:true,
      showBox:true,
      type: 3
    })
    this.userListFn()
  },
  bindCxzy: function () {
    this.setData({
      showFwz:true,
      showBox:true,
      type: 4
    })
    this.userListFn()
  },
  bindCygn: function () {
    this.setData({
      active: 1,
    })
  },
  bindYjbx: function () {
    this.setData({
      active: 2
    })
  },
  bindPho: function (e) {
    if (e.currentTarget.dataset.pay == 1) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.pho,
      })
    } else if (wx.getStorageSync('token') == []) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      console.log(1);
    }
  },
  //人力
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.userList) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  //服务站
  getrepairMarkers() {
    let markers = [];
    for (let item of this.data.repairList) {
      let marker = this.repairMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  //人力markers
  createMarker(point) {
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: "/assets/images/markers.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: 30,
      height: 30,
    };
    return marker;
  },
  //服务站markers
  repairMarker(point) {
    let latitude = point.shop_lat;
    let longitude = point.shop_lng;
    let marker = {
      iconPath: "/assets/images/markers.png",
      id: Number(point.shop_id) || 0,
      latitude: latitude,
      longitude: longitude,
      width: 30,
      height: 30,
    };
    return marker;
  },
  markertap: function (e) {
    if(e.type=="markertap"){
      var id = e.detail.markerId
      var name = this.data.userList[id].user_name;
      var distance = this.data.userList[id].distance;
      var avator = this.data.userList[id].avator;
      var user_mobile = this.data.userList[id].user_mobile
      this.setData({
        scrH:540,
        name: name,
        distance: distance,
        avator: avator,
        user_mobile: user_mobile
      })
    }
  },
  //服务站地图点击
  repairtap: function (e) {
    console.log(e.detail.markerId);
    var id = e.detail.markerId
    var fwdistance = this.data.repairList[id-1].distance;
    var shop_name=this.data.repairList[id-1].shop_name;
    var shop_tel=this.data.repairList[id-1].shop_tel;
    var shop_address=this.data.repairList[id-1].shop_address
    this.setData({
      scrH:540,
      fwdistance: fwdistance,
      shop_name:shop_name,
      shop_tel:shop_tel,
      shop_address:shop_address
    })
  },
  bindFwz: function () {
    var that=this
    this.setData({
      showBox:false,
      showFwz:false
    },function(){
      that.repairFn()
    })
  },
  userListFn: function () {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.jbccs.com/index.php/Api/Map/getMapDatas',
      data: {
        lng: this.data.longitude,
        lat: this.data.latitude,
        type: this.data.type
      },
      method:"GET",
      header: {
        "content-type": "application/json",
      },
      success: (res) => {
        console.log(res.data.datas);
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          userList: res.data.datas.user_list,
          name: res.data.datas.user_list[0].user_name,
          distance: res.data.datas.user_list[0].distance,
          avator: res.data.datas.user_list[0].avator,
          user_mobile: res.data.datas.user_list[0].user_mobile,
          text: res.data.datas.user_list[0].text,
          is_pay: res.data.datas.user_list[0].is_pay
        }, function () {
          that.setData({
            markers: that.getLingyuanMarkers()
          })
        })
      }
    })
  },
  //服务站信息
  repairFn: function () {
    var that=this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.jbccs.com/index.php/Api/Map/getStationDatas',
      data: {
        lng: this.data.longitude,
        lat: this.data.latitude
      },
      header: {
        "content-type": "application/json",
      },
      method:"GET",
      success: (res) => {
        console.log(res);
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          repairList:res.data.datas,
          shop_name:res.data.datas[0].shop_name,
          fwdistance:res.data.datas[0].distance,
          shop_tel:res.data.datas[0].shop_tel,
          shop_address:res.data.datas[0].shop_address
        },function(){
          that.setData({
            markers:that.getrepairMarkers()
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar()
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
   * 生命周期函数--监听页面初次渲染完成wgs84
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