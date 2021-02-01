// pages/renlist/renlist.js
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
      title:"租贷管理"
    },
    tabNavlists:[{
      id:1,
      title:"我的出租"
    },{
      id:2,
      title:"我的求租"
    }],
    navH:0,
    scrollH:0,
    currentIndex:0,
    myHireList:[],
    myHireForList:[]
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
  //出租列表
  myHireList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/myHireList',
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
          myHireList:res.data.data
        })
        console.log(this.data.myHireList);
      }
    })
  },
  //求租列表
  myHireForList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/myHireForList',
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
          myHireForList:res.data.data
        })
        console.log(this.data.myHireForList);
      }
    })
  },
  //删除出租
  deleteFn:function(e){
    var that=this;
    var hire_id=e.target.dataset.hire_id;
    console.log(e.target.dataset.hire_id);
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.deleteHire(hire_id)
          that.myHireList()
        }
      }
    })
    that.myHireList()
  },
  //求购删除
  dadQgFn:function(e){
    var that=this;
    var hf_id=e.target.dataset.hf_id;
    console.log(e.target.dataset.hf_id);
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.deleteHireFor(hf_id)
          that.myHireForList()
        }
      }
    })
    that.myHireForList()
  },
  //出租删除
  deleteHire(hire_id){
    requestApi1(app.globalData.base_url+"/deleteHire",{
      hire_id:hire_id
    })
  },
  //求购删除
  deleteHireFor(hf_id){
    requestApi1(app.globalData.base_url+"/deleteHireFor",{
      hf_id:hf_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myHireList()
    this.myHireForList()
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