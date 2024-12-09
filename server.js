const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
// server.get('/products', (req, res) => {
//     // console.log("--->", res, "<---")
//     res.jsonp({
//         body: res.locals.data
//     })
// })
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})
router.render = (req, res) => {
    // 確認請求是否使用了分頁參數
    const totalCount = res.locals.data.length; // 這是當前返回數據的數量

    // // 如果分頁啟用 (即包含 _page 和 _limit)
    // if (req.query._page || req.query._limit) {
    //     // 設置 X-Total-Count
    //     const db = router.db; // 獲取完整的 db 資料
    //     const resource = req.path.split('/').filter(Boolean).pop(); // 獲取資源名稱
    //     const fullData = db.get(resource).value(); // 獲取該資源的完整數據
    //     res.setHeader('X-Total-Count', fullData.length);
    // }

    // 自訂返回格式 (可選)
    res.jsonp({
        data: res.locals.data, // 分頁後的數據
        total: res.getHeader('X-Total-Count') || totalCount, // 總數
        page: req.query._page ? parseInt(req.query._page, 10) : 1, // 當前頁
        limit: req.query._limit ? parseInt(req.query._limit, 10) : totalCount, // 每頁數量
    });
}
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server