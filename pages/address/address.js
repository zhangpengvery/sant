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
    active:0,
    addres_id:0,
    is_def:0,
    getUserList:[],
  },
  binddef:function(e){
    if(e.currentTarget.dataset.is_def==1){
      wx.showToast({
        title: '该地址已默认',
      })
    }else{
      this.setDefaultress(e.currentTarget.dataset.addres_id)
    }
  },
  longPressFn:function(e){
    var that=this;
    var addres_id=e.currentTarget.dataset.addres_id;
    var is_def=e.currentTarget.dataset.is_def;
    wx.showModal({
      confirmText:'删除',
      confirmColor:'#BA1515',
      content:'删除这个地址',
      success:function(res){
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
    wx.request({
      url: 'https://api.jbccs.com/api/getAddressLists',
      data:{}, 
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        this.setData({
          getUserList:res.data.data
        })
      }
    })
  },
  //设置默认
  setDefaultress(address_id){
    wx.showLoading({
      title: '设置中...',
    })
    requestApi1(app.globalData.base_url+"/setDefaultAddress",{
      address_id:address_id
    }).then(res=>{
      console.log(res);
      if(res.data.code==1){
        wx.showToast({
          title: '设置成功',
        })
        this.getUserList()
      }else{
        wx.showToast({
          icon:'error',
          title: '设置失败',
        })
      }
    })
  },
  //删除地址
  deleteAddress(address_id){
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.base_url+"/deleteAddress",{
      address_id:address_id
    }).then(res=>{
      if(res.data.code==1){
        wx.showToast({
          title: '删除成功',
        })
        this.getUserList()
      }else{
        wx.showToast({
          icon:'error',
          title: '删除失败',
        })
      }
    })
  },
  bindShez:function(e){
    console.log(e.currentTarget.dataset.addres_id);
    wx.navigateTo({
      url: `/pages/colldetail/colldetail?address_id=${e.currentTarget.dataset.addres_id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          scrollH:result.windowHeight*(750/result.windowWidth)-100
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
    this.getUserList()
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