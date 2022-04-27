import express from 'express';
import loginRouter from './routes/user.js';
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';

const PORT = 3001;
const app = express();

mongoose.connect(
    `mongodb://127.0.0.1:27017/zirohlab`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("connected Successfully...")
}).catch(err => {
    console.log(err);
})

app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/user', loginRouter);

app.listen(PORT, (error) => {
    if(!error)
        console.log("server running on port "+ PORT)
    else 
        console.log("Error ", error);
    }
);