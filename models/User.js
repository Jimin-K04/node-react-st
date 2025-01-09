const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //이메일 사이 space 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //관리자, 일반 user 구분 0-> 일반유저저
        type: Number,
        default: 0 //임의로로
    },
    image: String,
    //유효성 관리리
    token: {
        type: String
    },
    //토큰 만기기
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //모델로 스키마 감싸기

module.exports = {User} // 이 모델을 다른파일에서 쓸 수 있게 export