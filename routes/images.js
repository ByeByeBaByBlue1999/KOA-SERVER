const router = require('koa-router')()
const { imageUpdate, imageFindAll } = require('../controllers/images')

router.prefix('/image')

router.post('/update', imageUpdate)

router.get('/find_all', imageFindAll)

module.exports = router