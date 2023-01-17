const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

const port = process.env.PORT || 4001

app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = []

app.post('/posts/:id/comments', async (req, res)=>{
    const CommentId = randomBytes(4).toString('hex')
    const postId = req.params.id
    const {content} = req.body

    const comments = commentsByPostId[postId] || []

    comments.push({
      id: CommentId, 
      content,
      status: 'pending'
    });

    commentsByPostId[postId] = comments

    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'commentCreated',
        data: {
          id: CommentId,
          content,
          postId: req.params.id,
          status: 'pending',
        },
      })
      .catch((err) => {
        console.log(err.message);
      });

    res.status(201).send(comments)
})

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByPostId[req.params.id]||[])
})

app.post('/events', async (req, res) => {
  console.log('received event', req.body.type);
  const {type, data} = req.body
  if (type === 'commentModerated'){
    const {id, postId, status, content} = data
    const comments = commentsByPostId[postId]
    const comment = comments.find(comment => comment.id === id)
    comment.status = status

    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'commentUpdated',
        data: {
          id,
          status,
          postId,
          content,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  res.send(); 
});

app.listen(port, ()=>{
    console.log('server is up on port '+ port);
})