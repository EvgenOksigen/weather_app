import Koa from "koa";
import inithandlers from '../handlers'
import modules from './modules'

const app = new Koa()

inithandlers(app)

app.use(modules)

app.use(async (ctx) =>{
  ctx.body='<h1>Summ</h1>';
});

export default app;