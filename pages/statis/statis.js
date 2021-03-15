// pages/statis/statis.js
const app = getApp()
let {
  requestApi, requestApi1
} = require("../../utils/request")
Page({

  data: {
      value: '2018-11-11',
      week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      lastMonth: 'lastMonth',
      nextMonth:'nextMonth',
      selectVal: '',
      getwork_on:[],
      getwork_off:[],
  },

  //组件监听事件
  select(e) {
    var that=this
    console.log(e.detail)
    this.setData({
        selectVal:e.detail
    },function(){
      that.getCheckList(e.detail)
    })
  },
  //根据日期获取考勤记录
  async getCheckList(r_date) {
    let result = await requestApi(app.globalData.post_url + "/index.php/Api/Check/getCheckList",{
      r_date:r_date
    })
    this.setData({
      getwork_on: result.data.datas.work_on,
      getwork_off:result.data.datas.work_off
    })
    console.log(result);
  },
  toggleType(){
      this.selectComponent('#Calendar').toggleType();
  }


})