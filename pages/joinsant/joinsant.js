// pages/joinsant/joinsant.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopH: 0,
    type: 3,
    longitude: 0,
    latitude: 0,
    longitude2: 0,
    latitude2: 0,
    scrH: 400,
    boxH: 180,
    scrY: false,
    active: 1,
    name: "",
    shop_name: "",
    distance: 0,
    fwdistance: 0,
    avator: "",
    user_mobile: "",
    shop_tel: "",
    shop_lat: "",
    shop_lng: "",
    text: "",
    shop_address: "",
    is_pay: 0,
    showGao: false,
    showBox: true,
    scrslid: true,
    markers: [],
    userList: [],
    userList2: [],
    broList: [],
    getServiceInfo: [],
    starpageY: 0,
    chenpageY: 0,
    user_id: 0,
    //倒计时
    hr: 0,
    min: 0,
    sec: 0,
    end: 0,
    userNo: false,
    userOrder: true,
    service: 0,
    scaner:0,
    manager:0,
    seractive: 1,
    timer: '',
  },
  scrTopFn: function (e) {
    this.setData({
      scrslid: true
    })
  },
  scrBtnFn: function () {
    this.setData({
      scrslid: false
    })
  },
  bindstartFn: function (e) {
    this.setData({
      starpageY: e.changedTouches[0].pageY
    })
  },
  bindchendFn: function (e) {
    var that = this
    this.setData({
      chenpageY: e.changedTouches[0].pageY
    }, function () {
      if (that.data.scrH == 400) {
        var sliding = that.data.starpageY - that.data.chenpageY;
        if (sliding > 30) {
          that.setData({
            scrH: 960,
            boxH: 720,
            scrY: true,
            showGao: true
          })
        } else if (sliding < -30) {
          that.setData({
            scrH: 200,
          })
        }
      } else if (that.data.scrH == 960) {
        var sliding2 = that.data.chenpageY - that.data.starpageY;
        if (sliding2 > 30 && that.data.scrslid) {
          that.setData({
            scrH: 400,
            boxH: 180,
            scrY: false,
            showGao: false
          })
        }
      }else if(that.data.scrH==200){
        var sliding3 = that.data.starpageY - that.data.chenpageY;
        if (sliding3 > 30) {
          that.setData({
            scrH: 400
          })
        }
      }
    })
  },
  bindTapFn: function () {
    if (this.data.scrH == 400) {
      this.setData({
        scrH: 960,
        boxH: 720,
        scrY: true,
        showGao: true
      })
    } else if (this.data.scrH == 960) {
      this.setData({
        scrH: 400,
        boxH: 180,
        scrY: false,
        showGao: false
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
      method: "GET",
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
  bindJrzy: function () {
    if (this.data.showFwz == false) {
      this.startSetInter()
    }
    this.setData({
      showFwz: true,
      showBox: true,
      type: 3
    })
    this.userListFn()
  },
  bindCxzy: function () {
    if (this.data.showFwz == false) {
      this.startSetInter()
    }
    this.setData({
      showFwz: true,
      showBox: true,
      type: 4
    })
    this.userListFn()
  },
  bindJsq:function(){
    wx.navigateTo({
      url: '/pages/counter/counter',
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
      if(this.data.type==3){
        for (let item of this.data.userList2) {
          let marker = this.createMarker(item);
          markers.push(marker)
        }
      }else if(this.data.type==4){
        for (let item of this.data.userList2) {
          let marker = this.createMarker2(item);
          markers.push(marker)
        }
      }
    return markers;
  },
  //人力markers
  createMarker(point) {
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: "/assets/images/dcy.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: 40,
      height: 51,
    };
    return marker;
  },
  createMarker2(point) {
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: "/assets/images/cxzy.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: 45,
      height: 51,
    };
    return marker;
  },
  markertap: function (e) {
    if (e.type == "markertap") {
      var id = e.detail.markerId
      var name = this.data.userList[id].user_name;
      var distance = this.data.userList[id].distance;
      var avator = this.data.userList[id].avator;
      var user_mobile = this.data.userList[id].user_mobile;
      var user_id = this.data.userList[id].user_id
      this.setData({
        scrH: 400,
        name: name,
        distance: distance,
        avator: avator,
        user_mobile: user_mobile,
        user_id: user_id
      })
    }
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
          userList: res.data.datas.user_list,
          name: res.data.datas.user_list[0].user_name,
          distance: res.data.datas.user_list[0].distance,
          avator: res.data.datas.user_list[0].avator,
          user_mobile: res.data.datas.user_list[0].user_mobile,
          text: res.data.datas.user_list[0].text,
          is_pay: res.data.datas.user_list[0].is_pay,
          user_id: res.data.datas.user_list[0].user_id,
        }, function () {
          that.setData({
            markers: that.getLingyuanMarkers()
          })
        })
      }
    })
  },
  //刷新数据
  userListFn2: function () {
    var that = this
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
        this.setData({
          userList2: res.data.datas.user_list,
        }, function () {
          that.setData({
            markers: that.getLingyuanMarkers()
          })
        })
      }
    })
  },
  bindgoDitu: function (e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      scale: 18,
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.address
    })
  },
  clickControl: function () {
    const mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },
  bindGohome: function () {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  //判断是销售还是金融专业
  async getUserInfo() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/User/getUserInfo")
    this.setData({
      service: result.data.datas.user_info.user_is_seller,
      scaner: result.data.datas.user_info.user_is_scaner,
      manager:result.data.datas.user_info.user_is_scaner_manager
    })
    console.log(result.data.datas.user_info);
  },
  binduserPho: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  confirmService(id) {
    requestApi1(app.globalData.post_url + "/index.php/Api/Map/confirmService", {
      id: id
    }).then(res => {
      this.getServiceInfo()
      console.log(res);
    })
  },
  bindTaking: function (e) {
    this.confirmService(e.currentTarget.dataset.id)
  },
  //定时刷新计时器
  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.timer = setInterval(
      function () {
        that.userListFn2()
      }
      , 3000);
  },
  //结束定时刷新
  endInter: function () {
    var that = this;
    clearInterval(that.data.timer)
  },
  bindYjpd:function(e){
    console.log(e.currentTarget.dataset.user_id);
    wx.navigateTo({
      url: '/pages/survey/survey?'+"user_id="+e.currentTarget.dataset.user_id+'&index='+e.currentTarget.dataset.index,
    })
  },
  bindGolist:function(){
    if(this.data.service==1){
      wx.navigateTo({
        url: '/pages/surlist/surlist',
      })
    }else if(this.data.scaner==1){
      wx.navigateTo({
        url: '/pages/finlist/finlist',
      })
    }
  },
  bindalllist:function(){
    wx.navigateTo({
      url: '/pages/alllist/alllist',
    })
  },
  bindpaidan:function(){
    wx.navigateTo({
      url: '/pages/survey2/survey2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
          TopH: result.statusBarHeight + 10
        })
      },
    })
    this.startSetInter()
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
    var that=this
    wx.startLocationUpdate({
      success: (res) => {
        wx.onLocationChange((res) => {
          this.setData({
            latitude2: res.latitude,
            longitude2: res.longitude
          })
        });
      },
      fail: (err) => {
        that.setData({
          modalName: 'DialogModal1'
        });
      }
    })
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
    this.endInter()
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