// miniprogram/pnums/gameDetail/gameDetail.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isManage: false,
        themeArr: {
            name: "姓名",
            num: "号码",
            score: "得分",
            rebound: "篮板",
            assist: "助攻",
            mistakes: "失误",
        },
        itemArr: [],
        mvpPlayer: {
            name: '',
            score: '',
            rebound: '',
            assist: '',
            mistakes: ''
        },
        game: {
            home: '',
            guests: '',
            home_score: '',
            guests_score: ''
        }
    },

    onLoad: function (options) {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting["scope.userInfo"]) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: (res) => {
                            if(res.signature == "340f3235fea08b3aba8daa32b104989443ca7bd7" && res.userInfo.nickName == "卖画的小报家"){
                                this.setData({
                                    isManage: true
                                })
                            }
                        },
                    });
                }
            },
        });
    },

    onShow: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            mask: true
        })
        var _this = this;
        let pages = getCurrentPages();        
        let currentPage = pages[pages.length - 1];        
        const options = currentPage.options;

        wx.cloud.callFunction({
            name: "queryGameById",
            data: {
                id: options.id,
            },
            success(res) {
                if(res.result.length) {
                    _this.setData({
                        game: res.result[0]
                    });
                }
                
            }
        })
        wx.cloud.callFunction({
            name: "queryGameDetail",
            data: {
                id: options.id,
            },
            success(res) {
                console.log(res);
                if (res.result.length) {
                    let tempArr = [];
                    res.result.map(item => {
                        let tempArrObj = {};
                        tempArrObj.name = item.name;
                        tempArrObj.num = item.num;
                        tempArrObj.score = item.score;
                        tempArrObj.rebound = item.rebound;
                        tempArrObj.assist = item.assist;
                        tempArrObj.mistakes = item.mistakes;                        
                        if(item.isMvp) {
                            _this.setData({
                                mvpPlayer: item,
                            }); 
                        } else{
                            tempArr.push(tempArrObj);
                        }
                    })        
                    console.log(tempArr);
                    _this.setData({
                        itemArr: tempArr,
                    });
                    wx.hideToast();
                }
            },
        });
    },


    onAdd: function () {
        wx.navigateTo({
          url: '../addGameDetail/addGameDetail',
        })
    },
});
