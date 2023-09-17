
const port = process.env.PORT || 3004

import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';

import bandsRouter from './router/apiMusic/bands'
import frotaRouter from './router/apiCars/frota'
import songsRouter from './router/apiMusic/songs'
import  accountsRouter from './router/apiBank/accounts';
import usersRouter from './router/apiUsers/users'

import phonesRouter from './router/apiAdmin/phones'

//import purchasesRouter from './router/purchases'

const app = express()
import { ROLES } from './models/User';
//import { Purchases, ProductPurchased } from './models/Purchases';
import { HomePage } from './views/HomePage';
import  morgan  from 'morgan';
import path from 'path'
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: true}))
//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false
}));
app.use(express.static(path.resolve(__dirname, "./../public/")))
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong")
})

app.use('/phones', phonesRouter)
app.use('/frota', frotaRouter) 
app.use('/songs', songsRouter)
app.use('/accounts', accountsRouter)
app.use('/users', usersRouter)
app.use('/bands', bandsRouter)



app.get("/", (req: Request, res: Response) => {
    res.send(HomePage)
})

app.listen(3003, () => {
    console.log(`Servidor rodando na porta 3003 `)
});