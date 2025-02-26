const {User} = require('../models/User');

let auth = async(req, res, next) =>{

    //인증처리 하는 곳
    console.log("🔹 req.cookies 전체 값:", req.cookies);

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    console.log("Token:", token);

    //토큰을 복호화 한후 유저 찾음
    try{
        const user = await User.findByToken(token)
         console.log("User found:", user);
        //유저가 있으면 인증 ok
        //유저가 없으면 인증 no
        if (!user) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user; //이렇게 req 로 data 를 전달해주면 index.js 에서 사용가능함
        next(); //index.js 에서 middleware 에서 다음으로 넘어가기 위함함
    } catch(err){
        return res.json({ auth_success: false, error: 'an error occurred'})
    }

}

module.exports = {auth}