// pages/cart/cart.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",//自定义头部高度
    // address:[],
    widH: "",//页面可用高度
    editor:true,
    nogoods: false,
    cartListDatas: [],//购物车商品数据
    cartLength:0,
    isSelectAll: false, //全选按钮
    id:0
  },
  //点击编辑
  editorFn:function(){
    this.setData({
      editor:false
    })
  },
  //点击完成
  completeFn:function(){
    this.setData({
      editor:true
    })
  },
  changeSelect(e) { //点击每个商品前的按钮
    // console.log(e.currentTarget);
    var index = e.currentTarget.dataset.index;
    var cartListDatas = this.data.cartListDatas;
    var isSelect = cartListDatas[index].isSelect;
    cartListDatas[index].isSelect = !isSelect;
    this.setData({
      cartListDatas: cartListDatas
    })
    //临时数组
    var arr = []
    for (var i = 0; i < cartListDatas.length; i++) {
      if (cartListDatas[i].isSelect) {
        arr.push(cartListDatas[i])
      }
    }
    if (arr.length == cartListDatas.length) {
      this.setData({
        isSelectAll: true
      })
    } else {
      this.setData({
        isSelectAll: false
      })
    }
    this.totalPrice()
  },
  selectAllFn() { //点击全选按钮
    var cartListDatas = this.data.cartListDatas
    var isSelectAll = this.data.isSelectAll
    isSelectAll = !isSelectAll
    for (var i = 0; i < cartListDatas.length; i++) {
      cartListDatas[i].isSelect = isSelectAll
    }
    this.setData({
      cartListDatas: cartListDatas,
      isSelectAll: isSelectAll
    })
    this.totalPrice()
  },
  //点击+号
  addCartNum(e) {
    var index = e.currentTarget.dataset.index
    console.log(index);
    var cartListDatas = this.data.cartListDatas;
    var good_num = cartListDatas[index].good_num;
    cartListDatas[index].good_num = Number(good_num) + 1;
    var cart_id = cartListDatas[index].cart_id+"|"+cartListDatas[index].good_num;
    this.postEditCart(cart_id)
    this.setData({
      cartListDatas: cartListDatas
    })
    this.totalPrice()
  },
  //点击-号
  jianCartNum(e) {
    var index = e.currentTarget.dataset.index
    console.log(index);
    var cartListDatas = this.data.cartListDatas;
    var good_num = cartListDatas[index].good_num;
    if (good_num > 1) {
      cartListDatas[index].good_num = good_num - 1;
      var cart_id = cartListDatas[index].cart_id+"|"+cartListDatas[index].good_num;
      this.postEditCart(cart_id)
    }
    this.setData({
      cartListDatas: cartListDatas
    })
    this.totalPrice()
  },
  //修改商品数量
  postEditCart(cart_id){
    requestApi1(app.globalData.base_url+"/editCart",{
      cart_id:cart_id
    })
  },
  //计算总价
  totalPrice() {  
    var cartListDatas = this.data.cartListDatas;
    var total = 0
    for (var i = 0; i < cartListDatas.length; i++) {
      if (cartListDatas[i].isSelect) {
        total += cartListDatas[i].good_price * cartListDatas[i].good_num;
      }
    }
    this.setData({
      totalPrice: total
    })
  },
  //获取默认地址
  // async getAddressLists(){
  //   let result=await requestApi(app.globalData.base_url+"/getAddressLists")
  //   this.setData({
  //     address:result.data.data
  //   })
  //   console.log(result);
  // },
  //购物车数据
  async getMyCart(){
    let result=await requestApi(app.globalData.base_url+"/myCart")
    this.setData({
      cartListDatas:result.data.data.list,
      cartLength:result.data.data.list.length
    })
    if (this.data.cartListDatas.length == 0) {
      this.setData({
        nogoods: true
      })
    } else {
      this.setData({
        nogoods: false
      })
    }
    console.log(this.data.cartListDatas);
  },
  //结算
  gobuyFn:function(){
    var cartListDatas = this.data.cartListDatas;
    var arr=[];
    var id=0;
    for(var i=0;i<cartListDatas.length;i++){
      if(cartListDatas[i].isSelect){
        arr.push(cartListDatas[i].good_id+"|"+cartListDatas[i].good_num);
        id=arr.join(",")
      }
    }
    this.setData({
      id:id
    })
    if(this.data.id==0){
      wx.showToast({
        icon:'none',
        title: '请选择商品',
      })
    }else{
      wx.setStorage({
        data: this.data.id,
        key: 'id',
      })
      wx.navigateTo({
        url: '/pages/confirmed/confirmed',
      })
    }
  },
  //删除
  deleteFn:function(){
    var cartListDatas = this.data.cartListDatas;
    var arr=[];
    var cart_id=0;
    for(var i=0;i<cartListDatas.length;i++){
      if(cartListDatas[i].isSelect){
        arr.push(cartListDatas[i].cart_id)
        cart_id=arr.join(',')
      }
    }
    this.deleteCart(cart_id)
  },
  //删除商品
  deleteCart(cart_id){
    wx.showLoading({
      title: '删除中...',
    })
    requestApi1(app.globalData.base_url+"/deleteCart",{
      cart_id:cart_id
    }).then(res=>{
      if(res.data.code==1){
        wx.showToast({
          title: '删除成功',
        })
        this.getMyCart()
      }else{
        wx.showToast({
          icon:'error',
          title: '删除失败',
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navbarHeight,
      widH: app.globalData.windowHeigtn
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
    this.getMyCart()
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