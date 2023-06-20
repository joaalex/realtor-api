require('dotenv').config();
const express = require('express');
const app = express();
const port = '3434';
const database = require('./config/database');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter')

app.use(bodyParser.json());
app.use('/api/realitor', userRouter);


database.connect((error)=>{

  if(error){
    console.log('Error connecting to database');
    return;
  };

  console.log('Database connected successfully');
  
  app.listen(port, ()=>{
    console.log(`This server is on http://localhost:${port}`)
  });

});



