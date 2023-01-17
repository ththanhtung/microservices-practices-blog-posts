const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()

const posts = {}

app.use(bodyParser.json())
app.use(cors())

const port = process.env.port || 4002

const handleEvent = (type, data)=>{
  if (type === 'postCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === 'commentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      content,
      status,
    });
  }

  if (type === 'commentUpdated') {
    const { id, status, content, postId } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts', (req, res)=>{
    res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data)
  
  console.log(posts);
  res.send({});
});

app.listen(port, async ()=>{
    try {
      const resp = await axios.get('http://event-bus-srv:4005/events');
      for (let event of resp.data){
        console.log('Processing event: ', event.type);
        handleEvent(event.type, event.data)
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log(`server is up on port ${port}`);
})