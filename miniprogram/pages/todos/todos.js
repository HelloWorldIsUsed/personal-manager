// miniprogram/pages/todos/todos.js
var time = require('./../../utils/formatDate')
var sliderWidth = 96;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './img/avatar.png',
    userInfo: {},
    mainHeight: '840rpx',
    logged: false,
    tabs: ["待办", "过期", "已办"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    todosCount: 0,
    deadLineCount: 0,
    doneCount:0,
    todosList: [],
    deadLineList: [],
    doneList: []    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    wx.getSystemInfo({
      success: function(res) {
          _this.setData({
              sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
          });
          
          console.log(res);
          wx.createSelectorQuery().select('.weui-tab__content').boundingClientRect(function (rect) {
            console.log(rect.top);
            let listHeight = res.windowHeight - rect.top + 'px';
            _this.setData({
              mainHeight: listHeight
            })
          }).exec()
          
      }
    });

    wx.cloud.callFunction({
      // 云函数名称
      name: 'queryList',
      success(res) {
        //res.result.forEach( item => item.date = time.formatTime(new Date(item.date)));
        console.log(res);
        let todosList = res.result.filter( item => {
          console.log(item);
          return !item.done && (new Date(item.date).getTime() > new Date().getTime())
        })
        todosList.forEach( item => item.date = time.formatTime(new Date(item.date)));
        let deadLineList = res.result.filter( item => {
          return !item.done && (new Date(item.date).getTime() < new Date().getTime());
        })
        deadLineList.forEach( item => item.date = time.formatTime(new Date(item.date)));
        let doneList = res.result.filter( item => {
          return item.done
        })
        doneList.forEach( item => item.date = time.formatTime(new Date(item.date)));
        _this.setData({
          todosList: todosList,
          deadLineList: deadLineList,
          doneList: doneList,
          todosCount: todosList.length,
          deadLineCount: deadLineList.length,
          doneCount: doneList.length
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
  },

  onAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  }
})