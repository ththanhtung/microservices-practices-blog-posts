const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 4000

const posts = {

}

app.get('/posts', (req, res)=>{
    res.send(posts)
}) 

app.post('/posts/create', async (req, res)=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body

    posts[id] = {
        id, title
    }

    try {
        await axios.post('http://event-bus-srv:4005/events',{
            type: 'postCreated',
            data: {
                ...posts[id]
            }
        });
    } catch (error) {
        console.log(error.message);
    }
 
    res.status(201).send(posts[id]) 
})

app.post('/events', (req, res)=>{
    console.log('received event', req.body.type);
    res.send()
})

app.listen(port, ()=>{
    console.log('v55')
    console.log('server is up on port '+ port);
})