import db from '../../../helpers/db'

export default {
  async signUp(ctx){
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
        } 
          const qweryStr='INSERT INTO test_store(login,password) values($1,$2)';
          client.query(qweryStr,[login, pass])
          console.log('NEW USER HAS BEN CREATED')
          return ctx.body = 'OK'
      
      })
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