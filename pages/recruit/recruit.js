// pages/recruit/recruit.js
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
      showBack:false,
      navTitle:false,
      navInput:true,
      navAddress:true,
      bg:true,
      r:255,
      g:255,
      b:255,
      w:50,
      l:50,
      inpLeft:160,
      fz:34,
      navColor:1,
      col:"#000",
    },
    navH:0,
    ScrH:0,
    page:1,
    page2:1,
    ja_city_id:"",
    ja_type_id:"",
    ja_ex_id:"",
    ja_salary_id:"",
    typeCss:0,
    cityCss:0,
    exCss:0,
    salaryCss:0,
    postRecruitList:[],
    postSalaryList:[],
    postTypeList:[],
    postExList:[],
    postCityList:[],
    getJobRecruitLists:[],
    leftActive:true,
    rightActive:false,
    showMask:false,
    showMaxmaks:false,
    showJiahao:false,
    showChahao:false,
    color:false,
    cityColor:false,
    commonColor:false,
    showzhiwei:false,
    showcity:false,
    showyaoqiu:false
  },
  //职位点击
  distanceFn:function(e){
    this.setData({
      color:true,
      cityColor:false,
      commonColor:false,
      showMask:true,
      showzhiwei:true,
      showcity:false,
      showyaoqiu:false
    })
  },
  //城市点击
  cityFn:function(){
    this.setData({
      cityColor:true,
      color:false,
      commonColor:false,
      showMask:true,
      showzhiwei:false,
      showcity:true,
      showyaoqiu:false
    })
  },
  //要求点击
  yaoqiuFn:function(){
    this.setData({
      commonColor:true,
      color:false,
      cityColor:false,
      showMask:true,
      showzhiwei:false,
      showcity:false,
      showyaoqiu:true
    })
  },
  //我要招募点击
  recruitFn:function(e){
    this.setData({
      leftActive:true,
      rightActive:false
    })
  },
  //我要求职点击
  jobFn:function(){
    this.setData({
      leftActive:false,
      rightActive:true
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
  //小蒙版
  maskFn:function(){
    this.setData({
      showMask:false,
      commonColor:false,
      color:false,
      cityColor:false,
      showzhiwei:false,
      showcity:false,
      showyaoqiu:false
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
  //招聘接口
  postRecruitList(page,ja_city_id,ja_type_id,ja_ex_id,ja_salary_id	){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url+"/getJobSupplyLists",{
      page:page,
      ja_city_id:ja_city_id,
      ja_type_id:ja_type_id,
      ja_ex_id:ja_ex_id,
      ja_salary_id:ja_salary_id
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        postRecruitList:this.data.postRecruitList.concat(res.data.data.list),
        postSalaryList:res.data.data.salary,
        postTypeList:res.data.data.type,
        postExList:res.data.data.ex,
        postCityList:res.data.data.city
      })
    })
  },
  //求职接口
  getJobRecruitLists(page2,ja_city_id,ja_type_id,ja_ex_id,ja_salary_id	){
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url+"/getJobRecruitLists",{
      page2:page2,
      ja_city_id:ja_city_id,
      ja_type_id:ja_type_id,
      ja_ex_id:ja_ex_id,
      ja_salary_id:ja_salary_id
    }).then(res=>{
      if(res.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        getJobRecruitLists:this.data.getJobRecruitLists.concat(res.data.data.list),
      })
  })
  },
  //职位点击
  typeFn:function(e){
    this.setData({
      ja_type_id:e.target.dataset.id,
      typeCss:e.target.dataset.id,
      showMask:false,
      color:false,
      showzhiwei:false
    })
    if(this.data.leftActive==true){
      this.postRecruitList(this.data.page,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    }
    if(this.data.rightActive==true){
      this.getJobRecruitLists(this.data.page2,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    }
  },
  cityXuanzFn:function(e){
    this.setData({
      cityCss:e.target.dataset.id,
      ja_city_id:e.target.dataset.id,
      showcity:false,
      showMask:false,
      cityColor:false
    })
    if(this.data.leftActive==true){
      this.postRecruitList(this.data.page,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    }
    if(this.data.rightActive==true){
      this.getJobRecruitLists(this.data.page2,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    }
  },
  excssFn:function(e){
    this.setData({
      exCss:e.target.dataset.id,
      ja_ex_id:e.target.dataset.id,
    })
  },
  salacssFn:function(e){
    this.setData({
      salaryCss:e.target.dataset.id,
      ja_salary_id:e.target.dataset.id,
    })
  },
  showBtnFn:function(){
    this.setData({
      showyaoqiu:false,
      commonColor:false,
      showMask:false
    })
    if(this.data.leftActive==true){
      this.postRecruitList(this.data.page,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    }
    if(this.data.rightActive==true){
      this.getJobRecruitLists(this.data.page2,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    }
  },
  loadMore(){
    this.setData({
      page:++this.data.page
    })
    this.postRecruitList(this.data.page,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
  },
  loadMore2(){
    this.setData({
      page2:++this.data.page2
    })
    this.postRecruitList(this.data.page2,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.postRecruitList(this.data.page,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    this.getJobRecruitLists(this.data.page,this.data.ja_city_id,this.data.ja_type_id,this.data.ja_ex_id,this.data.ja_salary_id)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH = (clientHeight * ratio)-138-app.globalData.navbarHeight;
        this.setData({
          ScrH:ScrH,
          navH:app.globalData.navbarHeight,
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