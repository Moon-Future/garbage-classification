// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let condition = {}
  condition.verify = _.neq(0)
  let hotSearch = await db.collection('hot-search').where(condition).orderBy('count', 'desc').get()
  hotSearch = hotSearch.data
  if (hotSearch.length > 10) {
    hotSearch.splice(10)
  }

  return {
    hotSearch
  }
}