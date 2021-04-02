// pages/clockin/clockin.js
const util = require("../../utils/util.js");
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    lat: 0,
    lng: 0,
    latitude: 0,
    longitude: 0,
    currentTime: 0,
    clockin: "",
    r_type: 0,
    q_type:1,
    status: 0,
    user: [],
    name: '',
    getCheck: [],
    getCheck2: [],
    address: "",
    id:0,
    winH:0,
    flge:0
  },
  //时间
  time() {
    var that = this
    setInterval(function () {
      const _currentTime = util.formatTime(new Date()).split(" ")[1];
      that.setData({
        currentTime: _currentTime,
      });
    }, 1000)
  },
  //获取用户的经纬度
  findXy() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        }, function () {
          that.getCheck(that.data.lat, that.data.lng)
        })
      },
      fail(){
        that.setData({
          clockin:"无法打卡",
          active:3,
          flge:1
        })
      }
    })
  },
  //半径
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  //距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    if(this.data.flge==1){
      this.setData({
        flge:2
      })
      this.getCheck(this.data.latitude,this.data.longitude)
    }
    // lat1用户的纬度
    // lng1用户的经度
    // lat2公司的纬度
    // lng2公司的经度
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2)
    console.log('经纬度计算的距离:' + s)
    if (s > 0.5) {
      this.setData({
        active: 2,
        q_type:2,
        clockin:"外勤打卡"
      })
    } else if (s <= 0.5) {
      this.setData({
        active: 1,
        q_type:1,
      })
    }
  },
  //详细地址
  getProvinceName(latitude, longitude) {
    var that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',
      data: {},
      success: (res) => {
        console.log(res);
        var address = res.data.result.address + res.data.result.formatted_addresses.recommend
        this.setData({
          address: address
        }, function () {
          that.clickinFn(that.data.latitude, that.data.longitude, that.data.r_type, that.data.status, that.data.address,that.data.q_type,0,0)
        })
      },
    })
  },
  getProvinceName2(latitude, longitude) {
    var that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',
      data: {},
      success: (res) => {
        console.log(res);
        var address = res.data.result.address + res.data.result.formatted_addresses.recommend
        this.setData({
          address: address
        }, function () {
          that.clickinFn(that.data.latitude, that.data.longitude, that.data.r_type, that.data.status, that.data.address,that.data.q_type,1,that.data.id)
        })
      },
    })
  },
  //获取当前打卡状态
  async getCheck(lat, lng) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Check/getCheck", {
      lat: lat,
      lng: lng
    })
    if(result.data.datas.work_off!=null){
      this.setData({
        id:result.data.datas.work_off.id
      })
    }
    this.setData({
      getCheck: result.data.datas.work_on,
      getCheck2: result.data.datas.work_off,
      clockin: result.data.datas.check,
      r_type: result.data.datas.r_type,
      status: result.data.datas.status,
    })
    console.log(result);
  },
  //打卡
  clickinFn(lat, lng, r_type, status, address,q_type,i_type,id) {
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.post_url + "/index.php/Api/Check/add", {
      lat: lat,
      lng: lng,
      r_type: r_type,
      status: status,
      address: address,
      q_type:q_type,
      i_type:i_type,
      id:id
    }).then(res => {
      if (res.statusCode == 200) {
        wx.hideLoading()
      }
      if(res.data.datas==1){
        this.getCheck(this.data.latitude,this.data.longitude)
        wx.showToast({
          icon:'success',
          title: '操作成功'
        })
      }
    })
  },
  //打卡点击
  bindclockinFn: function () {
    if (this.data.clockin == '更新打卡') {
      this.getProvinceName2(this.data.latitude,this.data.longitude)
    } else if(this.data.clockin=='无法打卡'){
      wx.showToast({
        icon:'none',
        title: '请开启定位',
      })
    }else{
      this.getProvinceName(this.data.latitude,this.data.longitude)
      // this.clickinFn(this.data.latitude, this.data.longitude, this.data.r_type, this.data.status, this.data.address)
    }
  },
  nameFn: function () {
    var str = this.data.user.user_name
    var name = str.slice(0, 2)
    this.setData({
      name: name
    })
  },
  bindstatisFn: function () {
    wx.navigateTo({
      url: '/pages/statis/statis',
    })
  },
  bindshenqFn: function () {
    wx.navigateTo({
      url: '/pages/applic/applic',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio-204
        this.setData({
          winH:ScrH
        })
      },
    })
    var that = this
    this.time()
    this.findXy() //查询用户与商家的距离
    this.setData({
      user: wx.getStorageSync('user')
    }, function () {
      that.nameFn()
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
    var that = this
    wx.startLocationUpdate({
      success: (res) => {
        wx.onLocationChange((res) => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          }, function () {
            that.getDistance(res.latitude, res.longitude, 34.724971516927084, 113.82832899305555)
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