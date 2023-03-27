const router = require('koa-router')()
const { messageAdd, messageDel, messageUpdate, messageFindOne, messageFindAll } = require('../controllers/messages')

router.prefix('/message')

router.post('/add', messageAdd)

router.post('/delete', messageDel)

router.post('/update', messageUpdate)

router.get('/find', messageFindOne)

router.get('/find_all', messageFindAll)

module.exports = router