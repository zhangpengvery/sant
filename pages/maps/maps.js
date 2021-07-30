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
    winH:0,
    mapH:0,
    page: 1,
    TopH: 0,
    type: 1,
    longitude: 0,
    latitude: 0,
    longitude2: 0,
    latitude2: 0,
    longitude3: 0,
    latitude3: 0,
    scrH: 380,
    boxH: 180,
    scrY: false,
    active: 2,
    name: "",
    distance: 0,
    avator: "",
    user_mobile: "",
    scrslid: true,
    markers: [],
    userList: [],
    userList2: [],
    starpageY: 0,
    chenpageY: 0,
    service_uid: 0,
    service: 0,
    timer: '',
    points: [{
      latitude: 0,
      longitude: 0
    }, {
      latitude: 0,
      longitude: 0
    }],
    scale:16
  },
  //1重汽2陕汽
  scrBtnFn: function (e) {
    if (e.detail.scrollTop > 30) {
      this.setData({
        scrslid:false
      })
    } else if(e.detail.scrollTop<30){
      this.setData({
        scrslid: true
      })
    }
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
      if (that.data.scrH == 380) {
        var sliding = that.data.starpageY - that.data.chenpageY;
        if (sliding > 30) {
          that.setData({
            scrH: 900,
            boxH: 720,
            scrY: true,
          })
        }
      } else if (that.data.scrH == 900) {
        var sliding2 = that.data.chenpageY - that.data.starpageY;
        if (sliding2 > 30 && that.data.scrslid) {
          that.setData({
            scrH: 380,
            boxH: 180,
            scrY: false,
          })
        }
      }
    })
  },
  bindTapFn: function () {
    if (this.data.scrH == 380) {
      this.setData({
        scrH: 900,
        boxH: 720,
        scrY: true,
      })
    } else if (this.data.scrH == 900) {
      this.setData({
        scrH: 380,
        boxH: 180,
        scrY: false,
      })
    }
  },
  //订单管理点击
  bindDdgl: function () {
    if (wx.getStorageSync('token') == []) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else if(this.data.service==1){
      wx.navigateTo({
        url: '/pages/services/services',
      })
    }else if(this.data.service==0){
      wx.navigateTo({
        url: '/pages/allding/allding',
      })
    }
  },
  //一键报修点击
  bindYjbx: function (e) {
    if (wx.getStorageSync('token') == []) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/pushbx/pushbx?service_uid='+e.currentTarget.dataset.service_uid+"&user_name="+e.currentTarget.dataset.name,
      })
    }
  },
  bindPho: function (e) {
    if (wx.getStorageSync('token') == []) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.pho,
      })
    }
  },
  //人力
  getLingyuanMarkers() {
    let markers = [];
    for (let item of this.data.userList2) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  //人力markers
  createMarker(point) {
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: point.id == 0 ? "https://jbccs.com/./Upload/image/2021-05-31/60b48a3d9b37c.png" : "https://jbccs.com/./Upload/image/2021-05-31/60b48b792b043.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: point.id == 0 ? 78 : 60,
      height: point.id == 0 ? 72 : 60,
    };
    return marker;
  },
  markertap: function (e) {
    var id = e.detail.markerId
    this.setData({
      scrH: 380,
      name: this.data.userList[id].user_name,
      distance: this.data.userList[id].distance,
      avator: this.data.userList[id].avator,
      user_mobile: this.data.userList[id].user_mobile,
      service_uid: this.data.userList[id].user_id
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
        if (res.statusCode == 200) {
          wx.hideLoading()
        }
        var lat2 = "points[" + 1 + "].latitude"
        var lng2 = "points[" + 1 + "].longitude"
        var lat3 = "points[" + 2 + "].latitude"
        var lng3 = "points[" + 2 + "].longitude"
        this.setData({
          userList: res.data.datas.user_list,
          name: res.data.datas.user_list[0].user_name,
          distance: res.data.datas.user_list[0].distance,
          avator: res.data.datas.user_list[0].avator,
          user_mobile: res.data.datas.user_list[0].user_mobile,
          service_uid: res.data.datas.user_list[0].user_id,
          [lat2]:Number(res.data.datas.user_list[0].lat),
          [lng2]:Number(res.data.datas.user_list[0].lng),
          [lat3]:Number(res.data.datas.user_list[1].lat),
          [lng3]:Number(res.data.datas.user_list[1].lng),
        }, function () {
          that.includePoints()
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
        lng: this.data.longitude2,
        lat: this.data.latitude2,
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
  loadMore() {
    if (this.data.showBox == false) {
      this.setData({
        page: ++this.data.page
      })
      this.repairFn2(this.data.page,this.data.latitude,this.data.longitude,this.data.typefwz)
    }
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
  //判断是工作人员还是用户
  async getUserInfo() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/User/getUserInfo")
    this.setData({
      service: result.data.datas.user_info.user_is_service
    })
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
  bindmapjia: function () {
      const mpCtx = wx.createMapContext("map");
      mpCtx.getScale({
        success:(res)=>{
          var scal=res.scale+1
          if(scal>19){
            return
          }else{
            this.setData({
              scale:scal
            })
          }
        }
      });
  },
  bindmaphao: function () {
    const mpCtx = wx.createMapContext("map");
      mpCtx.getScale({
        success:(res)=>{
          var scal=res.scale-1
          if(scal<4){
            return
          }else{
            this.setData({
              scale:scal
            })
          }
        }
      });
  },
  includePoints:function(){
    var that=this
    const mapCtx1 = wx.createMapContext("map");
      mapCtx1.includePoints({
        padding: [ 80,],
        points: this.data.points
      })
  },
  binddingw:function(e){
    this.setData({
      latitude3:e.currentTarget.dataset.lat,
      longitude3:e.currentTarget.dataset.lng
    })
  },
  weizhi:function(){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        var lat = "points[" + 0 + "].latitude"
        var lon = "points[" + 0 + "].longitude"
        this.setData({
          active:1,
          latitude: res.latitude,
          longitude: res.longitude,
          [lat]: res.latitude,
          [lon]: res.longitude,
          latitude3:res.latitude,
          longitude3:res.longitude
        }, function () {
          that.userListFn()
        })
      },
      fail:(res)=>{
        wx.getSystemInfo({
          success: (res) => {
            if(res.locationEnabled){
              this.setData({
                active:3
              })
            }else{
              this.setData({
                active:2
              })
            }
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio
        this.setData({
          winH:ScrH+app.globalData.navbarHeight-result.statusBarHeight,
          TopH: result.statusBarHeight + 10,
          mapH:ScrH-280+app.globalData.navbarHeight-result.statusBarHeight
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
    this.weizhi()
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