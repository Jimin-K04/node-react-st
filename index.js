const express = require('express') //express 모듈 가져옴
const app = express()
const port = 5000

//mongo DB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jiminkim:0318cluster0@cluster0.taw3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true, useUnifiedTopology: true//에러방지
}).then(() => console.log('MongoDB Connected...')) //성공했을 경우
  .catch(err => console.log(err)) //에러시



app.get('/', (req, res) => {
  res.send('Hello World!! haha')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})