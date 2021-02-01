// pages/saledetail/saledetail.js
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
      title:"出售详情"
    },
    navH:0,
    phone:'',
    getSaleInfo:[],
    getSaleImg:[]
  },
  bddhFn:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  async getSaleInfo(sale_id){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.base_url+"/getSaleInfo",{
      sale_id:sale_id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getSaleInfo:result.data.data,
      getSaleImg:result.data.data.pics,
      phone:result.data.data.contact_tel
    })
    console.log(this.data.getSaleInfo);
    
  },
  //收藏点击
  shoucFn: function (e) {
    if (wx.getStorageSync('token')==[]) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      var getSaleInfo = this.data.getSaleInfo
      var sale_id = getSaleInfo.sale_id;
      getSaleInfo.is_favor = 1;
      this.setData({
        getSaleInfo: getSaleInfo
      })
      this.postFavorAdd(sale_id)
    }
  },
  //删除收藏
  qiehuanFn: function (e) {
    var getSaleInfo = this.data.getSaleInfo;
    var is_favor = getSaleInfo.sale_id;
    getSaleInfo.is_favor = 0;
    this.setData({
      getSaleInfo: getSaleInfo
    })
    console.log(is_favor);
    this.deleteMyFavor(is_favor)
  },
  postFavorAdd(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type: "sale",
      favor_data: favor_data
    }).then(res=>{
      console.log(res);
    })
  },
  deleteMyFavor(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type:"sale",
      favor_data: favor_data
    }).then(res => {
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.sale_id);
    this.getSaleInfo(options.sale_id)
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight
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