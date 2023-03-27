const router = require('koa-router')()
const { newsAdd, newsDel, newsUpdate, newsFindOne, newsFindAll } = require('../controllers/news')

router.prefix('/news')

router.post('/add', newsAdd)

router.post('/delete', newsDel)

router.post('/update', newsUpdate)

router.get('/find', newsFindOne)

router.get('/find_all', newsFindAll)

module.exports = router