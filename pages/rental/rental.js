// pages/rental/rental.js
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
      text:"请输入您搜索的内容"
    },
    page:1,
    navH:0,
    winH:0,
    brandCss:0,
    chassisCss:0,
    driveCss:0,
    ageCss:0,
    sourceCss:0,
    dischargeCss:0,
    leftActive:true,
    rightActive:false,
    color:false,
    chshiColor:false,
    cityColor:false,
    showMask:false,
    showJiahao:false,
    showChahao:false,
    showMaxmaks:false,
    showjuli:false,
    showcity:false,
    showChshi:false,
    listLeft:true,
    listRight:false,
    age_up:0,
    price_up:0,
    jiageActtiv:0,
    cityActive: 16,
    getAllHireLists:[],
    getBrandList:[],
    getChassisList:[],
    getDriveList:[],
    getAgeList:[],
    getSourceList:[],
    getDischargeList:[],
    getAllHireforLists:[],
    getCityList:[],
    getRecruitList:[],
    rigthUrl:"https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=16",
    city:0,
    triggered:false
  },
  //出租列表
  recruitFn:function(e){
    this.setData({
      leftActive:true,
      rightActive:false,
      listLeft:true,
      listRight:false
    })
  },
  //求租列表
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
        chshiColor:false,
        showJuli:false,
        showcity:false,
        showChshi:false
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
    //综合排序点击
    distanceFn:function(){
      this.setData({
        showMask:true,
        showJuli:true,
        color:true,
        cityColor:false,
        showcity:false,
        chshiColor:false,
        showChshi:false,
      })
    },
    //城市点击
    cityFn:function(){
      this.setData({
        chshiColor:true,
        showChshi:true,
        showMask:true,
        showJuli:false,
        color:false,
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
        showcity:true,
        chshiColor:false,
        showChshi:false,
      })
    },
    //普通排序点击
    juliFn:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:0,
        age_up:0,
        price_up:0
      })
      if(this.data.leftActive){
        this.getAllHireforLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }else{
        this.getAllHireLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
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
        this.getAllHireforLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }else{
        this.getAllHireLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
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
        this.getAllHireforLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }else{
        this.getAllHireLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }
    },
    juliFn4:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:3,
        age_up:1
      })
      if(this.data.leftActive){
        this.getAllHireforLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }else{
        this.getAllHireLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }
    },
    juliFn5:function(e){
      this.setData({
        showMask:false,
        showJuli:false,
        color:false,
        jiageActtiv:4,
        age_up:0
      })
      if(this.data.leftActive){
        this.getAllHireforLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }else{
        this.getAllHireLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
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
        this.getAllHireforLists2(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }else{
        this.getAllHireLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
      }
    },
    //出租列表
    async getAllHireLists(page,hire_brand_id,hire_age_id,hire_chassis_id,hire_drive_id,hire_source_id,hire_discharge_id,hire_city_id,leng_up,price_up){
      wx.showLoading({
        title: '加载中...',
      })
      let result=await requestApi(app.globalData.base_url+"/getAllHireLists",{
        page:page,
        hire_brand_id:hire_brand_id,
        hire_age_id:hire_age_id,
        hire_chassis_id:hire_chassis_id,
        hire_drive_id:hire_drive_id,
        hire_source_id:hire_source_id,
        hire_discharge_id:hire_discharge_id,
        hire_city_id:hire_city_id,
        leng_up:leng_up,
        price_up:price_up
      })
      if(result.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        getAllHireLists:result.data.data.list,
        getBrandList:result.data.data.brand_list,
        getChassisList:result.data.data.chassis_list,
        getDriveList:result.data.data.drive_list,
        getAgeList:result.data.data.age_list,
        getSourceList:result.data.data.source_list,
        getDischargeList:result.data.data.discharge_list
      })
      console.log(result);
    },
    //出租列表
    async getAllHireLists2(page,hire_brand_id,hire_age_id,hire_chassis_id,hire_drive_id,hire_source_id,hire_discharge_id,hire_city_id,leng_up,price_up){
      wx.showLoading({
        title: '加载中...',
      })
      let result=await requestApi(app.globalData.base_url+"/getAllHireLists",{
        page:page,
        hire_brand_id:hire_brand_id,
        hire_age_id:hire_age_id,
        hire_chassis_id:hire_chassis_id,
        hire_drive_id:hire_drive_id,
        hire_source_id:hire_source_id,
        hire_discharge_id:hire_discharge_id,
        hire_city_id:hire_city_id,
        leng_up:leng_up,
        price_up:price_up
      })
      if(result.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        getAllHireLists:result.data.data.list,
        triggered:false
      })
      console.log(result);
    },
  //求租列表
  async getAllHireforLists(page,hirefor_brand_id,hirefor_age_id,hirefor_chassis_id,hirefor_drive_id,hirefor_source_id	,hirefor_discharge_id,hirefor_city_id,age_up,price_up){
    wx.showLoading({
      title: '加载中...',
    })
      let result=await requestApi(app.globalData.base_url+"/getAllHireforLists",{
        page:page,
        hirefor_brand_id:hirefor_brand_id,
        hirefor_age_id:hirefor_age_id,
        hirefor_chassis_id:hirefor_chassis_id,
        hirefor_drive_id:hirefor_drive_id,
        hirefor_source_id:hirefor_source_id,
        hirefor_discharge_id:hirefor_discharge_id,
        hirefor_city_id:hirefor_city_id,
        age_up:age_up,
        price_up:price_up
      })
      if(result.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        getAllHireforLists:result.data.data.list
      })
      console.log(this.data.getAllHireforLists);
  },
  //求租列表
  async getAllHireforLists2(page,hirefor_brand_id,hirefor_age_id,hirefor_chassis_id,hirefor_drive_id,hirefor_source_id	,hirefor_discharge_id,hirefor_city_id,age_up,price_up){
    let result=await requestApi(app.globalData.base_url+"/getAllHireforLists",{
      page:page,
      hirefor_brand_id:hirefor_brand_id,
      hirefor_age_id:hirefor_age_id,
      hirefor_chassis_id:hirefor_chassis_id,
      hirefor_drive_id:hirefor_drive_id,
      hirefor_source_id:hirefor_source_id,
      hirefor_discharge_id:hirefor_discharge_id,
      hirefor_city_id:hirefor_city_id,
      age_up:age_up,
      price_up:price_up
    })
    this.setData({
      getAllHireforLists:result.data.data.list,
      triggered:false
    })
},
  //城市请求
  async getCityList(){
    let result=await requestApi(app.globalData.post_url+"/index.php/Api/Public/get_area")
    this.setData({
      getCityList:result.data.datas.area_list
    })
  },
  //城市每项点击
  SaveFn:function(e){
    this.setData({
      cityActive:e.target.dataset.id,
      rigthUrl:`https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=${e.target.dataset.id}`
    })
    this.getChengFn()
  },
  //点击每个城市切换内容
  getChengFn(){
    wx.request({
      url: this.data.rigthUrl,
      success:(res)=>{
        this.setData({
          getRecruitList:res.data.datas.area_list
        })
      }
    })
  },
  rightBoxFn:function(e){
    var that=this
    this.setData({
      city:e.target.dataset.id,
      showMask:false,
      chshiColor:false,
      showChshi:false,
    },function(){
      if(that.data.leftActive==true){
        that.getAllHireforLists(that.data.page,that.data.brandCss,that.data.ageCss,that.data.chassisCss,that.data.driveCss,that.data.sourceCss,that.data.dischargeCss,that.data.city,that.data.age_up,that.data.price_up)
      }else{
        that.getAllHireLists(that.data.page,that.data.brandCss,that.data.ageCss,that.data.chassisCss,that.data.driveCss,that.data.sourceCss,that.data.dischargeCss,that.data.city,that.data.age_up,that.data.price_up)
      }
    })
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1,
    },function(){
      if(that.data.leftActive){
        that.getAllHireforLists2(that.data.page,that.data.brandCss,that.data.ageCss,that.data.chassisCss,that.data.driveCss,that.data.sourceCss,that.data.dischargeCss,that.data.city,that.data.age_up,that.data.price_up)
      }else if(that.data.rightActive){
        that.getAllHireLists2(that.data.page,that.data.brandCss,that.data.ageCss,that.data.chassisCss,that.data.driveCss,that.data.sourceCss,that.data.dischargeCss,that.data.city,that.data.age_up,that.data.price_up)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCityList()
    this.getChengFn()
    this.getAllHireLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
    this.getAllHireforLists(this.data.page,this.data.brandCss,this.data.ageCss,this.data.chassisCss,this.data.driveCss,this.data.sourceCss,this.data.dischargeCss,this.data.city,this.data.age_up,this.data.price_up)
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH = (clientHeight * ratio)-138-app.globalData.navbarHeight;
         this.setData({
          navH:app.globalData.navbarHeight,
          winH:ScrH
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