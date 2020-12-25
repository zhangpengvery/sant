// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    qiehuanFn:function(e){
      console.log(e);
      
      this.setData({
        active:e.target.dataset.id
      })
    }
  }
})
