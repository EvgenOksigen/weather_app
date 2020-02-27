import {PSQL_URI} from '../config'
import psqlConnector from './psql-connector'
import server from '../server'

const connectorsInit = async () => {
  try{
    await psqlConnector(PSQL_URI);
  } catch(e){
    server.close()
    console.log(e);
  }
}

export {
  psqlConnector
}
export default connectorsInit;