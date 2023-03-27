const router = require('koa-router')()
const { userAdd, userDel, userUpdate, userFindOne, userLogin } = require('../controllers/users')
const multer = require('@koa/multer');
const upload = multer()

router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.post('/add', userAdd)

router.post('/delete', userDel)

router.post('/update', userUpdate)

router.get('/find', userFindOne)

router.post('/login', userLogin)

module.exports = router