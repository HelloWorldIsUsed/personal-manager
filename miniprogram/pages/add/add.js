// miniprogram/pages/add/add.js
var time = require('./../../utils/formatDate')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    home: "",
    home_score: "",
    guests: "",
    guests_score: "",
    place: "",
    date: time.formatTimeTwo(new Date(),'Y-M-D'),
    time: time.formatTimeTwo(new Date(),'h:m:s')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
  changeHome: function (e){
    this.setData({
      home: e.detail.value
    })
  },
  changeHomeScore: function (e){
    this.setData({
      home_score: e.detail.value
    })
  },
  changeGuests: function (e){
    this.setData({
      guests: e.detail.value
    })
  },
  changeHomeGuests: function (e){
    this.setData({
      guests_score: e.detail.value
    })
  },
  changePlace: function (e){
    this.setData({
      place: e.detail.value
    })
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
  bindAddPlan: function (e) {
    let iosDate = time.formatTimeTwo(new Date(this.data.date),'Y/M/D');
    let timestamp = new Date(iosDate + ' ' + this.data.time).getTime();
    console.log(timestamp);
    if(this.data.home == ""){
      wx.showModal({
        content: '请填写主队名称',
        showCancel: false
      });
      return;
    }
    if(this.data.home_score == ""){
      wx.showModal({
        content: '请填写主队得分',
        showCancel: false
      });
      return;
    }   
    if(this.data.guests == ""){
      wx.showModal({
        content: '请填写主队名称',
        showCancel: false
      });
      return;
    }
    if(this.data.guests_score == ""){
      wx.showModal({
        content: '请填写客队得分',
        showCancel: false
      });
      return;
    } 
    if(this.data.place == ""){
      wx.showModal({
        content: '请填写客比赛地址',
        showCancel: false
      });
      return;
    } 
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      data: {
        home: this.data.home,
        home_score: this.data.home_score,
        guests: this.data.guests,
        guests_score: this.data.guests_score,
        place: this.data.place,
        time: timestamp
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 2000 ,
          success: function(){
            setTimeout(function(){
              wx.navigateBack();
            },2000)
            
          }
        });        
      },
      fail: console.error
    })
  }
})