const router = require('koa-router')()
const { exampleAdd, exampleDel, exampleUpdate, exampleFindOne, exampleFindAll } = require('../controllers/examples')

router.prefix('/example')

router.post('/add', exampleAdd)

router.post('/delete', exampleDel)

router.post('/update', exampleUpdate)

router.get('/find', exampleFindOne)

router.get('/find_all', exampleFindAll)

module.exports = router