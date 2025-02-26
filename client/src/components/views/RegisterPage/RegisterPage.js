import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state 만들기 -> 서버에 보내고자 하는 값이 state 에 저장됨
  const [Email, setEmail] = useState("") //useState 는 react 라이브러리에서 가져옴
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  //이벤트 함수
  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault(); //페이지 reflash 막아주기
    console.log('Email', Email)
    console.log('Password', Password) //state 값 확인
    console.log('Name', Name)

    if (Password !== ConfirmPassword) {
      return alert("비밀번호 확인이 일치하지 않습니다.")
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    try {
      const response = await dispatch(registerUser(body));  //registerUser 이라는 action 을 취함

      console.log("🔥 회원가입 성공 :", response); // 응답 데이터 
      //로그인 성공시 렌딩 페이지로 이동동
      if (response.payload.success) { //response 의 payload 부분의 loginsuccess값이 true 일 경우 실행
        navigate('/login');
      } else {
          alert("faild to sign up")
      }
      
    } catch (error) {
      console.error("login error:", error);
    }

    
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>

      <form style={{display: 'flex', flexDirection: 'column'}} 
        onSubmit={onSubmitHandler}>

        <label>Email</label>
        {/* 타이핑할때 onchange 라는 이벤트를 발생시켜 state 를 바꾸면 value 가 바뀜 */}
        <input type="email" value={Email} onChange={onEmailHandler} /> 

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

        <br/>
        <button>
          회원가입
        </button>

      </form>


    </div>
  )
}

export default RegisterPage