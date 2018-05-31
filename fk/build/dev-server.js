var appData=require('../src/mock/data.json')

var users=appData.users

var apiRouter=express.Router()

apiRouter.get('/users',function (req,res) {
  res.json({
    errno:0,
    users:users
  })
})
app.use('/api',apiRouter)