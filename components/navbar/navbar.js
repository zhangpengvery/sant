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
    navH:""
  },
  getProvinceName(latitude, longitude){
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=ZXJBZ-3FVRP-6BYD2-VAAXH-5GHMS-LHFHR',   
      data:{},
      success: (res)=> {
        console.log(res)
        this.setData({
          city:res.data.result.address_component.city
        })
        },
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      wx.navigateBack()
    }
  },
  attached(){
    this.setData({
      navH:app.globalData.navbarHeight
    })
  },
})
