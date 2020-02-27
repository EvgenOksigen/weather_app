import db from '../../../helpers/db'
import {JWT_SECRET} from '../../../config'
import jwt from 'jsonwebtoken'

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
    const {pass, login} = ctx.request.body
    if( !pass || !login){
      ctx.throw(400, {message: 'Invalid data'})
    }
    const client = await db.pool.connect()

    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }

    try{
    const {rows} = await client.query('SELECT * from test_store where login = ($1)', [login])

    const user = [...rows]
      console.log(user);
      
    if(!user || user.length===0){
      ctx.throw(400, {message: 'User not found'})
    }

    const token = await jwt.sign({login}, JWT_SECRET)

    ctx.body={data:token}
    }catch (e){
      throw e
    }
    finally{
      client.release()
    }
  },
  
  async test(ctx){
    const client = await db.pool.connect()
    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }
    try{
      const {pass, login} = ctx.request.body
      const {rows} = await client.query('select * from test_store')
      rows.map((user) =>{
        if(user.login === login){
          throw Error('Такой пользователь уже есть');
        } else{
          const qweryStr='INSERT INTO test_store(login,password) values($1,$2)';
          client.query(qweryStr,[login, pass])
          return
        }
      })
    }
    finally{
      client.release()
    }
  }
}