const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
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
//save 하기 전에 함수 실행
userSchema.pre('save', function(next){
    const user = this; //여리를 가리킨다

    if(user. isModified('password')){ //password 변경시킬때만 비밀번호 암호화 해줌
        //비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash; //hash 된 비밀번호로 바꿔주기
                return next();
            });
        });
    } else {
        return next();
    }

});

//comparePassword 메소드 만들어주기기
userSchema.methods.comparePassword = function(plainPassword) {
    //plainPassword 와 암호화된 비밀번호가 같은지 체크해야함, userSchema 의 password 는 this.password로,,
    const user = this;
    return bcrypt.compare(plainPassword, user.password)
    .then(result => {
        return result;
    })
    .catch(err => {
        throw err;
    })
}

userSchema.methods.generateToken = function() {

    var user = this; //여기서 this 는 userschema 를 나타나겠..지?

    //jsonwebtoken 을 이용해서 token생성
    const token = jwt.sign(user._id.toJSON(), 'secretToken')

    //user._id + 'secretToken' = token
    //->
    //'secretToken' -> user._id

    user.token = token //userSchema 의 token 부분에 생성한 token 을 넣어줌
    return user.save();
}

userSchema.statics.findByToken = async function(token) {
    const user = this;

    try {
        //토큰을 decode 한다.
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, 'secretToken', (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            });
        });
        //유저 아이디를 이용해서 유저를 찾은 다음
        //클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인

        //findOne 은 이미 몽고DB에 있는 메소드
        const foundUser = await user.findOne({"_id": decoded, "token": token});
        return foundUser;
    } catch(err){
        throw err;
    }
};
    
const User = mongoose.model('User', userSchema) //모델로 스키마 감싸기

module.exports = {User} // 이 모델을 다른파일에서 쓸 수 있게 export