// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let condition = event.condition || {}
  const countResult = await db.collection('garbage').where(condition).count()
  const total = countResult.total
  const pageNum = event.pageNum || 0
  const pageSize = event.pageSize || 10
  const garbageData = await db.collection('garbage')
    .where(condition)
    .skip(pageNum * pageSize)
    .limit(pageSize)
    .get()

  return {
    garbageData: garbageData.data,
    total
  }
}