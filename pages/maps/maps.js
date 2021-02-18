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
    TopH:0,
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
    shop_lat:"",
    shop_lng:"",
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
    broList:[],
    starpageY:0,
    chenpageY:0,
    service_uid:0,
    //倒计时
    hr: 0,
    min: 0,
    sec: 0,
    end:0,
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
      url: 'https://jbccs.com/index.php/Api/Map/getMapDatas',
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
  bindDdgl:function(){
    if(wx.getStorageSync('token')==[]){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      this.setData({
        active: 2
      })
    }
  },
  //订单管理点击
  bindYjbx: function (e) {
    if(wx.getStorageSync('token')==[]){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      this.setData({
        service_uid:e.currentTarget.dataset.service_uid
      })
      this.checkRepair()
    }
  },
  //一键报修
  postRepair(service_uid){
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/repair",{
      service_uid:service_uid
    }).then(res=>{
      this.setData({
        broList:res.data,
        active: 2
      })
      console.log(res);
    })
  },
  checkRepair(){
    requestApi1(app.globalData.post_url+"/index.php/Api/Map/checkRepair").then(res=>{
      if(res.data.code==400){
        wx.showToast({
          icon:'error',
          title: '有未完成的报修',
        })
        this.setData({
          active: 2
        })
      }else{
        this.postRepair(this.data.service_uid)
      }
    })
  },
  //获取当前订单
  async getRepairInfo() {
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Map/getRepairInfo")
    console.log(result);
    this.setData({
      broList: result.data,
      end:result.data.create_time
    },function(){
      that.countdown()
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
      iconPath: "/assets/images/xg-on.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: 40,
      height: 40,
    };
    return marker;
  },
  //服务站markers
  repairMarker(point) {
    let latitude = point.shop_lat;
    let longitude = point.shop_lng;
    let marker = {
      iconPath: "/assets/images/sq.png",
      id: Number(point.shop_id) || 0,
      latitude: latitude,
      longitude: longitude,
      width: 40,
      height: 40,
    };
    return marker;
  },
  markertap: function (e) {
    if(e.type=="markertap"){
      var id = e.detail.markerId
      var name = this.data.userList[id].user_name;
      var distance = this.data.userList[id].distance;
      var avator = this.data.userList[id].avator;
      var user_mobile = this.data.userList[id].user_mobile;
      var service_uid =this.data.userList[id].user_id
      this.setData({
        scrH:540,
        name: name,
        distance: distance,
        avator: avator,
        user_mobile: user_mobile,
        service_uid:service_uid
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
    var shop_address=this.data.repairList[id-1].shop_address;
    var shop_lat=this.data.repairList[id-1].shop_lat;
    var shop_lng=this.data.repairList[id-1].shop_lng;
    this.setData({
      scrH:540,
      fwdistance: fwdistance,
      shop_name:shop_name,
      shop_tel:shop_tel,
      shop_address:shop_address,
      shop_lng:shop_lng,
      shop_lat:shop_lat
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
      url: 'https://jbccs.com/index.php/Api/Map/getMapDatas',
      data: {
        lng: this.data.longitude,
        lat: this.data.latitude,
        type: this.data.type
      },
      method:"GET",
      header: {
        "content-type": "application/json",
        'XX-Token':wx.getStorageSync('token'),
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
          is_pay: res.data.datas.user_list[0].is_pay,
          service_uid:res.data.datas.user_list[0].user_id
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
      url: 'https://jbccs.com/index.php/Api/Map/getStationDatas',
      data: {
        lng: this.data.longitude,
        lat: this.data.latitude
      },
      header: {
        "content-type": "application/json",
        'XX-Token':wx.getStorageSync('token'),
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
          shop_address:res.data.datas[0].shop_address,
          shop_lat:res.data.datas[0].shop_lat,
          shop_lng:res.data.datas[0].shop_lng
        },function(){
          that.setData({
            markers:that.getrepairMarkers()
          })
        })
      }
    })
  },
  bindgoDitu:function(e){
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      scale: 18,
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.address
    })
  },
  clickControl:function(){
    if(this.data.showFwz==true){
      const mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
    }else{
      const mpCtx2 = wx.createMapContext("map2");
    mpCtx2.moveToLocation();
    }
  },
  bindGohome:function(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
    wx.showTabBar({
      animation: true,
    })
  },
  countdown() {  //设定倒计时
    var end_time = this.data.end*1000+7200000;
    var msec =end_time - Date.parse(new Date());
    if(msec>0){
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.hr = hr > 9 ? hr : "0" + hr;
      this.min = min > 9 ? min : "0" + min;
      this.sec = sec > 9 ? sec : "0" + sec;
      const that = this;
      setTimeout(function () {
        that.countdown();
      }, 1000);
      this.setData({
        hr:this.hr,
        min:this.min,
        sec:this.sec,
      })
    }else{
      this.setData({
        hr:"已",
        min:"超",
        sec:"时"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRepairInfo()
    wx.hideTabBar({
      animation : true,
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
    wx.getSystemInfo({
      success: (result) => {
        console.log(result.statusBarHeight);
        this.setData({
          TopH:result.statusBarHeight+10
        })
      },
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