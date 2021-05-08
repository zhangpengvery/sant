// pages/newress/newress.js
const app=getApp()
let{
  requestApi, requestApi1
}=require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province_list:null,
    province_name:null,
    city_list:null,
    city_name:null,
    area_list:null,
    area_name:null,
    addressCity:['请选择','请选择','请选择'],
    multiArray: [],  // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标,
    selectProvinceId:null,
    selectCityId:null,
    selectAreaId:null,
    true_name:"",
    phone:0,
    address:"",
    is_def:0,
  },
  //切换按钮
  switchFn:function(e){
    if(e.detail.value){
      this.setData({
        is_def:1
      })
    }else{
      this.setData({
        is_def:0
      })
    }
  },
  //获取省份列表
  getProvince:function(){
    let that = this
    wx.request({
      url:'https://jbccs.com/index.php/Api/Public/get_area',
      success(res){
        let provinceList = [...res.data.datas.area_list]  //放到一个数组里面
        let provinceArr = res.data.datas.area_list.map((item)=>{return item.area_name})  //获取名称
        that.setData({
          multiArray:[provinceArr,[],[]], //更新三维数组  更新完为[['广东','北京'],[],[]]
          province_list:provinceList,  //省级原始数据
          province_name:provinceArr,  //省级全部名称
        })
        let defaultCode = that.data.province_list[0].area_id //使用第一项当作参数获取市级数据
        if(defaultCode){
          that.setData({
            currnetProvinceId:defaultCode  //保存当前省份id
          })
          that.getCity(defaultCode) //获取市区数据
        }
      }
    })
  },
  //根据省份id获取城市
  getCity:function(id){
    let that = this
    that.setData({
      currnetProvinceId: id
    })
    wx.request({
      url: `https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=${id}`,
      data:{},
      success(res){
        // console.log(res.data.data)
        let cityArr = res.data.datas.area_list.map((item)=>{return item.area_name}) //返回城市名称
        let cityList = [...res.data.datas.area_list]
        that.setData({
          multiArray:[that.data.province_name,cityArr,[]],  //更新后[['广东','北京'],['潮州'，'汕头','揭阳'],[]]
          city_list:cityList, //保持市级数据
          city_name:cityArr   //市级名称
        })
        let defaultCode = that.data.city_list[0].area_id //获取第一个市的区级数据
        if(defaultCode){
          that.setData({
            currentCityId:defaultCode //保存当下市id
          })
          that.getArea(defaultCode) //获取区域数据
        }
      }
    })
  },
  //获取区域
  getArea:function(id){
    let that = this
    that.setData({
      currentCityId:id    //保存当前选择市
    })
    wx.request({
      url: 'https://jbccs.com/index.php/Api/Public/get_area',
      data:{
        area_parent_id:id
      },
      success(res){
        // console.log(res.data.datas.area_list)
        let areaList = [...res.data.datas.area_list]
        let areaArr = res.data.datas.area_list.map((item)=>{return item.area_name}) //区域名
        that.setData({
          multiArray:[that.data.province_name,that.data.city_name,areaArr],
          area_list:areaList, //区列表
          area_name:areaArr   //区名字
        })
        
      }
    })
  },
  //picker确认选择地区
  bindRegionChange:function(e){
    // 因为在获取省中 北京只有一个选项，导致获取不了北京》北京》第一个
    if(e.detail.value[1]==null || e.detail.value[2]==null){ //如果只滚动了第一列则选取第一列的第一数据
      this.setData({
        multiIndex: e.detail.value,  //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].area_name, this.data.city_list[0].area_name, this.data.area_list[0].area_name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].area_id,
        selectCityId: this.data.city_list[0].area_id,
        selectAreaId: this.data.area_list[0].area_id
      })
    }else{
      this.setData({
        multiIndex: e.detail.value,  //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].area_name, this.data.city_list[e.detail.value[1]].area_name, this.data.area_list[e.detail.value[2]].area_name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].area_id,
        selectCityId: this.data.city_list[e.detail.value[1]].area_id,
        selectAreaId: this.data.area_list[e.detail.value[2]].area_id
      })
    }
    console.log(this.data.selectAreaId)
  },
  //滑动地区组件
  bindRegionColumnChange:function(e){
    // console.log(e.detail.column,e.detail.value)
    let that = this
    let column = e.detail.column  //当前改变的列
    let data = {
      multiIndex:JSON.parse(JSON.stringify(that.data.multiIndex)),
      multiArray:JSON.parse(JSON.stringify(that.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value  //第几列改变了就是对应multiIndex的第几个，更新他
    switch(column){
      case 0 :  //第一列改变，省级改变
        let currentProvinceId = that.data.province_list[e.detail.value].area_id
        if(currentProvinceId != that.data.currentProvinceId){ //判断当前id是不是更新了
          that.getCity(currentProvinceId)   //获取当前id下的市级数据
        }
        data.multiIndex[1] = 0    //将市默认选择第一个
        break
      case 1 :  //第二列改变，市级改变
        let currentCityId = that.data.city_list[e.detail.value].area_id
        if(currentCityId != that.data.currentCityId){
          that.getArea(currentCityId) //获取区域
        }
        data.multiIndex[2] = 0  //区域默认第一个
        break
    }
    that.setData(data)  //更新数据
  },

  bddhFn:function(){
    if(this.data.true_name==""){
      wx.showToast({
        icon:'none',
        title: '请填写收货人',
      })
    }else if(this.data.phone==0){
      wx.showToast({
        icon:'none',
        title: '请输入手机号',
      })
    }else if(this.data.selectAreaId==null){
      wx.showToast({
        icon:'none',
        title: '请选择地址',
      })
    }else if(this.data.address==""){
      wx.showToast({
        icon:'none',
        title: '请填写详细地址',
      })
    }else{
      this.postaddAddress(this.data.selectAreaId,this.data.true_name,this.data.address,this.data.phone,this.data.is_def)
    }
  },
  bindBoard:function(e){
    this.setData({
      true_name:e.detail.value
    })
  },
  bindPho:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  bindaddress:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  postaddAddress(area_id,true_name,address,phone,is_def){
    wx.showLoading({
      title: '添加中...',
    })
    requestApi1(app.globalData.base_url+"/addAddress",{
      area_id:area_id,
      true_name:true_name,
      address:address,
      phone:phone,
      is_def:is_def
    }).then(res=>{
      if(res.data.code==1){
        wx.showToast({
          icon:'success',
          title: '添加成功',
          duration:1500
        })
        setTimeout(function () {
          wx.navigateBack({
            url: '/pages/address/address',
          })
        }, 1500)
      }else{
        wx.showToast({
          icon:'error',
          title: '添加失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvince()
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