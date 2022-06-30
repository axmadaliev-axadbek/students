import {write, read} from '../utils/model.js'
import {AuthorizationError} from "../utils/errors.js"
import jwt from '../utils/jwt.js'

const addToGroup = (req,res,next) => {
    let users = read('users')
    let groups = read('groups')
    let data = read('data')
    let {studentId, groupId } = req.body
    console.log(studentId);
    console.log(groupId);
    let student = users.find(x=> x.id == studentId)
    let group = groups.find(x=> x.id == groupId)
    if(student.balance >= group.group_price) {
        student.balance = student.balance - group.group_price
        let newUs = {
            id: data.length ? data.at(-1).id + 1 : 1,
            studentId: Number(studentId),
            groupId: Number(groupId),
        }
        data.push(newUs)
        write('data', data)
        write('users', users)
        write('groups', groups)
        console.log(group.groupname);
        return res.status(200).send({
            student: newUs,
            message: `Siz ${group.groupname} guruhga qoshildiz`
        })
    } else {
        res.send('balance etarli emas')
    }
}

const deleteFromGroup = (req,res,next) => {
    let users = read('users')
    let groups = read('groups')
    let data = read('data')
    let {studentId, groupId } = req.body
    let student = users.find(x=> x.id == studentId)
    let group = groups.find(x=> x.id == groupId)
    let sum = data.find( x=> x.studentId == studentId && x.groupId == groupId )
    if(sum) {
        student.balance = student.balance + group.group_price
        data.filter( x=> x.student != studentId)
        groups.filter( x => x.id != groupId)
        write('data', data)
        write('users', users)
        write('groups', groups)
        return res.send({
            student: student,
            message: 'balance qaytarildi'
        })
    } else {
        res.send('balance etarli emas')
    }
}



export default {
    deleteFromGroup, addToGroup
}















