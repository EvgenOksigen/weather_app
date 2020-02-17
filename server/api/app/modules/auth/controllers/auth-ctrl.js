import pick from 'lodash/pick'
import jwtService from '../../../services/jwt-service/jwt-service'
// import {User} from '../../users'

const users=[]// брaть всх юзеров из таблицы PostgreSQL

export default {
  async signUp(ctx){
    //создать запись в таблице юзеров

    // const {_id } = await User.create(pick(ctx.request.body, User.createFields));
        
    // const user = await User.findOne({_id});  

    const users_new = await users.push({pas: ctx.request.body.password})
    ctx.body={ data: { email: ctx.request.body.email, users: users }}
  },

  async signIn(ctx){
    const {email, password} = ctx.request.body;

    if (!email || !password ){
      ctx.throw(400, {message : 'Invalid data'})
    }
    const user = await {email: ctx.request.body.email} //user.findOne({email}) 
 
    if(!user){
      ctx.throw(400, {message: 'User not found'});
    }

    // if(!user.comparePasswords(password)){
    //   ctx.throw(400, {message: 'Invalid password'})
    // }

    const token = await jwtService.genToken({email});  // jwt.sign({email}, JWT_SECRET); ====> mail - object to hasing, JWT_SECRET - strig that help to hashing mail

    ctx.body = {data: token}  // JWT mat` ego !!!
  },
};