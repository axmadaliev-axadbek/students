import {write, read} from '../utils/model.js'
import {AuthorizationError} from "../utils/errors.js"
import jwt from '../utils/jwt.js'

const GET = (req,res,next) => {
    let groups = read('groups')
    let {id} = req.params
    console.log(id);
    if(id) {
        let group = groups.find(x => x.id == id)
        res.status(200).send(group)
    }
    res.status(200).send(groups)
    
}


const POST = (req, res, next) => {
    try {
        let groups = read('groups')      
        let gr = groups.find(g => g.groupname == req.body.groupname && g.group_price ==req.body.groupPrice)
        if(gr) {
            return res.status(401).send('this gr is exist')
        }
        let newGr = {
            id: groups.length ? groups.at(-1).id + 1 : 1,
            groupname: req.body.groupname,
            group_price: Number(req.body.groupPrice),
        }
        groups.push(newGr)
        write('groups', groups)
        res.status(201).json({
            status: 201,
            message: 'created',
            gr: newGr
        })
    } catch (error) {
        console.log(error);
    }
}


const DELETE = (req, res) => {
    try {
        let groups = read('groups')      
        let {id} = req.params 
        if(!id) {
            return res.send('id is required')
        }
        groups = groups.filter(gr => gr.id != id)
        write('groups', groups)
        res.send(groups)

    } catch (error) {
        console.log(error);
    }
}

export default {
    POST, GET, DELETE
}















