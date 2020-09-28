// miniprogram/pages/addGameDetail/addGameDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*
    indexArr: [0],
    accountIndex: "",*/
    gameData: {
      score: 0,
      rebound: 0,
      mistakes: 0,
      assist: 0,
      gameId: '',
      num:0,
      name:'',
      isMvp: false
    },
    teamList: [],
    playerIndex: '',
    boolArr: [false, true],
    mvpIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: "加载中",
      icon: "loading",
      mask: true,
    });
    this.setData({
      'gameData.gameId': options.gameId
    })
    var _this = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: "queryTeam",
      success(res) {
        console.log(res);
        _this.setData({
          teamList: res.result,
        });
        wx.hideToast();
      },
      fail: console.error,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  bindPlayerChange: function (e) {
    this.setData({
      playerIndex: e.detail.value
    })
    this.setData({
      'gameData.num': this.data.teamList[e.detail.value].num,
      'gameData.name': this.data.teamList[e.detail.value].name
    })
  },

  changeScore: function (e){
    this.setData({
      'gameData.score': Number(e.detail.value)
    })
  },
  changeRebound: function (e){
    this.setData({
      'gameData.rebound': Number(e.detail.value)
    })
  },
  changeMistakes: function (e){
    this.setData({
      'gameData.mistakes': Number(e.detail.value)
    })
  },
  changeAssist: function (e){
    this.setData({
      'gameData.assist': Number(e.detail.value)
    })
  },
  changeMvp: function (e){
    this.setData({
      mvpIndex: e.detail.value
    })
    this.setData({
      'gameData.isMvp': this.data.boolArr[e.detail.value],
    })
  },
  /*
  onAddPeople: function() {
    let dataIntro = {};
    let keyIntro = 'indexArr['+this.data.indexArr.length+']';
    dataIntro[keyIntro] = 0;
    this.setData(dataIntro);
  },

  bindAccountChange: function (e) {
    console.log("picker account 发生选择改变，携带值为", e.detail.value);
    
    let dataIntro = {};
    let keyIntro = 'indexArr['+e.currentTarget.dataset.index+']';
    dataIntro[keyIntro] = e.detail.value;
    this.setData(dataIntro);
  },
  */
 bindAdd: function (e) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addGameDetail',
      data: this.data.gameData,
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
});
