// miniprogram/pages/plan/plan.js
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
    editing: false,
    tabs: ["待办", "过期", "已办"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    planCount: 0,
    deadLineCount: 0,
    doneCount:0,
    planList: [],
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
        let planList = res.result.filter( item => {
          console.log(item);
          return !item.done && (new Date(item.date).getTime() > new Date().getTime())
        })
        planList.forEach( (item,index) => {
          item.date = time.formatTimeTwo(new Date(item.date),'Y-M-D h:m');
          item.index = index;
          item.checked = false;
        });
        let deadLineList = res.result.filter( item => {
          return !item.done && (new Date(item.date).getTime() < new Date().getTime());
        })
        deadLineList.forEach( (item,index) => {
          item.date = time.formatTimeTwo(new Date(item.date),'Y-M-D h:m')
          item.index = index;
          item.checked = false;
        });
        let doneList = res.result.filter( item => {
          return item.done
        })
        doneList.forEach( (item,index) => {
          item.date = time.formatTimeTwo(new Date(item.date),'Y-M-D h:m');
          item.index = index;
          item.checked = false;
        });
        _this.setData({
          planList: planList,
          deadLineList: deadLineList,
          doneList: doneList,
          planCount: planList.length,
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
    if(this.data.editing){
      return;
    }
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
  },

  onAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  onEdit: function () {
    this.setData({
      editing: true
    })
  },

  onRollback: function () {
    var checkboxItems = this.getListByTab();  
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
    }
    this.setListByTab(checkboxItems);
    this.setData({
      editing: false
    })
  },

  onDelete: function () {
    let _this = this;
    wx.showModal({
      title: '',
      content: '是否确定删除所选项',
      confirmText: "删除",
      cancelText: "取消",
      success: function (res) {
          if (res.confirm) {
            let tempList = _this.getListByTab();
            let checkedList = tempList.filter( item => {
              return item.checked
            })
            let idList = checkedList.map( item => {
              return item._id;
            })
            wx.cloud.callFunction({
              // 云函数名称
              name: 'deletePlan',
              data: {
                _ids: idList,
              },
              success(res) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000 ,
                  success: function(){
                    setTimeout(function(){
                      _this.onLoad();
                    },2000)
                    
                  }
                });       
              },
              fail: console.error
            })
          }else{
              console.log('用户点击辅助操作')
          }
      }
    });
  },

  onDone() {
    let _this = this;
    wx.showModal({
      title: '',
      content: '是否确定确定将已选项改为已完成',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
          if (res.confirm) {
            let tempList = _this.getListByTab();
            let checkedList = tempList.filter( item => {
              return item.checked
            })
            let idList = checkedList.map( item => {
              return item._id;
            })
            wx.cloud.callFunction({
              // 云函数名称
              name: 'donePlan',
              data: {
                _ids: idList,
              },
              success(res) {
                wx.showToast({
                  title: '已完成',
                  icon: 'success',
                  duration: 2000 ,
                  success: function(){
                    setTimeout(function(){
                      _this.onLoad();
                    },2000)                    
                  }
                });       
              },
              fail: console.error
            })

          }else{
              console.log('用户点击辅助操作')
          }
      }
    });
  },

  getListByTab() {
    if(this.data.activeIndex == 0){
      return this.data.planList;
    } else if (this.data.activeIndex == 1){
      return this.data.deadLineList;
    } else {
      return this.data.doneList;
    }
  },

  setListByTab(list) {
    if(this.data.activeIndex == 0){
      this.setData({
        planList: list
      });
    } else if (this.data.activeIndex == 1){
      this.setData({
        deadLineList: list
      });
    } else {
      this.setData({
        doneList: list
      });
    }
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    let checkboxItems = this.getListByTab();
    let values = e.detail.value;   
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].index == values[j]){
                checkboxItems[i].checked = true;
                break;
            }
        }
    }

    this.setListByTab(checkboxItems);
},
})