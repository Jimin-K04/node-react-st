const express = require('express') //express 모듈 가져옴
const app = express()
const port = 5000
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const path = require('path');
const config = require(path.join(__dirname, 'config', 'key'));
const {User} = require("./models/User") //모델 가져오기기
const {auth} = require("./middleware/auth");
const cors = require("cors");

app.use(cookieParser());

app.use(cors({
  origin : "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

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

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요~")
})

app.post('/api/users/register', async(req, res) =>{
  //회원가입 할 때 필요한 정보들을 client 에서 가져오면 데이터 베이스에 넣는다.
  const user = new User(req.body) //body parser 를 이용해 client 로 부터 정보를 받아 옴
  
  try{
    //save 전에 비밀번호 암호화
    await user.save();
    return res.status(200).json({success:true})
  } catch(err) {
    return res.json({success:false, err})
  }
})

//로그인 기능, 엔드 포인트를 /login 으로 설정
app.post('/api/users/login', (req, res) =>{
 
  //요청된 이메일이 데이터 베이스에 있는지 찾기
  User.findOne({
    email: req.body.email
  })
  .then (async (user) => {
    if (!user) {
      throw new Error("there is no user match to email.")
    }
    const isMatch = await user.comparePassword(req.body.password);
    return {isMatch, user};
  })
  .then(({isMatch, user}) => {
    console.log(isMatch);
    if (!isMatch) {
      throw new Error("비밀번호가 틀렸습니다.")
    }
    //로그인 완료
    return user.generateToken();
  })
  .then ((user) => {
    res.cookie("x_auth", user.token, {
      httpOnly: true,  // 클라이언트에서 접근 불가능 (보안)
      secure: false,   // HTTPS가 아닌 환경에서도 동작하도록 설정 (개발용)
      sameSite: "none", // CORS 문제 방지
  })

  return res.status(200).json({loginSuccess: true, userId: user._id});
  })
  .catch((err) => {
    console.log(err);
    return res.status(400).json({
      loginSuccess: false,
      message: err.message
    });
  })


});

//auth 는 call back 함수 작동 전 중간에서 역할 수행
app.get('/api/users/auth', auth, (req, res) => {

  //여기까지 미들웨어를 통과해 왔다는 것은 Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role 0 -> 일반유저, role 이 0 이 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  console.log("🔹 로그아웃 요청 받음, 현재 쿠키 값:", req.cookies.x_auth);
  User.findOneAndUpdate({ _id: req.user._id},
    {token: ""} //토큰을 제거해준다
  ) //유저를 찾아서 정보를 update 시켜줌
  .then(user => {
    return res.status(200).send({success: true})
  })
  .catch(err => {
    return res.json({ success: false, err })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
