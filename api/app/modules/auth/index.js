import Router from 'koa-router';
import authCtrl from './controllers/auth-controller';
import checkUser from '../../handlers/checkUser'

const router = new Router({prefix: '/auth'})

router
  .post('/signup', authCtrl.signUp)
  .post('/signin', authCtrl.signIn)
  .post('/private', checkUser(), ctx => {ctx.body = ctx.user})
  .post('/test', authCtrl.test)

export default router.routes();