// pages/joblist/joblist.js
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
      title:"求职招聘"
    },
    tabNavlists:[{
      id:1,
      title:"我的求职"
    },{
      id:2,
      title:"我的招聘"
    }],
    navH:0,
    scrollH:0,
    currentIndex:0,
    myRecruitList:[],
    myApplyList:[]
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
  },
  //底部加号
  jiahaoFn:function(){
    this.setData({
      showJiahao:true,
      showChahao:true,
      showMaxmaks:true
    })
  },
  //底部叉号
  chahaoFn:function(){
    this.setData({
      showMaxmaks:false,
      showChahao:false,
      showJiahao:false
    })
  },
  //大蒙版
  maxmaskFn:function(){
    this.setData({
      showJiahao:false,
      showMaxmaks:false,
      showChahao:false
    })
  },
  //求职列表
  myRecruitList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/myRecruitList',
      data:{},
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          myRecruitList:res.data.data
        })
      }
    })
    
  },
  //招聘列表
  myApplyList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/myApplyList',
      data:{},
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          myApplyList:res.data.data
        })
      }
    })
  },
  //删除求职
  deleteFn:function(e){
    var that=this;
    var jr_id=e.target.dataset.jr_id;
    console.log(e.target.dataset.jr_id);
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.deleteRecuit(jr_id)
          that.myRecruitList()
        }
      }
    })
  },
  //招聘删除点击
  delzpFn:function(e){
    var that=this;
    var ja_id=e.target.dataset.ja_id;
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.deleteApply(ja_id)
          that.myApplyList()
        }
      }
    })
  },
  //求职删除
  deleteRecuit(jr_id){
    requestApi1(app.globalData.base_url+"/deleteRecuit",{
      jr_id:jr_id
    })
  },
  //招聘删除
  deleteApply(ja_id){
    requestApi1(app.globalData.base_url+"/deleteApply",{
      ja_id:ja_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myRecruitList()
    this.myApplyList()
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          scrollH:result.windowHeight*(750/result.windowWidth)-100-app.globalData.navbarHeight
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