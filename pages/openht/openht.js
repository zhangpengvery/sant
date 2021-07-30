// pages/openht/openht.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person_type:1,
    realname:"",
    id_number:0,
    company:"",
    company_id:"",
    region:['请选择','请选择','请选择'],
    mobile:"",
    getPartsInfo:[],
    imageList:[],
    typeList:[],
    typeIndex:0,
    clxzList:[],
    price:0,
    clxzIndex:0,
    xhList:['陕汽','重汽'],
    xhIndex:0,
    active:1,
    nums:0,
    total:0,
    buyer_address:"",
    category:"陕汽",
    options:"",
    business_type_one:1,
    business_type_two:0,
    business_day:"",
    business_address:"",
    pay_type_one_fee:"",
    pay_type_one_day:"",
    pay_type_one_fp:"",
    pay_type_one_lp:"",
    remark:"",
    business_type_ads:"",
    business_type_fee:"",
    pay_type_one:1,
  },
  gerenFn:function(){
    this.setData({
      person_type:1,
      company:"",
      company_id:""
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindClxzChange: function (e) {
    this.setData({
      clxzIndex: e.detail.value
    })
  },
  gongsFn:function(){
    this.setData({
      person_type:2,
      id_number:""
    })
  },
  bindname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  bindname2: function (e) {
    this.setData({
      id_number: e.detail.value
    })
  },
  bindname4: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindname5: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  bindname6: function (e) {
    this.setData({
      company_id: e.detail.value
    })
  },
  bindjiage:function(e){
    var danjia=e.detail.value*10000
    this.setData({
      price:danjia
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      xhIndex: e.detail.value,
      category:this.data.xhList[e.detail.value]
    })
  },
  bindicon:function(e){
    this.setData({
      active:e.currentTarget.dataset.icon
    })
    if(e.currentTarget.dataset.icon==1){
      this.setData({
        business_type_one:1,
        business_type_two:0
      })
    }else{
      this.setData({
        business_type_two:1,
        business_type_one:0
      })
    }
  },
  bindshuliang:function(e){
    var ji=e.detail.value*this.data.price
    this.setData({
      nums:e.detail.value,
      total:ji
    })
  },
  binxiangxidz:function(e){
    var address=this.data.region[0]+this.data.region[1]+this.data.region[2]+e.detail.value
    this.setData({
      buyer_address:address
    })
  },
  bindpeizi:function(e){
    this.setData({
      options:e.detail.value
    })
  },
  bindsxday:function(e){
    this.setData({
      business_day:e.detail.value
    })
  },
  bindsxadd:function(e){
    this.setData({
      business_address:e.detail.value
    })
  },
  bindfee:function(e){
    this.setData({
      pay_type_one_fee:e.detail.value
    })
  },
  bindpayday:function(e){
    this.setData({
      pay_type_one_day:e.detail.value
    })
  },
  bindfp:function(e){
    this.setData({
      pay_type_one_fp:e.detail.value
    })
  },
  bindlp:function(e){
    this.setData({
      pay_type_one_lp:e.detail.value
    })
  },
  bindqtyd:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  bindads:function(e){
    this.setData({
      business_type_ads:e.detail.value
    })
  },
  bindyunfee:function(e){
    this.setData({
      business_type_fee:e.detail.value
    })
  },
  async getSellerList(type){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Public/getSellerList",{
      type:5
    })
    this.setData({
      typeList:result.data.datas
    })
  },
  async getGoodLists(){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Public/getGoodLists")
    this.setData({
      clxzList:result.data.datas
    })
  },
  addOrder(person_type,realname,id_number,company,company_id,city,mobile,id){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Entire/addOrderTwo",{
      person_type:person_type,
      realname:realname,
      id_number:id_number,
      company:company,
      company_id:company_id,
      city:city,
      mobile:mobile,
      id:id
    }).then(res=>{
      console.log(res);
      this.generateApi(this.data.realname,res.data.order_id,res.data.more_sn,this.data.category,this.data.nums,this.data.price,this.data.total,this.data.options,this.data.business_day,this.data.business_address,this.data.business_type_one,this.data.business_type_two,this.data.business_type_ads,this.data.business_type_fee,this.data.pay_type_one_fee,this.data.pay_type_one_day,this.data.pay_type_one_fp,this.data.pay_type_one_lp,this.data.remark,this.data.buyer_address,this.data.id_number,this.data.mobile,this.data.pay_type_one,this.data.typeList[this.data.typeIndex].user_id,res.data.user_id)
    })
  },
  generateApi(realname,order_id,order_sn,category,nums,price,total,options,business_day,business_address,business_type_one,business_type_two,business_type_ads,business_type_fee,pay_type_one_fee,pay_type_one_day,pay_type_one_fp,pay_type_one_lp,remark,buyer_address,buyer_idcard,buyer_mobile,pay_type_one,seller_id,user_id){
    requestApi1(app.globalData.base_url+"/generate2",{
      realname:realname,
      order_id:order_id,
      order_sn:order_sn,
      category:category,
      nums:nums,
      price:price,
      total:total,
      options:options,
      business_day:business_day,
      business_address:business_address,
      business_type_one:business_type_one,
      business_type_two:business_type_two,
      business_type_ads:business_type_ads,
      business_type_fee:business_type_fee,
      pay_type_one_fee:pay_type_one_fee,
      pay_type_one_day:pay_type_one_day,
      pay_type_one_fp:pay_type_one_fp,
      pay_type_one_lp:pay_type_one_lp,
      remark:remark,
      buyer_address:buyer_address,
      buyer_idcard:buyer_idcard,
      buyer_mobile:buyer_mobile,
      pay_type_one:pay_type_one,
      seller_id:seller_id,
      user_id:user_id
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      if(res.data.code!=0){
        wx.showToast({
          icon:'none',
          title: res.data.description,
        })
      }else{
        wx.showToast({
          title: '提交成功',
        })
      }
      console.log(res);
    })
  },
  gobuyFn:function(){
    this.addOrder(this.data.person_type,this.data.realname,this.data.id_number,this.data.company,this.data.company_id,this.data.city,this.data.mobile,this.data.clxzList[this.data.clxzIndex].good_id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSellerList()
    this.getGoodLists()
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