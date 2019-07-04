const Router = require('koa-router')
const router = new Router()
const {ajax, getToken} = require('./util')
const cloud = require('../secret.js')

router.post('/getKnowledge', async (ctx) => {
  if (!ctx.session || !ctx.session.login) {
    ctx.body = {code: 500, message: '没权限'}
    return false
  }
  try {
    const data = ctx.request.body.data
    const token = await getToken()
    const pageNum = (data.pageNum || 1) - 1
    const pageSize = data.pageSize || 30
    const query = `db.collection('knowledge').skip(${pageNum * pageSize}).limit(${pageSize}).get()`
    const result = await ajax({
      url: `${cloud.url.query}?access_token=${token.access_token}`,
      method: 'post',
      body: JSON.stringify({
        env: cloud.env,
        query
      })
    })
    const count = await ajax({
      url: `${cloud.url.count}?access_token=${token.access_token}`,
      method: 'post',
      body: JSON.stringify({
        env: cloud.env,
        query: `db.collection('knowledge').count()`
      })
    })
    result.total = count.count
    ctx.body = result
  } catch(err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router