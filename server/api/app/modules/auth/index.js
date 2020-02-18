import Router from 'koa-router'
import authCtrl from './controllers/auth-ctrl'
import checkUser from '../../../handlers/checkUser'

const router = new Router({prefix:'/auth'});

router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)
router.post('/private', checkUser(), (ctx)=>{
  ctx.body = ctx.user
})
router.post('/login', authCtrl.logIn)
router.get('/users', (ctx)=>{
  ctx.body = JSON.stringify({user: 'User'})
})
// router.get('/users', async(ctx)=>{
//   console.log(ctx.URL)  
// })

export default router.routes();