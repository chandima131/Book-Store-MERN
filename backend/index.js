import express, { request, response } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose  from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();


//Middleware for parsing request body
app.use(express.json());

//middleware for handling CORS Policy
app.use(cors());


app.get('/', (request,response) =>{
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial')
})


app.use('/books',booksRoute);


mongoose 
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connect to the database');

        app.listen(PORT, ()=> {
            console.log(`App is listen to port ${PORT}`)
        })
        
    })
    .catch((error)=>{
        console.log(error);
    });