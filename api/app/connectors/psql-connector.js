import {Client} from 'pg'
import connectionString from 'pg-connection-string'
var parse = connectionString.parse

export default (psqlUri)=>{
  if(!psqlUri){
    throw Error ('PostgreSQL uri is underfined')
  }

  return new Promise((res, rej)=>{
    const client = new Client(parse(psqlUri))
      client.connect()
      .then(db =>{
        res(db)
        console.log('PostgreSQL connected');
      })
      .catch(err=>{
        rej(err)
      });
  });
}