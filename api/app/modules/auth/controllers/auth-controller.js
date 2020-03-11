import db from '../../../helpers/db'
import jwtService from '../../../services/jwt-service'

export default {
  async signUp(ctx){
    const client = await db.pool.connect()
    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }
    try{
      const {pass, login} = ctx.request.body
      const {rows} = await client.query('select * from test_store')
      const sameUser = rows.find(user => user.login === login)
      if(sameUser){
        ctx.throw(400, {message: 'Такой пользователь уже есть'})
        throw Error('Такой пользователь уже есть');
      }else{
        const qweryStr='INSERT INTO test_store(login,password) values($1,$2)';
        await client.query(qweryStr,[login, pass])
        console.log('NEW USER HAS BEN CREATED')
        const {rows} = await client.query('SELECT * from test_store where login = ($1)', [login])

        return ctx.body = {data: rows}
      }
    }
    finally{
      client.release()
    }
  },
  async signIn(ctx){
    const { email} = ctx.request.body
    if(!email){
      ctx.throw(400, {message: 'Invalid data'})
    }
    const client = await db.pool.connect()

    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }

    try{
    const {rows} = await client.query('SELECT * from users where email = ($1)', [email])

    const user = [...rows]
      
    if(!user || user.length===0){
      ctx.throw(400, {message: 'User not found'})
    }

    const token = await jwtService.genToken({email})
    
    
    ctx.body={
      data:{
        token:token
      }
    }

    }catch (e){
      throw e
    }
    finally{
      client.release()
    }
  },
  
  async me(ctx){
    const { authorization } = ctx.headers;

  if(authorization){
    try{
      const client = await db.pool.connect()
      if(!client){
        ctx.throw(401, { message: 'Отсутствует клиент подключения к бд' })
      }
      const { login } = jwtService.verify(authorization);

      const {rows} = await client.query('select * from users')

      const user = rows.find(user => user.login === login)

      ctx.body = user
      client.release()
    } catch(e) {
      ctx.throw(401, {message: 'Unauthorized. Invalid Token'})
    }

   }
  }
}