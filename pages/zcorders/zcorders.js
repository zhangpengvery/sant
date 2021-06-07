// pages/zcorders/zcorders.js
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
    city:"",
    mobile:"",
    id:0,
    getPartsInfo:[],
    imageList:[],
  },
  generateApi(realname,mobile,order_id,order_sn){
    requestApi1(app.globalData.base_url+"/generate",{
      realname:realname,
      mobile:mobile,
      order_id:order_id,
      order_sn:order_sn
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
        wx.setStorage({
          data: res.data.data.signUrl,
          key: 'url',
        })
        wx.setStorage({
          data: res.data.contractCode,
          key: 'contractCode',
        })
        wx.navigateTo({
          url: '/pages/gzhgo/gzhgo',
        })
      }
      console.log(res);
    })
  },
  async getPartsInfo(good_id){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Entire/getGoodInfo",{
      good_id:good_id
    })
    this.setData({
      getPartsInfo:result.data.datas,
    })
  },

  addOrder(person_type,realname,id_number,company,company_id,city,mobile,id){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.post_url+"/index.php/Api/Entire/addOrder",{
      person_type:person_type,
      realname:realname,
      id_number:id_number,
      company:company,
      company_id:company_id,
      city:city,
      mobile:mobile,
      id:id
    }).then(res=>{
      // console.log(res);
      
      this.generateApi(this.data.realname,this.data.mobile,res.data.order_id,res.data.more_sn)
    })
  },
  gerenFn:function(){
    this.setData({
      person_type:1,
      company:"",
      company_id:""
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
  bindname3: function (e) {
    this.setData({
      city: e.detail.value
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
  gobuyFn:function(){
    if(wx.getStorageSync('token')==[]){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else if(this.data.person_type==1){
      if(this.data.realname==""){
        wx.showToast({
          icon:'none',
          title: '请输入姓名',
        })
      }else if(this.data.id_number==0){
        wx.showToast({
          icon:'none',
          title: '请输入证件号码',
        })
      }else if(this.data.city==""){
        wx.showToast({
          icon:'none',
          title: '请输入城市',
        })
      }else if(this.data.mobile==0){
        wx.showToast({
          icon:'none',
          title: '请输入联系电话',
        })
      }else{
        this.addOrder(this.data.person_type,this.data.realname,this.data.id_number,this.data.company,this.data.company_id,this.data.city,this.data.mobile,this.data.id)
      }
    }else if(this.data.person_type==2){
      if(this.data.realname==""){
        wx.showToast({
          icon:'none',
          title: '请输入姓名',
        })
      }else if(this.data.company==""){
        wx.showToast({
          icon:'none',
          title: '请输入企业名称',
        })
      }else if(this.data.company_id==""){
        wx.showToast({
          icon:'none',
          title: '请输入企业代码',
        })
      }else if(this.data.city==""){
        wx.showToast({
          icon:'none',
          title: '请输入城市',
        })
      }else if(this.data.mobile==0){
        wx.showToast({
          icon:'none',
          title: '请输入联系电话',
        })
      }else{
        this.addOrder(this.data.person_type,this.data.realname,this.data.id_number,this.data.company,this.data.company_id,this.data.city,this.data.mobile,this.data.id)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.good_id
    })
    this.getPartsInfo(options.good_id)
    console.log(options.good_id);
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