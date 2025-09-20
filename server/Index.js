const express = require('express')
const RunServer = require('./Database/Connection')
const userRouter = require('./Routes/userRoutes')
const cors = require('cors')

 const app = express()   //2
const PORT = 3000  //3 


app.use(express.json()) //4 //TRANSMITING THE DATA IN JSON FORMATE
//json :javascript object notation
app.use(cors())



RunServer()  //6
  
//create: Post
//Read: Get
//update: put
//Delete : Delete
app.get('/',(req,res)=> {
    res.send('backend connected!')
})

app.use('/api', userRouter)

app.listen(PORT , ()=> {  //5
    console.log(`server is running on http://localhost:${PORT}`)
    
})

