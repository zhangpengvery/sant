// components/navber/navber.js
let app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    params:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH:"",
    city:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cityList:function(){
      wx.navigateTo({
        url: '/pages/city/city',
      })
    },
    back(){
      wx.navigateBack()
    },
    // getProvinceName(latitude, longitude){
    //   wx.request({
    //     url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',   
    //     data:{},
    //     success: (res)=> {
    //       this.setData({
    //         city:res.data.result.address_component.city
    //       })
    //     },
    //   })
    // },
  },
  pageLifetimes:{
    show: function() {
      this.setData({
        city:wx.getStorageSync('cityname')
      })
    },
  },
  attached(){
    // var that=this
    // wx.getLocation({
    //   type:'wgs84',
    //   success(res){
    //     that.getProvinceName(res.latitude,res.longitude)
    //   }
    // })
    this.setData({
      navH:app.globalData.navbarHeight,
      // city:wx.getStorageSync('cityname')
    })
  },
})
