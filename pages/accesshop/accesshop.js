// pages/accesshop/accesshop.js
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
      navTitle:false,
      navInput:true,
      navAddress:true,
      bg:true,
      r:246,
      g:246,
      b:246,
      w:50,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    getCataegoryNavList:[],
    getCataegoryContent:[],
    navH:0,
    cate_id2:7,
    p:1,
    salenum_up:-1,
    price_up:-1,
    scrollH:0,
    activeIndex:7,
    rigthUrl:"https://api.jbccs.com/api/getPartsList/cate_id2/7/p/1/salenum_up/-1/price_up/-1",
    rightTitle:"油品",
    dixian:false,
    wuShuju:true,
  },
  leftNavFn:function(e){
    this.setData({
      dixian:false,
      wuShuju:true,
      p:1,
      rightTitle:e.target.dataset.title,
      cate_id2:e.target.dataset.id,
      rigthUrl:`https://api.jbccs.com/api/getPartsList/cate_id2/${e.target.dataset.id}/p/1/salenum_up/-1/price_up/-1`,
      activeIndex:e.target.dataset.id
    })
    this.getChengFn()
  },
  getChengFn(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: this.data.rigthUrl,
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        if(res.data.data.list.length==0){
          this.setData({
            wuShuju:false
          })
        }
        this.setData({
          getCataegoryNavList:res.data.data.cate_list,
          getCataegoryContent:res.data.data.list
        })
        console.log(this.data.getCataegoryNavList);
      }
    })
  },
  //懒加载数据
  async getPartsList(cate_id2,p,salenum_up,price_up){
    let result=await requestApi(app.globalData.base_url+"/getPartsList",{
      cate_id2:cate_id2,
      p:p,
      salenum_up:salenum_up,
      price_up:price_up
    })
    if(result.data.data.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getCataegoryContent:this.data.getCataegoryContent.concat(result.data.data.list)
    })
  },
  loadMore(){
    this.setData({
      p:++this.data.p
    })
    this.getPartsList(this.data.cate_id2,this.data.p,this.data.salenum_up,this.data.price_up)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChengFn()
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          scrollH:result.windowHeight*(750/result.windowWidth)-app.globalData.navbarHeight
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