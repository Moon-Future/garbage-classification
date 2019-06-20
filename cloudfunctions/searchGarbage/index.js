// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const searchContent = await db.collection('garbage').where(_.or([
    {
      name: {
        $regex: '.*' + event.keyWord,
        $options: 'i'
      }
    },
    {
      similar: {
        $regex: '.*' + event.keyWord,
        $options: 'i'
      }
    },
    {
      feature: {
        $regex: '.*' + event.keyWord,
        $options: 'i'
      }
    }
  ]).and({
    check: _.neq(0)
  })).get()

  return {
    searchContent: searchContent.data
  }
}