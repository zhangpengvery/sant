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
    tabNavlists:[{
      id:1,
      title:"我的求职"
    },{
      id:2,
      title:"我的招聘"
    }],
    page:1,
    scrollH:0,
    currentIndex:0,
    myRecruitList:[],
    myApplyList:[],
    triggered:false
  },
  changeTab:function(e){
    var that=this
    this.setData({
      currentIndex:e.detail.current
    },function(){
      if(that.data.currentIndex==0){
        that.myRecruitList2()
      }else if(that.data.currentIndex==1){
        that.myApplyList2()
      }
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
  myRecruitList(page){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/myRecruitList',
      data:{
        page:page
      },
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          myRecruitList:this.data.myRecruitList.concat(res.data.data)
        })
      }
    })
  },
  //求职列表
  myRecruitList2(){
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
          myRecruitList:res.data.data,
          triggered:false
        })
      }
    })
  },
  //招聘列表
  myApplyList(page){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/myApplyList',
      data:{
        page:page
      },
      header: {
        'content-type': 'application/json' ,
        'XX-Token':wx.getStorageSync('token'),
      },
      success:(res)=>{
        if(res.statusCode==200){
          wx.hideLoading()
        }
        this.setData({
          myApplyList:this.data.myApplyList.concat(res.data.data)
        })
      }
    })
  },
  //招聘列表
  myApplyList2(){
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
          myApplyList:res.data.data,
          triggered:false
        })
      }
    })
  },
  //删除求职
  deleteFn:function(e){
    var that=this;
    var jr_id=e.target.dataset.jr_id;
    var index=e.currentTarget.dataset.index
    var list=this.data.myRecruitList
    list.splice(index,1)
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.setData({
            myRecruitList:list
          })
          that.deleteRecuit(jr_id)
        }
      }
    })
  },
  //招聘删除点击
  delzpFn:function(e){
    var that=this;
    var ja_id=e.target.dataset.ja_id;
    var index=e.currentTarget.dataset.index
    var list=this.data.myApplyList
    list.splice(index,1)
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.setData({
            myApplyList:list
          })
          that.deleteApply(ja_id)
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
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.myRecruitList(this.data.page)
  },
  loadMore2(){
    this.setData({
      page:++this.data.page
    })
    this.myApplyList(this.data.page)
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.myRecruitList2()
      }else if(that.data.currentIndex==1){
        that.myApplyList2()
      }
    })
  },
  stopChange(){
    return false
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
    this.setData({
      page:1
    })
    if(this.data.currentIndex==0){
      this.myRecruitList2()
    }else if(this.data.currentIndex==1){
      this.myApplyList2()
    }
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