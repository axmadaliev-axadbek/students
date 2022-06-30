import express from "express";
import cors  from 'cors';
import { PORT } from './config.js'
import userRouter from './routers/users.js'
import groupRouter from './routers/groups.js'
import dataRouter from './routers/data.js'
import adminRouter from './routers/admin.js'
import fileUpload from "express-fileupload";
import path from "path";
import moment from 'moment'
const app = express()


app.use(express.json())
app.use(fileUpload())
app.use(cors())



app.get('/', (req, res) => {
    res.send('hello')
})

app.use(userRouter)
app.use(groupRouter)
app.use(dataRouter)
app.use(adminRouter)

app.listen( PORT, () => console.log(`${PORT} runing`))































