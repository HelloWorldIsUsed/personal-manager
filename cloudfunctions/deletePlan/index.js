// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const command = db.command

// 云函数入口函数
exports.main = async (e, context) => {
  const fileIDs = e._ids;
  return db.collection('plan').where({
    _id:command.in(e._ids)
  }).remove()
  .then(console.log);
}