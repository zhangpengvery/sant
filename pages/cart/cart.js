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
    cityDatas: "",
    address:"",
    widH: "",//页面可用高度
    editor:true,
    nogoods: false,
    cartListDatas: [],//购物车商品数据
    cartLength:0,
    isSelectAll: false, //全选按钮
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
  totalPrice() {  //计算总价
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
  async getAddressLists(){
    let result=await requestApi(app.globalData.base_url+"/getAddressLists")
    this.setData({
      cityDatas:result.data.data[0].area_info,
      address:result.data.data[0].address
    })
  },
  //购物车数据
  async getMyCart(){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.base_url+"/myCart")
    if(result.statusCode==200){
      wx.hideLoading()
    }
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
  gobuyFn:function(){
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
    this.getMyCart()
  },
  //删除商品
  deleteCart(cart_id){
    requestApi1(app.globalData.base_url+"/deleteCart",{
      cart_id:cart_id
    })
    this.getMyCart()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCart()
    this.getAddressLists()
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