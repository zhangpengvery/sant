// pages/repair/repair.js
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
    longitude: 0,
    latitude: 0,
    longitude3: 0,
    latitude3: 0,
    scrH: 400,
    boxH: 180,
    scrY: false,
    active: 2,
    shop_name: "",
    distance: 0,
    fwdistance: 0,
    shop_tel: "",
    shop_lat: "",
    shop_lng: "",
    shop_address: "",
    scrslid: true,
    markers2: [],
    repairList: [],
    repairList2: [],
    starpageY: 0,
    chenpageY: 0,
    typefwz: 2,
    points: [{
      latitude: 0,
      longitude: 0
    }, {
      latitude: 0,
      longitude: 0
    }],
    scale1:14
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
      if (that.data.scrH == 400) {
        var sliding = that.data.starpageY - that.data.chenpageY;
        if (sliding > 30) {
          that.setData({
            scrH: 960,
            boxH: 720,
            scrY: true,
          })
        } else if (sliding < -30) {
          var hig=this.data.winH-200
          that.setData({
            scrH: 200,
            mapH:hig
          })
        }
      } else if (that.data.scrH == 960) {
        var sliding2 = that.data.chenpageY - that.data.starpageY;
        if (sliding2 > 30 && that.data.scrslid) {
          that.setData({
            scrH: 400,
            boxH: 180,
            scrY: false,
          })
        }
      } else if (that.data.scrH == 200) {
        var sliding3 = that.data.starpageY - that.data.chenpageY;
        var hig=this.data.winH-400
        if (sliding3 > 30) {
          that.setData({
            scrH: 400,
            mapH:hig
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
      })
    } else if (this.data.scrH == 960) {
      this.setData({
        scrH: 400,
        boxH: 180,
        scrY: false,
      })
    } else if (this.data.scrH == 200) {
      var hig=this.data.winH-400
      this.setData({
        scrH: 400,
        mapH:hig
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
  //服务站
  getrepairMarkers() {
    let markers = [];
    let index
    if (this.data.typefwz == 1) {
      for (index in this.data.repairList) {
        let marker = this.repairMarker(this.data.repairList[index], index);
        markers.push(marker)
      }
      wx.hideLoading()
    } else {
      for (index in this.data.repairList) {
        let marker = this.repairMarker2(this.data.repairList[index], index);
        markers.push(marker)
      }
      wx.hideLoading()
    }
    return markers;
  },
  //服务站markers
  repairMarker(point, index) {
    let latitude = point.shop_lat;
    let longitude = point.shop_lng;
    let marker = {
      iconPath:index==0?"/assets/images/zq-one.png":"/assets/images/zq.png",
      id: Number(index),
      latitude: latitude,
      longitude: longitude,
      width:index==0?48:40,
      height:index==0?48:40,
      joinCluster: true
    };
    return marker;
  },
  repairMarker2(point, index) {
    let latitude = point.shop_lat;
    let longitude = point.shop_lng;
    let marker = {
      iconPath: index==0?"/assets/images/sq-one.png":"/assets/images/sq.png",
      id: Number(index),
      latitude: latitude,
      longitude: longitude,
      width:index==0?48:40,
      height:index==0?48:40,
      joinCluster: true
    };
    return marker;
  },
  //服务站地图点击
  repairtap: function (e) {
    console.log(e.detail.markerId);
    var id = e.detail.markerId
    this.setData({
      scrH: 400,
      fwdistance: this.data.repairList[id].distance,
      shop_name: this.data.repairList[id].shop_name,
      shop_tel: this.data.repairList[id].shop_tel,
      shop_address: this.data.repairList[id].shop_address,
      shop_lat: this.data.repairList[id].shop_lat,
      shop_lng: this.data.repairList[id].shop_lng
    })
  },
  bindFwz: function () {
    var that = this
    this.setData({
      page:1,
      showBox: false,
      showFwz: false,
      typefwz: 2,
      markers2: [],
    }, function () {
      that.repairFn()
      that.repairFn2(that.data.page,that.data.latitude,that.data.longitude,that.data.typefwz)
    })
  },
  bindFwzzq: function () {
    var that = this
    this.setData({
      page:1,
      typefwz: 1,
      markers2: [],
    }, function () {
      that.repairFn()
      that.repairFn2(that.data.page,that.data.latitude,that.data.longitude,that.data.typefwz)
    })
  },
  //服务站信息
  repairFn: function () {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: 'https://jbccs.com/index.php/Api/Map/getStationDatas',
      data: {
        page: 0,
        lng: this.data.longitude,
        lat: this.data.latitude,
        type: this.data.typefwz,
      },
      header: {
        "content-type": "application/json",
        'XX-Token': wx.getStorageSync('token'),
      },
      method: "GET",
      success: (res) => {
        var lat2 = "points[" + 1 + "].latitude"
        var lng2 = "points[" + 1 + "].longitude"
        var lat3 = "points[" + 2 + "].latitude"
        var lng3 = "points[" + 2 + "].longitude"
        this.setData({
          repairList: res.data.datas,
          shop_name: res.data.datas[0].shop_name,
          fwdistance: res.data.datas[0].distance,
          shop_tel: res.data.datas[0].shop_tel,
          shop_address: res.data.datas[0].shop_address,
          shop_lat: res.data.datas[0].shop_lat,
          shop_lng: res.data.datas[0].shop_lng,
          [lat2]:Number(res.data.datas[0].shop_lat),
          [lng2]:Number(res.data.datas[0].shop_lng),
          [lat3]:Number(res.data.datas[1].shop_lat),
          [lng3]:Number(res.data.datas[1].shop_lng),
        }, function () {
          that.includePoints()
          that.setData({
            markers2: that.getrepairMarkers()
          })
        })
      }
    })
  },
  repairFn2: function (page,lat,lng,type) {
    wx.request({
      url: 'https://jbccs.com/index.php/Api/Map/getStationDatas',
      data: {
        page: page,
        lat: lat,
        lng: lng,
        type: type
      },
      header: {
        "content-type": "application/json",
        'XX-Token': wx.getStorageSync('token'),
      },
      method: "GET",
      success: (res) => {
        this.setData({
          repairList2: this.data.repairList2.concat(res.data.datas)
        })
        console.log(res);
      }
    })
  },
  loadMore() {
      this.setData({
        page: ++this.data.page
      })
      this.repairFn2(this.data.page,this.data.latitude,this.data.longitude,this.data.typefwz)
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
    if (this.data.showFwz == true) {
      const mpCtx = wx.createMapContext("map");
      mpCtx.moveToLocation();
    } else {
      const mpCtx2 = wx.createMapContext("map2");
      mpCtx2.moveToLocation();
    }
  },
  bindGohome: function () {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  binduserPho: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.pho,
    })
  },
  bindmapjia: function () {
      const mpCtx2 = wx.createMapContext("map2");
      mpCtx2.getScale({
        success:(res)=>{
          var scal=res.scale+1
          if(scal>19){
            return
          }else{
            this.setData({
              scale1:scal
            })
          }
        }
      });
  },
  bindmaphao: function () {
    const mpCtx2 = wx.createMapContext("map2");
      mpCtx2.getScale({
        success:(res)=>{
          var scal=res.scale-1
          if(scal<4){
            return
          }else{
            this.setData({
              scale1:scal
            })
          }
        }
      });
  },
  includePoints:function(){
    const mapCtx2 = wx.createMapContext("map2");
      mapCtx2.includePoints({
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
          that.repairFn()
          that.repairFn2(that.data.page,res.latitude,res.longitude,that.data.typefwz)
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
    this.weizhi()
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