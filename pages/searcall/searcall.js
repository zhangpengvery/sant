// pages/searcall/searcall.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:0,
    winH:0,
    p:1,
    key:"",
    searchList:[],
    leftList:[],
    rightList:[],
    active:2,
    leftNull:true,
    rightNull:true
  },
  async searchList(p,key) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Public/search_list_json",{
      p:p,
      key:key
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      searchList:this.data.searchList.concat(result.data.datas.list)
    },function(){
      var list=that.data.searchList;
      var list2=[]
      var list3=[]
      for(var i=0;i<list.length;i++){
        if(list[i].good_cate_1==1){
          list2.push(list[i])
          that.setData({
            active:1
          })
        }else if(list[i].good_cate_1==2){
          list3.push(list[i])
        }
      }
      that.setData({
        leftList:list2,
        rightList:list3
      })
      if(list2.length==0){
        that.setData({
          leftNull:false
        })
      }
      if(list3.length==0){
        that.setData({
          rightNull:false
        })
      }
    })
  },
  bindLeftFn:function(){
    this.setData({
      active:1
    })
  },
  bindRightFn:function(){
    this.setData({
      active:2
    })
  },
  loadMore() {
    this.setData({
      p: ++this.data.p
    })
    this.searchList(this.data.p,this.data.key)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      key:options.key
    })
    this.searchList(this.data.p,options.key)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =(clientHeight * ratio)-app.globalData.navbarHeight-74
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