// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (e, context) => {
  const {OPENID, APPID} = cloud.getWXContext()
  return db.collection('gameDetail').add({    
    // data 字段表示需新增的 JSON 数据
    /*data: [
      {"assist":3,"gameId":"60173c665f3f7a40000de97a07d84aac","isMvp":false,"mistakes":0,"name":"谭林","num":3,"rebound":7,"score":22},
      {"assist":1,"gameId":"60173c665f3f7a40000de97a07d84aac","isMvp":false,"mistakes":0,"name":"范茂磊","num":3,"rebound":2,"score":5}]*/
    data: [e]
    })
  .then(res => {
    console.log(res)
  })
}