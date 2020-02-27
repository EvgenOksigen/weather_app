import Router from 'koa-router';
import authCtrl from './controllers/auth-controller';

const router = new Router({prefix: '/auth'})

router
  .post('/signup', authCtrl.signUp)
  .post('/test', authCtrl.test)

export default router.routes();