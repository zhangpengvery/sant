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
    tabNavlists:[{
      id:1,
      title:"我的出租"
    },{
      id:2,
      title:"我的求租"
    }],
    page:1,
    scrollH:0,
    currentIndex:0,
    myHireList:[],
    myHireForList:[],
    triggered:false
  },
  changeTab:function(e){
    var that=this
    this.setData({
      currentIndex:e.detail.current,
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.myHireList2()
      }else if(that.data.currentIndex==1){
        that.myHireForList2()
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
          myHireList:this.data.myHireList.concat(res.data.data)
        })
        console.log(this.data.myHireList);
      }
    })
  },
  //出租列表
  myHireList2(){
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
          myHireList:res.data.data,
          triggered:false
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
          myHireForList:this.data.myHireForList.concat(res.data.data)
        })
        console.log(this.data.myHireForList);
      }
    })
  },
  myHireForList2(){
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
          myHireForList:res.data.data,
          triggered:false
        })
        console.log(this.data.myHireForList);
      }
    })
  },
  //删除出租
  deleteFn:function(e){
    var that=this;
    var hire_id=e.target.dataset.hire_id;
    var index=e.currentTarget.dataset.index
    var list=this.data.myHireList
    list.splice(index,1)
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.setData({
            myHireList:list
          })
          that.deleteHire(hire_id)
        }
      }
    })
  },
  //求购删除
  dadQgFn:function(e){
    var that=this;
    var hf_id=e.target.dataset.hf_id;
    var index=e.currentTarget.dataset.index
    var list=this.data.myHireForList
    list.splice(index,1)
    wx.showModal({
      title: '是否删除',
      success(res){
        if (res.confirm){
          that.setData({
            myHireForList:list
          })
          that.deleteHireFor(hf_id)
        }
      }
    })
  },
  //出租删除
  deleteHire(hire_id){
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.base_url+"/deleteHire",{
      hire_id:hire_id
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
  deleteHireFor(hf_id){
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.base_url+"/deleteHireFor",{
      hf_id:hf_id
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
    this.myHireList(this.data.page)
  },
  loadMore2(){
    this.setData({
      page:++this.data.page
    })
    this.myHireForList(this.data.page)
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if(that.data.currentIndex==0){
        that.myHireList2()
      }else if(that.data.currentIndex==1){
        that.myHireForList2()
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
      this.myHireList2()
    }else if(this.data.currentIndex==1){
      this.myHireForList2()
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