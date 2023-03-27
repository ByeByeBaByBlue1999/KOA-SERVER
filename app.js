const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const KoaBody = require("koa-body");
const static = require('koa-static')
const mount  = require('koa-mount')
const Router = require('koa-router')

const path = require('path')
 
const staticPath = "./public"
const router = new Router()

router.get('/public/', (ctx,next) => {
    ctx.body = "Ta-Da!"
    ctx.status = 200
    return;
})

app.use(mount('/public', static(staticPath)))
app.use(router.middleware())

/* 图片上传/储存模块 ################################################################## */
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const multer = require('@koa/multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(staticPath, 'images')); // 储存路径
    },
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split("."); // 获取文件后缀
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]); // 生成文件
    }
});
const upload = multer({ storage: storage });

router.post(
    '/upload-single',
    upload.single('file'),
    ctx => {
        console.log('ctx.request.file', ctx.request.file);
        console.log('ctx.file', ctx.file);
        console.log('ctx.request.body', ctx.request.body);
        ctx.body = {
            code: 200, 
            data: ctx.file.path
        };
    }
);

router.post('/delete-single', KoaBody(), ctx => {
    Promise.all(ctx.request.body.image_path.map(function(e){
        return new Promise(function(resolve, reject){
            console.log(e)
            unlinkAsync(e)
            resolve()
        })
    }))
    .then(() => {
        ctx.body = {code: 200}
    })
})

/* ############################################################################## */

const mongoConnect = require('./db')
mongoConnect()

// error handler
onerror(app)

app.use(KoaBody({ multipart: true }));
// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)
app.use(json())
app.use(logger())

app.use(
    // @ts-ignore
    views(__dirname + '/views', {
        extension: 'ejs'
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    // @ts-ignore
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const index = require('./routes/index')
const users = require('./routes/users')
const products = require('./routes/products')
const sub_products = require('./routes/sub_products')
const news = require('./routes/news')
const examples = require('./routes/examples')
const messages = require('./routes/messages')
const images = require('./routes/images')

// routes
app.use(router.routes());
app.use(router.allowedMethods());
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(products.routes(), products.allowedMethods())
app.use(sub_products.routes(), sub_products.allowedMethods())
app.use(news.routes(), news.allowedMethods())
app.use(examples.routes(), examples.allowedMethods())
app.use(messages.routes(), messages.allowedMethods())
app.use(images.routes(), images.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
