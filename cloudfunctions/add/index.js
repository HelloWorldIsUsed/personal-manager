// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (e, context) => {
  return db.collection('todos').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      content: e.content,
      date: new Date(e.date),
      title: e.title,
    }
  })
  .then(res => {
    console.log(res)
  })
}