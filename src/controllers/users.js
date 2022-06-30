import {write, read} from '../utils/model.js'
import {AuthorizationError} from "../utils/errors.js"
import jwt from '../utils/jwt.js'

const GET = (req,res,next) => {
    let users = read('users')
    let {id} = req.params
    if(id) {
        let user = users.find(x => x.id == id)
        res.status(200).send(user)
    }
    res.status(200).send(users)
}


const REGISTER = (req, res, next) => {
    try {
        let users = read('users')       
        let newUser = {
            id: users.length ? users.at(-1).id + 1 : 1,
            username: req.body.username,
            age: req.body.age,
            balance: Number(req.body.balance),
        }
        users.push(newUser)
        write('users', users)
        console.log(process.cwd());
        res.status(201).json({
            status: 201,
            message: 'created',
            token: jwt.sign({userId: newUser.id}),
            user: newUser
        })
    } catch (error) {
        return next(new AuthorizationError(401, error.message))  
    }
}




export default {
   REGISTER, GET
}















