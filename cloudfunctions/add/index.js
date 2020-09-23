// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (e, context) => {
  const {OPENID, APPID} = cloud.getWXContext()
  return db.collection('game').add({    
    // data 字段表示需新增的 JSON 数据
    data: {
      home: e.home,
      home_score: e.home_score,
      guests: e.guests,
      guests_score: e.guests_score,
      place: e.place,
      time: new Date(e.time)
    }
  })
  .then(res => {
    console.log(res)
  })
}