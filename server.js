const express = require('express');
const traineeRouter = require('./routers/trainee.router');
const userRouter = require('./routers/user.router')
var cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const ports = process.env.ports || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// app.get('/',(req,res)=>{
// res.send(
//     {
//         "message":"hello",
//         "status": " sucess"
//     }
// )
// })
app.use('/trainee',traineeRouter);
app.use('/user',userRouter);


app.use((req, res,next)=>{
res.setHeader('Accsess-Control-Allow-Origin','*');
res.setHeader('Accsess-Control-Allow-Methods','GET, POST, PUT, DELETE');
res.setHeader('Accsess-Control-Allow-Methods','Content-Type', 'Authorization');
next();
})

app.listen(ports,()=>{
    console.log(`port is running on ${ports}`)
})