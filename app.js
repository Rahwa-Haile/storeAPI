const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./Middlewares/errorHandler')
const notFound = require('./Middlewares/not-found')


app.get('/', (req, res)=>{
    res.status(200).send('<h1>Welcome to the store</h1><a href="api/v1/products">Products route</a>')
})

app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`app is running at port ${port}`);
    })
    } catch (error) {
        console.log(error)
    }
    
}

start()
