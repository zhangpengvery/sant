// pages/signin/signin.js
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
    time: "",
    texttime: 0,
    longitude: 0,
    latitude: 0,
    name: "",
    settime: "",
    getMark: [],
    address: "",
    active: 2,
    seettime2: ""
  },
  bindsign: function () {
    wx.redirectTo({
      url: '/pages/teamsign/teamsign',
    })
  },
  time() {
    clearTimeout(this.data.settime)
    var time = new Date(this.data.texttime);
    var hour = (time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours())
    var minute = (time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes())
    var _currentTime = hour + ' ' + ':' + ' ' + minute
    var that = this
    this.setData({
      time: _currentTime,
    });
    this.data.settime = setTimeout(function () {
      that.getMark()
    }, 60000)
  },
  bindweit: function () {
    var that = this
    wx.chooseLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      success: function (res) {
        var lat2 = res.latitude;
        var lng2 = res.longitude;
        var lat1 = that.data.latitude;
        var lng1 = that.data.longitude
        if (Number(juli(lat1, lng1, lat2, lng2)) > 0.2) {
          wx.showToast({
            icon: 'none',
            title: '位置不能离你大于200米',
          })
        } else {
          that.setData({
            name: res.name,
            latitude: res.latitude,
            longitude: res.longitude,
            address: res.address
          });
        }
      }
    })
    function juli(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      return s
    }
  },
  getProvinceName(latitude, longitude) {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',
      data: {},
      success: (res) => {
        console.log(res);
        this.setData({
          name: res.data.result.formatted_addresses.recommend,
          address: res.data.result.address
        })
      },
    })
  },
  bindsigninFn: function () {
    if (this.data.active == 1) {
      wx.navigateTo({
        url: '/pages/sign/sign?name=' + this.data.name + '&time=' + this.data.time + '&address=' + this.data.address,
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请打开定位签到',
      })
    }
  },
  async getMark() {
    var that = this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Mark/getMark")
    this.setData({
      getMark: result.data.datas,
      texttime: result.data.datas.now_time * 1000
    }, function () {
      that.time()
    })
    console.log(result);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          active: 1
        }, function () {
          that.getProvinceName(res.latitude, res.longitude)
        })
      },
      fail: (res) => {
        that.setData({
          active: 2
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
    this.getMark()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(this.data.settime)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(this.data.settime)
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