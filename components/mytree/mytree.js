Component({
  properties: {
    model: Object,
  },

  data: {
    open: false,
    isBranch: true,
  },

  methods: {
    toggle: function(e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },
    
    tapItem: function(e) {
      var itemid = e.currentTarget.dataset.itemid;
      var value = e.currentTarget.dataset.value;
      this.triggerEvent('tapitem', { value: value,itemid: itemid }, { bubbles: true, composed: true });
    }
  },

  // ready: function(e) {
  //   this.setData({
  //     isBranch: Boolean(this.data.model.node && this.data.model.node.length),
  //   });
  // }
})