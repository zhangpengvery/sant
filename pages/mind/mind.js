// pages/mind/mind.js
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
      navInput:false,
      r:249,
      g:176,
      b:49,
      w:20,
      l:50,
      fz:34,
      fw:"bold",
      navColor:0,
      col:"#fff",
      title:"我的"
    },
    navH:0,
    winH:0,
    hiddens:false,
    login:true,
    userInfor:false,
    loginData:[],
    getMindText:[],
    user:[],
    getNoSignTotal:0
  },
  async getMindIcons(){
    let result=await requestApi(app.globalData.base_url+"/getMyIcons")
    this.setData({
      getMindText:result.data.data,
    })
    console.log(result);
  },
  async getNoSignListsApi(page) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/LetSign/getNoSignLists", {
      page: page
    })
    this.setData({
      getNoSignTotal:result.data.datas.total
    })
  },
  scrollPage:function(e){
    var s='params.navColor'
    if(e.detail.scrollTop>50){
      this.setData({
        hiddens:true,
        [s]:1
      })
    }else if(e.detail.scrollTop<50){
      this.setData({
        hiddens:false,
        [s]:0
      })
    }
  },
  bindUrlFn:function(e){
    if(wx.getStorageSync('token')==[]){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },
  bindyuangong:function(e){
    if(wx.getStorageSync('token')==[]){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else if(this.data.user.user_is_worker==0){
      wx.showToast({
        icon:'none',
        title: '没有访问权限',
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },
  gologinFn:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  async getUserInfo() {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/User/getUserInfo")
    this.setData({
      user: result.data.datas.user_info,
    })
    console.log(this.data.user);
  },
  bindUrl:function(e){
    wx.redirectTo({
      url: e.currentTarget.dataset.url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoSignListsApi(1)
    // this.getMindIcons()
    // this.setData({
    //   user:wx.getStorageSync('user')
    // })
    if(wx.getStorageSync('token')==[]){
      this.setData({
        login:false,
        userInfor:true
      })
    }else{
      this.getUserInfo()
      this.setData({
        login:true,
        userInfor:false
      })
    }
    //获取高度
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio
         this.setData({
          navH:app.globalData.navbarHeight,
          winH:ScrH
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