import pick from 'lodash/pick'
import db from '../../../helpers/db'

export default {
  async signUp(ctx){
    const client = await db.pool.connect()
    const {pass, login} = ctx.request.body
    const qweryStr='INSERT INTO test_store(login,password) values($1,$2)';

    await client.query(qweryStr,[login, pass])

    const {rows} = await client.query('select * from test_store')

    ctx.body = rows
  },
  
  async test(ctx){
    // ctx.body = {data: {pass: pass, login: login}}
    ctx.body = ctx.request.body
    // const client = await db.pool.connect()
    // try{
    //   await client.query('insert into test_store (login) values($1)',['abracadabra'])

    //   const {rows} = await client.query('select * from test_store')

    //   ctx.body = rows
    // }catch(e){
    //   throw e
    // }finally{
    //   client.release()
    // }
  }
}