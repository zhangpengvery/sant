// pages/home/home.js
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
      r:249,
      g:176,
      b:49,
      w:20,
      inpLeft:105,
      l:50,
      fz:34,
      fw:"bold",
      navColor:1,
      col:"#fff",
      title:"三泰之家"
    },
    navH:0,
    city:"",
    winH:0,
    page:1,
    user_id:0,
    type:'sale',
    hidden:false,
    urgentphone:'10010',
    servicephone:'10086',
    getIndexIcons:[],
    getSwiperImages:[],
    listData:[]
  },
  //获取用户地址
  getProvinceName(latitude, longitude){
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',   
      data:{},
      success: (res)=> {
        console.log(res)
        this.setData({
          city:res.data.result.address_component.city
        })
        },
    })
  },
  async getIndexIcons(){
    let result=await requestApi(app.globalData.base_url+"/getIndexIcons")
    this.setData({
      getIndexIcons:result.data.data
    })
  },
  async getSwiperImages(){
    let result=await requestApi(app.globalData.base_url+"/getSwiperImages")
    // console.log(result);
    this.setData({
      getSwiperImages:result.data.data.pj_list
    })
  },
  postHomeBestList(page,user_id){
    requestApi1(app.globalData.base_url+"/getSaleLists",{
      page:page,
      user_id:user_id
    }).then(res=>{
      console.log(res);
      this.setData({
        listData:this.data.listData.concat(res.data.data)
      })
      console.log(this.data.listData);
    })
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.postHomeBestList(this.data.page,this.data.user_id)
  },
  scrollPage:function(e){
    if(e.detail.scrollTop>50){
      this.setData({
        hidden:true
      })
    }else{
      this.setData({
        hidden:false
      })
    }
  },
  urgentFn:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.urgentphone,
    })
  },
  serviceFn:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.servicephone,
    })
  },
  //收藏点击
  qiehuanFn:function(e){
    var sale_id=e.target.dataset.id
    wx.request({
      url: 'https://api.jbccs.com/api/favor_add',
      data:{
        type:this.data.type,
        favor_data:sale_id,
      },
      method:"post",
      header:{
        "content-type": "application/x-www-form-urlencoded",
        'XX-Token':wx.getStorageSync('token'),
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id:wx.getStorageSync('user_id')
    })
    this.getIndexIcons(),
    this.getSwiperImages(),
    this.postHomeBestList(this.data.page,this.data.user_id)
    //获取高度
    this.setData({
      winH:app.globalData.windowHeigtn
    })
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight
         })
         console.log(this.data.navH);
         
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