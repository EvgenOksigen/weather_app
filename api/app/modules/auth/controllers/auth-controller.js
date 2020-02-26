import pick from 'lodash/pick'


export default {
  async signUp(ctx){
    // const {id} = await 
    // cunst user = await 
    // user = {username: 'marcus', password: 'zxcvbn'}
    // ctx.body = {data : user}
    ctx.body = ctx
    console.log(ctx.request.body)
  }
}