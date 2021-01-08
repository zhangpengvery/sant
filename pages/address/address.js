// pages/address/address.js
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
      title:"收货地址"
    },
    navH:0,
    active:0,
    addres_id:0,
    is_def:0,
    getUserList:[],
  },
  longPressFn:function(e){
    var that=this;
    var addres_id=e.currentTarget.dataset.addres_id;
    var is_def=e.currentTarget.dataset.is_def;
    wx.showModal({
      cancelText:'设为默认',
      cancelColor:'#F9B236',
      confirmText:'删除',
      confirmColor:'#BA1515',
      content:'修改这个地址',
      success:function(res){
        if(res.cancel && is_def==0){
          that.setDefaultress(addres_id)
          that.getUserList()
        }
        if(res.cancel &&is_def==1){
          wx.showToast({
            title: '该地址已默认',
            icon: 'error',
            duration: 2000
          })
        }
        if(res.confirm && is_def==0){
          that.deleteAddress(addres_id)
          that.getUserList()
        }
        if(res.confirm && is_def==1){
          wx.showToast({
            title: '不可以删除默认',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },
  getUserList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/getAddressLists',
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
          getUserList:res.data.data
        })
      }
    })
  },
  //设置默认
  setDefaultress(address_id){
    requestApi1(app.globalData.base_url+"/setDefaultAddress",{
      address_id:address_id
    })
  },
  //删除地址
  deleteAddress(address_id){
    requestApi1(app.globalData.base_url+"/deleteAddress",{
      address_id:address_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList()
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