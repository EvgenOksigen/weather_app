import Koa from "koa";
import inithandlers from '../handlers'
import modules from './modules'

const app = new Koa()

inithandlers(app)

app.use(async function(ctx, next) {
  await next();
  ctx.set("Access-Control-Allow-Origin", "http://localhost:3000" && "http://localhost:3001"); // update to match the domain you will make the request from
  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.use(modules)

app.use(async (ctx) =>{
  ctx.body='<h1>Summ</h1>';
});

export default app;