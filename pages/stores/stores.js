// pages/stores/stores.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: false,
      navTitle: true,
      navInput: true,
      navAddress: true,
      r: 255,
      g: 255,
      b: 255,
      w: 20,
      l: 50,
      inpLeft: 105,
      fz: 34,
      fw: "bold",
      navColor: 1,
      col: "#000",
      title: "门店"
    },
    navH: 0,
    mgH: 0,
    city: 0,
    getCityList: [],
    getRecruitList: [],
    postStoresList: [],
    cityActive: 16,
    showJuli: false,
    showMask: false,
    color: false,
    cityColor: false,
    showCity: false,
    rigthUrl: "https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=16",
    latitude: 0,
    longitude: 0
  },
  //隐藏距离模块点击
  juliFn: function (e) {
    this.postStoresList(this.data.city, this.data.longitude, this.data.latitude)
    this.setData({
      showJuli: false,
      showMask: false,
      color: false,
    })
  },
  //距离点击
  distanceFn: function (e) {
    this.setData({
      showJuli: true,
      showMask: true,
      color: true,
      cityColor: false,
      showCity: false
    })
    this.postStoresList(this.data.city, this.data.longitude, this.data.latitude)
  },
  //mask点击事件
  maskFn: function () {
    this.setData({
      showJuli: false,
      showMask: false,
      color: false,
      cityColor: false,
      showCity: false
    })
  },
  //城市点击
  cityFn: function () {
    this.setData({
      showJuli: false,
      showMask: true,
      color: false,
      cityColor: true,
      showCity: true
    })
  },
  //城市请求
  async getCityList() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Public/get_area")
    this.setData({
      getCityList: result.data.datas.area_list
    })
  },
  //门店内容
  postStoresList(city, lng, lat) {
    requestApi1(app.globalData.post_url + "/index.php/Wap/Api/fours_json", {
      p: 1,
      city: city,
      lng: lng,
      lat: lat
    }).then(res => {
      console.log(res);
      this.setData({
        postStoresList: res.data.datas.list,
      })
    })
  },
  //城市每项点击
  SaveFn: function (e) {
    this.setData({
      cityActive: e.target.dataset.id,
      rigthUrl: `https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=${e.target.dataset.id}`
    })
    this.getChengFn()
  },
  //点击每个城市切换内容
  getChengFn() {
    wx.request({
      url: this.data.rigthUrl,
      success: (res) => {
        this.setData({
          getRecruitList: res.data.datas.area_list
        })
      }
    })
  },
  rightBoxFn: function (e) {
    this.setData({
      city: e.target.dataset.id,
      showMask: false,
      cityColor: false,
      showCity: false,
    })
    this.postStoresList(this.data.city, this.data.longitude, this.data.latitude)
  },
  goGoingFn: function (e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      scale: 18,
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.address
    })
  },

  juliTowFn: function () {
    var arr = [];
    var postStoresList = this.data.postStoresList;
    for (var i = 0; i < postStoresList.length; i++) {
      if (postStoresList[i].distance >= 0 && postStoresList[i].distance <= 50) {
        arr.push(postStoresList[i])
      }
    }
    this.setData({
      postStoresList: arr,
      showJuli: false,
      showMask: false,
      color: false,
      cityColor: false,
      showCity: false
    })
  },
  juliThrFn: function () {
    var arr = [];
    var postStoresList = this.data.postStoresList;
    for (var i = 0; i < postStoresList.length; i++) {
      if (postStoresList[i].distance >= 50 && postStoresList[i].distance <= 100) {
        arr.push(postStoresList[i])
      }
    }
    this.setData({
      postStoresList: arr,
      showJuli: false,
      showMask: false,
      color: false,
      cityColor: false,
      showCity: false
    })
  },
  juliFouFn: function () {
    var arr = [];
    var postStoresList = this.data.postStoresList;
    for (var i = 0; i < postStoresList.length; i++) {
      if (postStoresList[i].distance >= 100 && postStoresList[i].distance <= 200) {
        arr.push(postStoresList[i])
      }
    }
    this.setData({
      postStoresList: arr,
      showJuli: false,
      showMask: false,
      color: false,
      cityColor: false,
      showCity: false
    })
  },
  juliFivFn: function () {
    var arr = [];
    var postStoresList = this.data.postStoresList;
    for (var i = 0; i < postStoresList.length; i++) {
      if (postStoresList[i].distance > 200) {
        arr.push(postStoresList[i])
      }
    }
    this.setData({
      postStoresList: arr,
      showJuli: false,
      showMask: false,
      color: false,
      cityColor: false,
      showCity: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        this.postStoresList(this.data.city, this.data.longitude, this.data.latitude)
      }
    })
    this.getCityList()
    this.getChengFn()
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          navH: app.globalData.navbarHeight,
          mgH: app.globalData.navbarHeight + 74
        })
      },
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