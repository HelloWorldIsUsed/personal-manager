// miniprogram/pages/add/add.js
var time = require('./../../utils/formatDate')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    date: time.formatTimeTwo(new Date(),'Y-M-D'),
    time: time.formatTimeTwo(new Date(),'h:m:s'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
        time: e.detail.value
    })
  },
  changeTitle: function (e){
    this.setData({
      title: e.detail.value
    })
  },
  changeContent: function (e){
    this.setData({
      content: e.detail.value
    })
  },
  bindAddPlan: function (e) {
    let iosDate = time.formatTimeTwo(new Date(this.data.date),'Y/M/D');
    let timestamp = new Date(iosDate + ' ' + this.data.time).getTime();
    console.log(timestamp);
    if(this.data.title == ""){
      wx.showModal({
        content: '请填写主要标题',
        showCancel: false
      });
      return;
    }
    if(this.data.content == ""){
      wx.showModal({
        content: '请填写主要内容',
        showCancel: false
      });
      return;
    }    
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      data: {
        content: this.data.content,
        title: this.data.title,
        date: timestamp
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000 ,
          success: function(){
            setTimeout(function(){
              wx.navigateTo({
                url: '../plan/plan',
              })
            },2000)
            
          }
        });        
      },
      fail: console.error
    })
  }
})