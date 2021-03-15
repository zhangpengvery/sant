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
    active:0,
    lat:0,
    lng:0,
    latitude:0,
    longitude:0,
    currentTime: 0,
    clockin:"",
    r_type:0,
    status:0,
    user:[],
    name:'',
    getCheck:[],
    getCheck2:[]
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
  findXy(){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          lat:res.latitude,
          lng:res.longitude
        },function(){
          that.getCheck(that.data.lat,that.data.lng)
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
    if(s>0.5){
      this.setData({
        active:0
      })
    }else if(s<=0.5){
      this.setData({
        active:1
      })
    }
  },
  //获取当前打卡状态
  async getCheck(lat,lng) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Check/getCheck",{
      lat:lat,
      lng:lng
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getCheck:result.data.datas.work_on,
      getCheck2:result.data.datas.work_off,
      clockin:result.data.datas.check,
      r_type:result.data.datas.r_type,
      status:result.data.datas.status,
    })
    console.log(result);
  },
  //打卡
  clickinFn(lat,lng,r_type,status){
    requestApi1(app.globalData.post_url+"/index.php/Api/Check/add",{
      lat:lat,
      lng:lng,
      r_type:r_type,
      status:status
    }).then(res=>{
      this.getCheck()
    })
  },
  //打卡点击
  bindclockinFn:function(){
    if(this.data.clockin=='打卡完成'){
      wx.showToast({
        title: '今日打卡已完成',
      })
    }else{
      this.clickinFn(this.data.latitude,this.data.longitude,this.data.r_type,this.data.status)
    }
  },
  nameFn:function(){
    var str=this.data.user.user_name
    var name=str.slice(0,2)
    this.setData({
      name:name
    })
  },
  bindstatisFn:function(){
    wx.navigateTo({
      url: '/pages/statis/statis',
    })
  },
  bindshenqFn:function(){
    wx.navigateTo({
      url: '/pages/applic/applic',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.time()
    this.findXy() //查询用户与商家的距离
    this.setData({
      user:wx.getStorageSync('user')
    },function(){
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
    var that=this
    wx.startLocationUpdate({
      success: (res) => {
        wx.onLocationChange((res) => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          },function(){
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