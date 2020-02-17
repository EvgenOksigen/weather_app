import jwtSevice from '../app/services/jwt-service/jwt-service'
// import { user } from '../../../client/src/state/ducks';
// import Users // таблица пользователей

export default ()=>async (ctx,next) => {
const {authorization} = ctx.headers;

if(authorization){
  try{
    const {email} = await jwtSevice.verify(authorization);
    ctx.user = await {email: ctx.request.body.email} //  Users.findOne({email}); => поиск юзера по @mail-u
  } catch(e){
    ctx.throw(401, {message: 'Unauthorized. Invalid token'})
  }
}
 await next();
}