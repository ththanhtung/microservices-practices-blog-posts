const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 4003

app.post('/events', async (req, res)=>{
    const {type, data} = req.body

    if (type === 'commentCreated'){
        const status = data.content.includes('orange')?'rejected':'approved'
        try {
          await axios.post('http://event-bus-srv:4005/events', {
            type: 'commentModerated',
            data: {
              ...data,
              status,
            },
          });
        } catch (error) {
          console.log(error.message);
        }
    } 
    res.send({})
})

app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
})