// pages/trad/trad.js
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
    page:1,
    navH:0,
    posH:0,
    winH:0,
    brandCss:0,
    chassisCss:0,
    driveCss:0,
    ageCss:0,
    sourceCss:0,
    dischargeCss:0,
    jiageActtiv:0,
    leftActive:true,
    rightActive:false,
    color:false,
    cityColor:false,
    showMask:false,
    showJiahao:false,
    showChahao:false,
    showMaxmaks:false,
    showjuli:false,
    showcity:false,
    listLeft:true,
    listRight:false,
    getAllSaleList:[],
    getBrandList:[],
    getChassisList:[],
    getDriveList:[],
    getAgeList:[],
    getSourceList:[],
    getDischargeList:[],
    getSaleforLists:[],
    leng_up:0,
    price_up:0
  },
  recruitFn:function(e){
    this.setData({
      leftActive:true,
      rightActive:false,
      listLeft:true,
      listRight:false
    })
  },
  jobFn:function(){
    this.setData({
      leftActive:false,
      rightActive:true,
      listLeft:false,
      listRight:true
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
        color:false,
        cityColor:false,
        showJuli:false,
        showcity:false,
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
    //排序点击
    distanceFn:function(){
      this.setData({
        showMask:true,
        showJuli:true,
        color:true,
        cityColor:false,
        showcity:false
      })
    },
    //筛选点击
    screenFn:function(){
      this.setData({
        showMask:true,
        showJuli:false,
        color:false,
        cityColor:true,
        showcity:true
      })
    },
    //普通排序点击
    juliFn:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:0,
        leng_up:0,
        price_up:0
      })
      if(this.data.leftActive){
        this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }else{
        this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }
    },
    juliFn2:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:1,
        price_up:1
      })
      if(this.data.leftActive){
        this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }else{
        this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }
    },
    juliFn3:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:2,
        price_up:0
      })
      if(this.data.leftActive){
        this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }else{
        this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }
    },
    juliFn4:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:3,
        leng_up:1
      })
      if(this.data.leftActive){
        this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }else{
        this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }
    },
    juliFn5:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:4,
        leng_up:0
      })
      if(this.data.leftActive){
        this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }else{
        this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }
    },
    //品牌点击
    brandcssFn:function(e){
      this.setData({
        brandCss:e.target.dataset.id
      })
    },
    //底盘点击
    chassisFn:function(e){
      this.setData({
        chassisCss:e.target.dataset.id
      })
    },
    //驱动点击
    driveFn:function(e){
      this.setData({
        driveCss:e.target.dataset.id
      })
    },
    //车龄点击
    agecssFn:function(e){
      this.setData({
        ageCss:e.target.dataset.id
      })
    },
    //来源点击
    sourceFn:function(e){
      this.setData({
        sourceCss:e.target.dataset.id
      })
    },
    //排放点击
    dischargeFn:function(e){
      this.setData({
        dischargeCss:e.target.dataset.id
      })
    },
    showBtnFn:function(){
      this.setData({
        showMask:false,
        color:false,
        cityColor:false,
        showcity:false,
      })
      if(this.data.leftActive){
        this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }else{
        this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
      }
    },
    //出售列表
    async getAllSaleList(page,sale_brand_id,sale_age_id,sale_chassis_id,sale_drive_id,sale_source_id,sale_discharge_id,leng_up,price_up){
      wx.showLoading({
        title: '加载中...',
      })
      let result=await requestApi(app.globalData.base_url+"/getAllSaleLists",{
        page:page,
        sale_brand_id:sale_brand_id,
        sale_age_id:sale_age_id,
        sale_chassis_id:sale_chassis_id,
        sale_drive_id:sale_drive_id,
        sale_source_id:sale_source_id,
        sale_discharge_id:sale_discharge_id,
        leng_up:leng_up,
        price_up:price_up
      })
      if(result.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        getAllSaleList:result.data.data.list,
        getBrandList:result.data.data.brand_list,
        getChassisList:result.data.data.chassis_list,
        getDriveList:result.data.data.drive_list,
        getAgeList:result.data.data.age_list,
        getSourceList:result.data.data.source_list,
        getDischargeList:result.data.data.discharge_list
      })
    },
    async getAllSaleforLists(page,salefor_brand_id,salefor_age_id,salefor_chassis_id,salefor_drive_id,salefor_source_id,salefor_discharge_id,age_up,price_up){
      let result=await requestApi(app.globalData.base_url+"/getAllSaleforLists",{
        page:page,
        salefor_brand_id:salefor_brand_id,
        salefor_age_id:salefor_age_id,
        salefor_chassis_id:salefor_chassis_id,
        salefor_drive_id:salefor_drive_id,
        salefor_source_id:salefor_source_id,
        salefor_discharge_id:salefor_discharge_id,
        age_up:age_up,
        price_up:price_up
      })
      this.setData({
        getSaleforLists:result.data.data.list
      })
      console.log(this.data.getSaleforLists);
    },
    //滑动到底部
    bindLanFn:function(){
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSaleList(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
    this.getAllSaleforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.leng_up,this.data.price_up)
    wx.getSystemInfo({
      success: (result) => {
         this.setData({
          navH:app.globalData.navbarHeight,
          posH:app.globalData.navbarHeight+49,
          winH:app.globalData.windowHeigtn+250+app.globalData.navbarHeight
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