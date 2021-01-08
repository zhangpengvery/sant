// pages/stores/stores.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      showBack:false,
      navTitle:true,
      navInput:true,
      navAddress:true,
      r:255,
      g:255,
      b:255,
      w:20,
      l:50,
      inpLeft:105,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#000",
      title:"门店"
    },
    navH:0,
    mgH:0,
    city:0,
    getCityList:[],
    getRecruitList:[],
    postStoresList:[],
    cityActive:16,
    showJuli:false,
    showMask:false,
    color:false,
    cityColor:false,
    showCity:false,
    rigthUrl:"https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=16",
    lat1:0,
    lng1:0,
    lat2:0,
    lng2:0
  },
  //获取用户地址
  getProvinceName(latitude, longitude){
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',   
      data:{},
      success: (res)=> {
        this.setData({
          lat1:res.data.result.location.lat,
          lng1:res.data.result.location.lng
        })
        },
    })
  },
  //隐藏距离模块点击
  juliFn:function(e){
    this.setData({
      showJuli:false,
      showMask:false,
      color:false,
    })
  },
  //距离点击
  distanceFn:function(e){
    this.setData({
      showJuli:true,
      showMask:true,
      color:true,
      cityColor:false,
      showCity:false
    })
  },
  //mask点击事件
  maskFn:function(){
    this.setData({
      showJuli:false,
      showMask:false,
      color:false,
      cityColor:false,
      showCity:false
    })
  },
  //城市点击
  cityFn:function(){
    this.setData({
      showJuli:false,
      showMask:true,
      color:false,
      cityColor:true,
      showCity:true
    })
  },
  //城市请求
  async getCityList(){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Public/get_area")
    this.setData({
      getCityList:result.data.datas.area_list
    })
  },
  //门店内容
  postStoresList(p,city){
    requestApi1(app.globalData.post_url+"/index.php/Wap/Api/fours_json",{
      p:1,
      city:this.data.city
    }).then(res=>{
      console.log(res);
      this.setData({
        postStoresList:res.data.datas.list,
      })
    })
  },
  //城市每项点击
  SaveFn:function(e){
    this.setData({
      cityActive:e.target.dataset.id,
      rigthUrl:`https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=${e.target.dataset.id}`
    })
    this.getChengFn()
  },
  //点击每个城市切换内容
  getChengFn(){
    wx.request({
      url: this.data.rigthUrl,
      success:(res)=>{
        this.setData({
          getRecruitList:res.data.datas.area_list
        })
      }
    })
  },
  rightBoxFn:function(e){
    this.setData({
      city:e.target.dataset.id,
      showMask:false,
      cityColor:false,
      showCity:false,
    })
    this.postStoresList(this.data.city)
  },
  //计算两点位置距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;   
    var rad1 = lat1 * Math.PI / 180.0;   
    var rad2 = lat2 * Math.PI / 180.0;   
    var a = rad1 - rad2;   
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;   
    var r = 6378137;  //地球半径
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));   
    /*
    if (distance > 1000){
      distance = Math.round(distance / 1000);
    }*/
    return distance;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCityList()
    this.getChengFn()
    this.getDistance()
    this.postStoresList(this.data.city)
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          mgH:app.globalData.navbarHeight+74
         })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        _this.getProvinceName(latitude, longitude)
      }
    })
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