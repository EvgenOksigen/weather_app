import config from 'config'
import dotenv from 'dotenv'
import envs from './constants/envs'
import env from './utils/env'

dotenv.config()

if(!envs[env]){
  throw Error(`Unknown environment ${env}`);
}

const PORT = process.env.PORT || config.get('port');

const PSQL_URI = process.env.PSQL_URI || config.get('psql.uri')


export {
  PORT,
  PSQL_URI
} 