// pages/home/home.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: false,
      navTitle: true,
      navInput: true,
      navAddress: true,
      r: 255,
      g: 255,
      b: 255,
      w: 20,
      inpLeft: 105,
      l: 50,
      fz: 34,
      fw: "bold",
      navColor: 1,
      col: "#333",
      title: "三泰汽车"
    },
    city:"",
    navH: 0,
    winH: 0,
    page: 1,
    user_id: 0,
    type: 'sale',
    hidden: false,
    urgentphone: '4009007819',
    servicephone: '4009007819',
    dixian:false,
    getIndexIcons: [],
    getSwiperImages: [],
    listData: [],
    getHotActivity:[],
    getXcxSwiperImage:[],
    triggered:false,
    account:false
  },
  //收藏点击
  shoucFn: function (e) {
    if (wx.getStorageSync('token')==[]) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      var index = e.currentTarget.dataset.index;
      var listData = this.data.listData;
      var sale_id = listData[index].sale_id;
      listData[index].favor_data = sale_id;
      this.setData({
        listData: listData
      })
      this.postFavorAdd(sale_id)
    }
  },
  //删除收藏
  qiehuanFn: function (e) {
    var index = e.currentTarget.dataset.index;
    var listData = this.data.listData;
    var favor_id = listData[index].favor_data;
    listData[index].favor_data = null;
    this.setData({
      listData: listData
    })
    console.log(favor_id);
    this.deleteMyFavor(favor_id)
  },
  peijdeFn:function(e){
    wx.navigateTo({
      url: '/pages/peijdetail/peijdetail?good_id='+e.currentTarget.dataset.good_id,
    })
  },
  async getIndexIcons() {
    let result = await requestApi(app.globalData.base_url + "/getIndexIcons")
    this.setData({
      getIndexIcons: result.data.data
    })
  },
  async getSwiperImages() {
    let result = await requestApi(app.globalData.base_url + "/getSwiperImages")
    this.setData({
      getSwiperImages: result.data.data.pj_list
    })
  },
  async getXcxSwiperImage() {
    let result = await requestApi(app.globalData.base_url + "/getNewSwiperImage")
    this.setData({
      getXcxSwiperImage: result.data.data.dcd
    })
  },
  async getHotActivity() {
    let result = await requestApi(app.globalData.base_url + "/getHotActivity")
    this.setData({
      getHotActivity: result.data.data
    })
  },
  //未登录二手
  postHomeBestListNo(page) {
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url + "/getSaleLists", {
      page: page,
      user_id: 0
    }).then(res => {
      if(res.statusCode==200){
        wx.hideLoading()
      }
      if(res.data.data.length==0){
        this.setData({
          dixian:true
        })
      }else{
        this.setData({
          listData: this.data.listData.concat(res.data.data)
        })
      }
    })
  },
  //未登录二手
  postHomeBestListNo2(page) {
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url + "/getSaleLists", {
      page: page,
      user_id: 0
    }).then(res => {
      if(res.statusCode==200){
        wx.hideLoading()
      }
      this.setData({
        listData:res.data.data,
        triggered:false
      })
    })
  },
  //登录二手
  postHomeBestList(page, user_id) {
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url + "/getSaleLists", {
      page: page,
      user_id: user_id
    }).then(res => {
      if(res.statusCode==200){
        wx.hideLoading()
      }
      if(res.data.data.length==0){
        this.setData({
          dixian:true
        })
      }else{
        this.setData({
          listData: this.data.listData.concat(res.data.data)
        })
      }
      console.log(res);
    })
  },
  postHomeBestList2(page, user_id) {
    wx.showLoading({
      title: '加载中...',
    })
    requestApi1(app.globalData.base_url + "/getSaleLists", {
      page: page,
      user_id: user_id
    }).then(res => {
      if(res.statusCode==200){
        wx.hideLoading()
      }
      if(res.data.data.length==0){
        this.setData({
          dixian:true
        })
      }else{
        this.setData({
          listData:res.data.data,
          triggered:false
        })
      }
    })
  },
  binddaikuan:function(e){
    console.log(e);
    if(e.currentTarget.dataset.index==0){
      wx.navigateTo({
        url: '/pages/joinsant/joinsant',
      })
    }
  },
  bindshow:function(){
    wx.showToast({
      icon:'none',
      title: '敬请期待！',
    })
  },
  loadMore() {
    this.setData({
      page: ++this.data.page
    })
    if (wx.getStorageSync('user_id') == []) {
      this.postHomeBestListNo(this.data.page)
    } else {
      this.postHomeBestList(this.data.page, this.data.user_id)
    }
  },
  //整车跳转
  bindSanqFn:function(e){
    wx.navigateTo({
      url: '/pages/newcar/newcar?brand_id='+e.currentTarget.dataset.brand_id,
    })
  },
  bindTangFn:function(){
    wx.navigateTo({
      url: '/pages/newcar/newcar?brand_id=7',
    })
  },
  urgentFn: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.urgentphone,
    })
  },
  serviceFn: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.servicephone,
    })
  },
  postFavorAdd(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type: "sale",
      favor_data: favor_data
    }).then(res=>{
      console.log(res);
    })
  },
  deleteMyFavor(favor_data) {
    requestApi1(app.globalData.post_url + "/index.php/Api/StoreCar/addFavor", {
      type:"sale",
      favor_data: favor_data
    }).then(res => {
      console.log(res);
    })
  },
  bindAddFn:function(){
    wx.navigateTo({
      url: '/pages/allries/allries?cate_id2=0',
    })
  },
  cityList:function(){
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  bindevenFn:function(){
    wx.navigateTo({
      url: '/pages/evenlist/evenlist',
    })
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1
    },function(){
      if (wx.getStorageSync('user_id') == []) {
        that.postHomeBestListNo2(1)
      } else {
        that.postHomeBestList2(1, that.data.user_id)
      }
    })
  },
  bindMain:function(e){
    wx.navigateTo({
      url: '/pages/maintain/maintain?id=1',
    })
  },
  bindMain2:function(){
    wx.navigateTo({
      url: '/pages/maintain/maintain?id=2',
    })
  },
  bindUrl:function(e){
    wx.redirectTo({
      url: e.currentTarget.dataset.url,
    })
  },
  dizhi:function(){
    var that=this
    if(wx.getStorageSync('cityname')!=wx.getStorageSync('newcityname')&&wx.getStorageSync('newcityname')!=[]){
      wx.showModal({
        title:'温馨提示',
        content:'您当前城市是'+wx.getStorageSync('newcityname')+'，是否切换到当前城市',
        cancelText:'不切换',
        confirmText:'切换',
        success(res){
          if (res.confirm) {
            that.setData({
              city:wx.getStorageSync('newcityname')
            })
            wx.setStorage({
              data: wx.getStorageSync('newcityname'),
              key: 'cityname',
              success(res){
                wx.removeStorageSync('newcityname')
              }
            })
          }else if(res.cancel){
            wx.setStorage({
              data: 1,
              key: 'newcityname',
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if(wx.getStorageSync('cityname')==[]){
      wx.getLocation({
        type:'wgs84',
        success(res){
            wx.request({
              url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',
              data:{},
              success: (res)=> {
                  that.setData({
                    city:res.data.result.address_component.city
                  })
                  wx.setStorage({
                    data: res.data.result.address_component.city,
                    key: 'cityname',
                  })
              },
            })
        },
        fail(res){
          that.setData({
            city:'郑州市'
          })
          wx.setStorage({
            data: '郑州市',
            key: 'cityname',
          })
        }
      })
    }
    if(wx.getStorageSync('newcityname')==[]){
      wx.getLocation({
        type:'wgs84',
        success(res){
            wx.request({
              url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',
              data:{},
              success: (res)=> {
                if(res.data.result.address_component.city!=wx.getStorageSync('cityname')){
                  wx.setStorage({
                    data: res.data.result.address_component.city,
                    key: 'newcityname',
                  })
                  that.dizhi()
                }
              },
            })
        },
        fail(res){
          that.setData({
            city:'郑州市'
          })
          wx.setStorage({
            data: '郑州市',
            key: 'cityname',
          })
        }
      })
    }
    if (wx.getStorageSync('user_id') == []) {
      this.postHomeBestListNo2(this.data.page)
    } else {
      this.postHomeBestList2(this.data.page, this.data.user_id)
    }
    this.getXcxSwiperImage()
    console.log(app.globalData.scene);
    this.getHotActivity()
    this.setData({
      user_id: wx.getStorageSync('user_id'),
      navH: app.globalData.navbarHeight,
    })
    this.getIndexIcons(),
    this.getSwiperImages();
    wx.getSystemInfo({
      success: (result) => {
        var scene=app.globalData.scene
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH =clientHeight * ratio
        this.setData({
          winH:ScrH-app.globalData.navbarHeight
        })
        if(scene==1047){
          this.setData({
            account:true
          })
        }else if(scene==1124){
          this.setData({
            account:true
          })
        }else if(scene==1038){
          this.setData({
            account:true
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    this.setData({
      city:wx.getStorageSync('cityname')
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      city:wx.getStorageSync('cityname')
    })
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