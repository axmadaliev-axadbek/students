import {write, read} from '../utils/model.js'
import {AuthorizationError} from "../utils/errors.js"
import jwt from '../utils/jwt.js'

const GET = (req,res,next) => {
    let users = read('users')
    let data = read('data')
    let groups = read('groups')
    let {id} = req.params

    data = data.map(x => {
        x.student = users.find(s => s.id == x.studentId)
        x.group = groups.find(u => u.id == x.groupId)
        return x
    })
    
    data = data.map(x => {
        delete x.group.id
        delete x.studentId
        delete x.student.id
        delete x.groupId

        return x
    })


    if(id) {
        let user = users.find(x => x.userId == id)
        res.status(200).send(user)
    }
    res.status(200).send(data)
}


const REGISTER = (req, res, next) => {
    try {
        let users = read('users')       

        let newUser = {
            userId: users.length ? users.at(-1).userId + 1 : 1,
            username: req.body.username,
            age: req.body.age,
            balance: req.body.balance,
        }
        users.push(newUser)
        write('users', users)
        console.log(process.cwd());
        res.status(201).json({
            status: 201,
            message: 'created',
            token: jwt.sign({userId: newUser.userId}),
            user: newUser
        })
    } catch (error) {
        return next(new AuthorizationError(401, error.message))  
    }
}




export default {
   REGISTER, GET
}















