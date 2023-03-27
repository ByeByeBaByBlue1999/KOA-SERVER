const router = require('koa-router')()
const { productAdd, productDel, productUpdate, productFindOne, productFindAll } = require('../controllers/products')

router.prefix('/products')

router.post('/add', productAdd)

router.post('/delete', productDel)

router.post('/update', productUpdate)

router.get('/find', productFindOne)

router.get('/find_all', productFindAll)

module.exports = router