// pages/order/order.js
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
      title:"我的出售"
    },{
      id:2,
      title:"我的求购"
    }],
    page:1,
    scrollH:0,
    currentIndex:0,
    mySaleList:[],
    mySaleForList:[],
    triggered:false
  },
  changeTab:function(e){
    var that=this
    this.setData({
      currentIndex:e.detail.current,
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.mySaleList2()
      }else if(that.data.currentIndex==1){
        that.mySaleForList2()
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
  //出售列表
  mySaleList(page){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/mySaleList',
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
          mySaleList:this.data.mySaleList.concat(res.data.data)
        })
        console.log(this.data.mySaleList);
      }
    })
  },
  //出售列表
  mySaleList2(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/mySaleList',
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
          mySaleList:res.data.data,
          triggered:false
        })
        console.log(this.data.mySaleList);
      }
    })
  },
  //求购列表
  mySaleForList(page){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/mySaleForList',
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
          mySaleForList:this.data.mySaleForList.concat(res.data.data)
        })
        console.log(this.data.mySaleForList);
      }
    })
  },
  //求购列表
  mySaleForList2(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.jbccs.com/api/mySaleForList',
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
          mySaleForList:res.data.data,
          triggered:false
        })
        console.log(this.data.mySaleForList);
      }
    })
  },
  //删除出售
  deleteFn:function(e){
    var that=this;
    var uc_id=e.target.dataset.uc_id;
    var index=e.currentTarget.dataset.index
    var list=this.data.mySaleList
    list.splice(index,1)
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.setData({
            mySaleList:list
          })
          that.deleteSale(uc_id)
        }
      }
    })
  },
  //求购删除
  dadQgFn:function(e){
    var that=this;
    var sf_id=e.target.dataset.sf_id;
    var index=e.currentTarget.dataset.index
    var list=this.data.mySaleForList
    list.splice(index,1)
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.setData({
            mySaleForList:list
          })
          that.deleteSaleFor(sf_id)
        }
      }
    })
  },
  //出售删除
  deleteSale(uc_id){
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.base_url+"/deleteSale",{
      uc_id:uc_id
    }).then(res=>{
      if(res.data.code==1){
        wx.showToast({
          title: '删除成功',
        })
      }else{
        wx.showToast({
          title: '删除失败',
          icon:'error'
        })
      }
    })
  },
  //求购删除
  deleteSaleFor(sf_id){
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.base_url+"/deleteSaleFor",{
      sf_id:sf_id
    }).then(res=>{
      if(res.data.code==1){
        wx.showToast({
          title: '删除成功',
        })
      }else{
        wx.showToast({
          title: '删除失败',
          icon:'error'
        })
      }
    })
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.mySaleList(this.data.page)
  },
  loadMore2(){
    this.setData({
      page:++this.data.page
    })
    this.mySaleForList(this.data.page)
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.mySaleList2()
      }else if(that.data.currentIndex==1){
        that.mySaleForList2()
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
      this.mySaleList2()
    }else if(this.data.currentIndex==1){
      this.mySaleForList2()
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