const Router = require('koa-router')
const garbage = require('./api/garbage')
const cloud = require('./api/cloud')
const search = require('./api/search')
const knowledge = require('./api/knowledge')
const user = require('./api/user')
const router = new Router({
  prefix: '/api'
})

router.use('/garbage', garbage.routes())
router.use('/cloud', cloud.routes())
router.use('/search', search.routes())
router.use('/knowledge', knowledge.routes())
router.use('/user', user.routes())

module.exports = router