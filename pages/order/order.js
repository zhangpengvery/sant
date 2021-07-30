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
    params:{
      showBack:true,
      navTitle:false,
      navInput:true,
      navAddress:false,
      bg:true,
      r:255,
      g:255,
      b:255,
      w:10,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    tabNavlists:[{
      id:1,
      title:"全部"
    },{
      id:2,
      title:"待付款"
    },{
      id:3,
      title:"待发货"
    },{
      id:4,
      title:"待收货"
    },{
      id:5,
      title:"已完成"
    }],
    navH:0,
    scrollH:0,
    currentIndex:0,
    leftCss:true,
    rightCss:false,
    left_content:true,
    left_header:true,
    p:1,
    type:"all",
    good_type:0,
    right_con:false,
    getOrderList:[],
    getOrderOne:[],
    getOrderTow:[],
    getOrderthr:[],
    getOrderInfo:[],
    getOrderfor:[],
    triggered:false,
    dixian:false
  },
  navLeftFn:function(){
    this.setData({
      leftCss:true,
      rightCss:false,
      left_content:true,
      left_header:true,
      right_con:false
    })
  },
  navRightFn:function(){
    this.setData({
      leftCss:false,
      rightCss:true,
      left_header:false,
      left_content:false,
      right_con:true
    })
  },
  changeTab:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  changeSwiper:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.current,
      p:1,
      dixian:false
    })
    if(e.currentTarget.dataset.current==0){
      this.getOrderList2(1,this.data.good_type)
    }else if(e.currentTarget.dataset.current==1){
      this.getOrderOne2(1,this.data.good_type)
    }else if(e.currentTarget.dataset.current==2){
      this.getOrderTow2(1,this.data.good_type)
    }else if(e.currentTarget.dataset.current==3){
      this.getOrderthr2(1,this.data.good_type)
    }else if(e.currentTarget.dataset.current==4){
      this.getOrderfor2(1,this.data.good_type)
    }
  },
  //订单列表
  async getOrderList(p,good_type){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"all",
      good_type:good_type
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getOrderList:this.data.getOrderList.concat(result.data.datas.list)
    })
    console.log(result.data.datas.list);
  },
  //下拉刷新
  async getOrderList2(p,good_type){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"all",
      good_type:good_type
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getOrderList:result.data.datas.list,
      triggered:false
    })
  },
  //代付款订单
  async getOrderOne(p,good_type){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"waitpay",
      good_type:good_type
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getOrderOne:this.data.getOrderOne.concat(result.data.datas.list)
    })
    console.log(this.data.getOrderOne);
  },
  //代付款订单
  async getOrderOne2(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"waitpay",
      good_type:good_type
    })
    this.setData({
      getOrderOne:result.data.datas.list,
      triggered:false
    })
    console.log(this.data.getOrderOne);
  },
  //代发货订单
  async getOrderTow(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"waitsend",
      good_type:good_type
    })
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getOrderTow:this.data.getOrderTow.concat(result.data.datas.list)
    })
    console.log(this.data.getOrderTow);
  },
  //代发货订单
  async getOrderTow2(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"waitsend",
      good_type:good_type
    })
    this.setData({
      getOrderTow:result.data.datas.list,
      triggered:false
    })
    console.log(this.data.getOrderTow);
  },
  //代发货订单
  async getOrderthr(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"receiving",
      good_type:good_type
    })
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getOrderthr:this.data.getOrderthr.concat(result.data.datas.list)
    })
    console.log(this.data.getOrderthr);
  },
  //代发货订单
  async getOrderthr2(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"receiving",
      good_type:good_type
    })
    this.setData({
      getOrderthr:result.data.datas.list,
      triggered:false
    })
    console.log(this.data.getOrderthr);
  },
  //已完成订单
  async getOrderfor(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"complete",
      good_type:good_type
    })
    if(result.data.datas.list.length==0){
      this.setData({
        dixian:true
      })
    }
    this.setData({
      getOrderfor:this.data.getOrderfor.concat(result.data.datas.list)
    })
    console.log(this.data.getOrderfor);
  },
  //已完成订单
  async getOrderfor2(p,good_type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Order/order_list",{
      p:p,
      type:"complete",
      good_type:good_type
    })
    this.setData({
      getOrderfor:result.data.datas.list,
      triggered:false
    })
    console.log(this.data.getOrderfor);
  },
  datelFn:function(e){
    // var order_sn=e.currentTarget.dataset.order_sn
    // this.getOrderInfo(order_sn)
    wx.navigateTo({
      url: '/pages/orddetail/orddetail?order_sn='+e.currentTarget.dataset.order_sn+'&&good_type='+this.data.good_type,
    })
  },
  //取消订单
  cancleOrder(order_sn){
    requestApi1(app.globalData.post_url+"/index.php/Api/Order/cancleOrder",{
      order_sn:order_sn
    }).then(res=>{
    })
  },
  //全部取消订单
  cancellFn:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    var index=e.currentTarget.dataset.index
    var list=this.data.getOrderList
    list[index].order_state='TRADE_CLOSED'
    wx.showModal({
      title:'是否取消该订单',
      success(res){
        if(res.confirm){
          that.setData({
            getOrderList:list
          })
          that.cancleOrder(order_sn)
        }
      }
    })
    console.log(index);
  },
  //待支付取消订单
  cancellFn2:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    var index=e.currentTarget.dataset.index
    var list=this.data.getOrderOne
    list.splice(index,1)
    wx.showModal({
      title:'是否取消该订单',
      success(res){
        if(res.confirm){
          that.setData({
            getOrderOne:list
          })
          that.cancleOrder(order_sn)
        }
      }
    })
    console.log(index);
  },
  //删除订单
  deleteOrder(order_sn){
    requestApi1(app.globalData.post_url+"/index.php/Api/Order/deleteOrder",{
      order_sn:order_sn
    }).then(res=>{
      this.getOrderList2(1,this.data.good_type)
    })
  },
  //确认收货
  userFinished(order_sn){
    wx.showLoading({
      title: '收货中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Order/userFinished",{
      order_sn:order_sn
    }).then(res=>{
      if(res.data.code==200){
        wx.showToast({
          title: '收货成功',
        })
      }else{
        wx.showToast({
          icon:'error',
          title: '收货失败',
        })
      }
    })
  },
  //全部删除点击
  deleteFn:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    var index=e.currentTarget.dataset.index
    var list=this.data.getOrderList
    list.splice(index,1)
    wx.showModal({
      title:'是否删除该订单',
      success(res){
        if(res.confirm){
          that.setData({
            getOrderList:list
          })
          that.deleteOrder(order_sn)
        }
      }
    })
    console.log(index);
  },
  //删除点击
  deleteFn2:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    var index=e.currentTarget.dataset.index
    var list=this.data.getOrderfor
    list.splice(index,1)
    wx.showModal({
      title:'是否删除该订单',
      success(res){
        if(res.confirm){
          that.setData({
            getOrderfor:list
          })
          that.deleteOrder(order_sn)
        }
      }
    })
    console.log(index); 
  },
  //确认收货点击
  bindLess:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    var index=e.currentTarget.dataset.index
    var list=this.data.getOrderList
    list[index].order_state='TRADE_FINISH'
    wx.showModal({
      title:'是否确认收货',
      success(res){
        if(res.confirm){
          that.setData({
            getOrderList:list
          })
          that.userFinished(order_sn)
        }
      }
    })
  },
  //确认收货点击
  bindLess2:function(e){
    var that=this
    var order_sn=e.currentTarget.dataset.order_sn
    var index=e.currentTarget.dataset.index
    var list=this.data.getOrderthr
    list.splice(index,1)
    wx.showModal({
      title:'是否确认收货',
      success(res){
        if(res.confirm){
          that.setData({
            getOrderthr:list
          })
          that.userFinished(order_sn)
        }
      }
    })
  },
  backFn:function(){
    wx.navigateBack()
  },
  bindGoPin:function(e){
    var that=this
    if(wx.getStorageSync('token') == []){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.request({
        url: app.globalData.post_url+"/index.php/index/MiniPay/getPay",
        method: "GET",
        data: {
          "open_id": wx.getStorageSync('openid'),
          "order_sn": e.currentTarget.dataset.order_sn
        },
        header: {
          "content-type": "application/json",
          "XX-Token": wx.getStorageSync('token')
        },
        success: function (e) {
          console.log(e.data.datas);
          // 签权调起支付 
          wx.requestPayment({
            timeStamp: e.data.datas.timeStamp,
            nonceStr: e.data.datas.nonceStr,
            package: e.data.datas.package,
            signType: e.data.datas.signType,
            paySign: e.data.datas.paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                duration:1500
              })
              setTimeout(function () {
                that.getOrderList2(1,that.data.good_type)
              }, 1500)
            },
            fail: function (res) {
              wx.showToast({
                icon:'none',
                title: '取消支付',
              })
            },
          })
        }
      })
    }
  },
  loadMore(){
    this.setData({
      p: ++this.data.p
    })
    this.getOrderList(this.data.p,this.data.good_type)
  },
  loadMore2(){
    this.setData({
      p: ++this.data.p
    })
    this.getOrderOne(this.data.p,this.data.good_type)
  },
  loadMore3(){
    this.setData({
      p: ++this.data.p
    })
    this.getOrderTow(this.data.p,this.data.good_type)
  },
  loadMore4(){
    this.setData({
      p: ++this.data.p
    })
    this.getOrderthr(this.data.p,this.data.good_type)
  },
  loadMore5(){
    this.setData({
      p: ++this.data.p
    })
    this.getOrderfor(this.data.p,this.data.good_type)
  },
  refresherFn:function(){
    var that=this
    this.setData({
      p:1,
    },function(){
      if(that.data.currentIndex==0){
        that.getOrderList2(1,that.data.good_type)
      }else if(that.data.currentIndex==1){
        that.getOrderOne2(1,that.data.good_type)
      }else if(that.data.currentIndex==2){
        that.getOrderTow2(1,that.data.good_type)
      }else if(that.data.currentIndex==3){
        that.getOrderthr2(1,that.data.good_type)
      }else if(that.data.currentIndex==4){
        that.getOrderfor2(1,that.data.good_type)
      }
    })
  },
  bindnavFn:function(e){
    wx.redirectTo({
      url: '/pages/order/order?good_type='+e.currentTarget.dataset.good_type,
    })
  },
  lookwuliu:function(e){
    wx.navigateTo({
      url: '/pages/lookwl/lookwl?order_sn='+e.currentTarget.dataset.order_sn+"&mobile="+e.currentTarget.dataset.mobile,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      good_type:options.good_type
    })
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =(clientHeight * ratio)-100-app.globalData.navbarHeight
         this.setData({
          navH:app.globalData.navbarHeight,
          scrollH:ScrH
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
      p:1
    })
    this.getOrderList2(1,this.data.good_type)
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