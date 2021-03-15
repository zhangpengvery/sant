// pages/hiredetail/hiredetail.js
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
      showBack:true,
      navTitle:true,
      navInput:false,
      navAddress:false,
      r:255,
      g:255,
      b:255,
      l:50,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#000",
      title:"出租详情"
    },
    navH:0,
    phone:'',
    alltime:"",
    allDay:"",
    getHireInfo:[],
    getSaleImg:[]
  },
  //收藏点击
  shoucFn: function (e) {
    if (wx.getStorageSync('token')==[]) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      var getSaleInfo = this.data.getSaleInfo
      var hire_id = getSaleInfo.hire_id;
      getSaleInfo.is_favor = 1;
      this.setData({
        getSaleInfo: getSaleInfo
      })
      this.postFavorAdd(hire_id)
    }
  },
  //删除收藏
  qiehuanFn: function (e) {
    var getSaleInfo = this.data.getSaleInfo;
    var is_favor = getSaleInfo.hire_id;
    getSaleInfo.is_favor = 0;
    this.setData({
      getSaleInfo: getSaleInfo
    })
    console.log(is_favor);
    this.deleteMyFavor(is_favor)
  },
  bddhFn:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  async getHireInfo(hire_id){
    var that=this
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.base_url+"/getHireInfo",{
      hire_id:hire_id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getSaleInfo:result.data.data,
      getSaleImg:result.data.data.pics,
      phone:result.data.data.contact_tel,
      alltime:result.data.data.add_time
    },function(){
      that.formatDate()
    })
    console.log(this.data.getSaleInfo);
  },
  postFavorAdd(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type: "hire",
      favor_data: favor_data
    }).then(res=>{
      console.log(res);
    })
  },
  deleteMyFavor(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type:"hire",
      favor_data: favor_data
    }).then(res => {
      console.log(res);
    })
  },
  formatDate() {
    var date = new Date(Number(this.data.alltime)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    this.setData({
      allDay:YY+MM+DD+"  "+hh+mm+ss
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHireInfo(options.hire_id)
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight
         })
      },
    })
    // this.formatDate()
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