import {PSQL_URI} from '../config'
import psqlConnector from './psql-connector'

function connectorsInit(){
  psqlConnector(PSQL_URI);
}

export {
  psqlConnector
}
export default connectorsInit;