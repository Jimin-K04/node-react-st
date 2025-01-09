const express = require('express') //express 모듈 가져옴
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require("./models/User"); //user 모델 가져오기
const config = require("./config/key")
//application/x-www-form-urlencoded  client 에서 오는 정보를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
//application/jason client 에서 오는 jason 타입의 데이터를 분석
app.use(bodyParser.json());

//mongo DB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...')) //성공했을 경우
  .catch(err => console.log(err)) //에러시



app.get('/', (req, res) => {
  res.send('Hello World!!haha')
})

app.post('/register', async(req, res) =>{
  //회원가입 할 때 필요한 정보들을 client 에서 가져오면 데이터 베이스에 넣는다.
  const user = new User(req.body) //body parser 를 이용해 client 로 부터 정보를 받아 옴
  
  try{
    await user.save();
    return res.status(200).json({success:true})
  } catch(err) {
    return res.json({success:false, err})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})