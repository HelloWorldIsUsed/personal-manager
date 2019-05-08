// miniprogram/pages/detail/detail.js
var time = require('./../../utils/formatDate')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      planData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options);
    wx.cloud.callFunction({
      name: 'queryDetail',
      data: {
        id: options.id
      },
      success(res){
        console.log(res);
        if(res.result.length){
          var planData = res.result[0];
          planData.date = time.formatTime(new Date(planData.date));
          _this.setData({
            planData: planData
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})