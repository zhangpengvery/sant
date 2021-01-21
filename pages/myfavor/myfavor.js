// pages/myfavor/myfavor.js
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
    activexiao:0,
    type:"all",
    dian:false,
    zixun:true,
    myFavorList:[],
    showMask:false,
    showCs:false,
    isSelectAll: false, //全选按钮
  },
  async myFavorList(type){
    wx.showLoading({
      title: '加载中...',
    })
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/StoreCar/myFavorList",{
      p:1,
      type:type
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      myFavorList:result.data.datas
    })
    console.log(this.data.myFavorList);
  },
  //全选
  bindAll:function(){
    this.setData({
      type:"all",
      active:0,
      zixun:true
    })
    this.myFavorList(this.data.type)
  },
  //整车
  bindEnti:function(){
    this.setData({
      type:"entire",
      active:1,
      zixun:true
    })
    this.myFavorList(this.data.type)
  },
  //配件
  bindPar:function(){
    this.setData({
      type:"parts",
      active:2,
      zixun:true
    })
    this.myFavorList(this.data.type)
  },
  //资讯
  bindTow:function(){
    this.setData({
      active:3,
      type:"info",
      zixun:false
    })
    this.myFavorList(this.data.type)
  },
  bindTow2:function(){
    this.setData({
      showMask:true,
      showCs:true
    })
  },
  //编辑点击
  dianFn:function(){
    this.setData({
      dian:true
    })
  },
  dianFndian:function(){
    this.setData({
      dian:false
    })
  },
  showChus:function(){
    this.setData({
      activexiao:1,
      type:"sale",
      showCs:false,
      showMask:false
    })
    this.myFavorList(this.data.type)
  },
  showCz:function(){
    this.setData({
      activexiao:2,
      type:"hire",
      showMask:false,
      showCs:false
    })
    this.myFavorList(this.data.type)
  },
  //蒙版点击
  maskFn:function(){
    this.setData({
      showMask:false,
      showCs:false
    })
  },
  showCs:function(){
    
  },
  changeSelect(e) { //点击每个商品前的按钮
    // console.log(e.currentTarget);
    var index = e.currentTarget.dataset.index;
    var myFavorList = this.data.myFavorList;
    var isSelect = myFavorList[index].isSelect;
    myFavorList[index].isSelect = !isSelect;
    this.setData({
      myFavorList: myFavorList
    })
    //临时数组
    var arr = []
    for (var i = 0; i < myFavorList.length; i++) {
      if (myFavorList[i].isSelect) {
        arr.push(myFavorList[i])
      }
    }
    if (arr.length == myFavorList.length) {
      this.setData({
        isSelectAll: true
      })
    } else {
      this.setData({
        isSelectAll: false
      })
    }
  },
  selectAllFn() { //点击全选按钮
    var myFavorList = this.data.myFavorList
    var isSelectAll = this.data.isSelectAll
    isSelectAll = !isSelectAll
    for (var i = 0; i < myFavorList.length; i++) {
      myFavorList[i].isSelect = isSelectAll
    }
    this.setData({
      myFavorList: myFavorList,
      isSelectAll: isSelectAll
    })
  },
  //删除
  deleteFn:function(){
    var myFavorList = this.data.myFavorList;
    var arr=[];
    var favor_id=0;
    for(var i=0;i<myFavorList.length;i++){
      if(myFavorList[i].isSelect){
        arr.push(myFavorList[i].favor_id)
        favor_id=arr.join(',')
      }
    }
    this.deleteMyFavor(favor_id)
    this.myFavorList(this.data.type)
  },
  deleteMyFavor(favor_id){
    requestApi1(app.globalData.post_url+"/index.php/Api/StoreCar/deleteMyFavor",{
      favor_id:favor_id
    }).then(res=>{
      this.myFavorList(this.data.type)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myFavorList(this.data.type)
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