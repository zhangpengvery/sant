// pages/revie/revie.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    scrollH: 0,
    province_list: null,
    province_name: null,
    city_list: null,
    city_name: null,
    area_list: null,
    area_name: null,
    addressCity: null,
    multiArray: [],  // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标,
    selectProvinceId: null,
    selectCityId: null,
    selectAreaId: null,
    showJiahao:false,
    showChahao:false,
    getLists:[],
    getForLists:[],
    markers:[],
    markers2:[],
    showMaxmaks:false,
    triggered:false
  },
  changeSwiper: function (e) {
    var that=this
    if(e.currentTarget.dataset.current==0){
      this.setData({
        getLists:[],
        currentIndex: e.currentTarget.dataset.current,
      },function(){
        that.getLists()
      })
    }else if(e.currentTarget.dataset.current==1){
      this.setData({
        getForLists:[],
        currentIndex: e.currentTarget.dataset.current,
      },function(){
        that.getForLists()
      })
    }
  },
  //获取省份列表
  getProvince: function () {
    let that = this
    wx.request({
      url: 'https://jbccs.com/index.php/Api/Public/get_area',
      success(res) {
        let provinceList = [...res.data.datas.area_list]  //放到一个数组里面
        let provinceArr = res.data.datas.area_list.map((item) => { return item.area_name })  //获取名称
        that.setData({
          multiArray: [provinceArr, [], []], //更新三维数组  更新完为[['广东','北京'],[],[]]
          province_list: provinceList,  //省级原始数据
          province_name: provinceArr,  //省级全部名称
        })
        let defaultCode = that.data.province_list[0].area_id //使用第一项当作参数获取市级数据
        if (defaultCode) {
          that.setData({
            currnetProvinceId: defaultCode  //保存当前省份id
          })
          that.getCity(defaultCode) //获取市区数据
        }
      }
    })
  },
  //根据省份id获取城市
  getCity: function (id) {
    let that = this
    that.setData({
      currnetProvinceId: id
    })
    wx.request({
      url: `https://jbccs.com/index.php/Api/Public/get_area?area_parent_id=${id}`,
      data: {},
      success(res) {
        // console.log(res.data.data)
        let cityArr = res.data.datas.area_list.map((item) => { return item.area_name }) //返回城市名称
        let cityList = [...res.data.datas.area_list]
        that.setData({
          multiArray: [that.data.province_name, cityArr, []],  //更新后[['广东','北京'],['潮州'，'汕头','揭阳'],[]]
          city_list: cityList, //保持市级数据
          city_name: cityArr   //市级名称
        })
        let defaultCode = that.data.city_list[0].area_id //获取第一个市的区级数据
        if (defaultCode) {
          that.setData({
            currentCityId: defaultCode //保存当下市id
          })
          that.getArea(defaultCode) //获取区域数据
        }
      }
    })
  },
  //获取区域
  getArea: function (id) {
    let that = this
    that.setData({
      currentCityId: id    //保存当前选择市
    })
    wx.request({
      url: 'https://jbccs.com/index.php/Api/Public/get_area',
      data: {
        area_parent_id: id
      },
      success(res) {
        // console.log(res.data.datas.area_list)
        let areaList = [...res.data.datas.area_list]
        let areaArr = res.data.datas.area_list.map((item) => { return item.area_name }) //区域名
        that.setData({
          multiArray: [that.data.province_name, that.data.city_name, areaArr],
          area_list: areaList, //区列表
          area_name: areaArr   //区名字
        })

      }
    })
  },
  //picker确认选择地区
  changeRegin: function (e) {
    // 因为在获取省中 北京只有一个选项，导致获取不了北京》北京》第一个
    if (e.detail.value[1] == null || e.detail.value[2] == null) { //如果只滚动了第一列则选取第一列的第一数据
      this.setData({
        multiIndex: e.detail.value,  //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].area_name, this.data.city_list[0].area_name, this.data.area_list[0].area_name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].area_id,
        selectCityId: this.data.city_list[0].area_id,
        selectAreaId: this.data.area_list[0].area_id
      })
    } else {
      this.setData({
        multiIndex: e.detail.value,  //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].area_name, this.data.city_list[e.detail.value[1]].area_name, this.data.area_list[e.detail.value[2]].area_name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].area_id,
        selectCityId: this.data.city_list[e.detail.value[1]].area_id,
        selectAreaId: this.data.area_list[e.detail.value[2]].area_id,
        getLists:[],
      })
    }
    console.log(this.data.selectCityId)
    if(this.data.currentIndex==0){
      this.getLists(this.data.selectCityId)
    }else if(this.data.currentIndex==1){
      this.getForLists(this.data.selectCityId)
    }
  },
  //滑动地区组件
  bindRegionColumnChange: function (e) {
    // console.log(e.detail.column,e.detail.value)
    let that = this
    let column = e.detail.column  //当前改变的列
    let data = {
      multiIndex: JSON.parse(JSON.stringify(that.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(that.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value  //第几列改变了就是对应multiIndex的第几个，更新他
    switch (column) {
      case 0:  //第一列改变，省级改变
        let currentProvinceId = that.data.province_list[e.detail.value].area_id
        if (currentProvinceId != that.data.currentProvinceId) { //判断当前id是不是更新了
          that.getCity(currentProvinceId)   //获取当前id下的市级数据
        }
        data.multiIndex[1] = 0    //将市默认选择第一个
        break
      case 1:  //第二列改变，市级改变
        let currentCityId = that.data.city_list[e.detail.value].area_id
        if (currentCityId != that.data.currentCityId) {
          that.getArea(currentCityId) //获取区域
        }
        data.multiIndex[2] = 0  //区域默认第一个
        break
    }
    that.setData(data)  //更新数据
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
      showChahao:false,
      showJiahao:false,
      showMaxmaks:false
    })
  },
  maxmaskFn:function(){
    this.setData({
      showJiahao:false,
      showMaxmaks:false,
      showChahao:false
    })
  },
  //我要审车
  async getLists(city_id) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Shen/getLists",{
      city_id:city_id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getLists: result.data.datas.list,
      triggered:false
    }, function () {
      that.setData({
        markers: that.getLingyuanMarkers()
      })
    })
    console.log(result);
  },
  getLingyuanMarkers() {
    let markers = [];
      for (let item of this.data.getLists) {
        let marker = this.createMarker(item);
        markers.push(marker)
      }
    return markers;
  },
  getLingyuanMarkers2() {
    let markers2 = [];
      for (let item of this.data.getForLists) {
        let marker = this.createMarker2(item);
        markers2.push(marker)
      }
    return markers2;
  },
  createMarker(point) {
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time=YY+MM+DD+"  "+hh+mm+ss
    let marker = {
      image_url: point.image_url,
      id: point.id,
      user_name: point.user_name,
      time: time,
      cityname: point.cityname,
      area_name:point.area_name
    };
    return marker;
  },
  createMarker2(point) {
    var xing =point.user_name[0]
    for(var i=1;i<point.user_name.length;i++){
      xing+='*'
    }
    var date = new Date(Number(point.create_time)*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time=YY+MM+DD+"  "+hh+mm+ss
    let marker = {
      image_url: point.image_url,
      id: point.id,
      user_name: xing,
      time: time,
      cityname: point.cityname,
      area_name:point.area_name
    };
    return marker;
  },
  //我能审车
  async getForLists(city_id) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Shen/getForLists",{
      city_id:city_id
    })
    if(result.statusCode==200){
      wx.hideLoading()
    }
    this.setData({
      getForLists: result.data.datas.list,
      triggered:false
    }, function () {
      that.setData({
        markers2: that.getLingyuanMarkers2()
      })
    })
    console.log(result);
  },
  refresherFn:function(){
    var that=this
    this.setData({
      page:1,
    },function(){
      if(that.data.currentIndex==0){
        that.getLists()
      }else if(that.data.currentIndex==1){
        that.getForLists()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLists()
    this.getProvince()
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let ScrH = (clientHeight * ratio) - 100
        this.setData({
          scrollH: ScrH
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