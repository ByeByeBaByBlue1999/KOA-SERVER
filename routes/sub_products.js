const router = require('koa-router')()
const { sub_productAdd, sub_productDel, sub_productUpdate, sub_productFindOne, sub_productFindAll } = require('../controllers/sub_products')

router.prefix('/sub_products')

router.post('/add', sub_productAdd)

router.post('/delete', sub_productDel)

router.post('/update', sub_productUpdate)

router.get('/find', sub_productFindOne)

router.get('/find_all', sub_productFindAll)

module.exports = router