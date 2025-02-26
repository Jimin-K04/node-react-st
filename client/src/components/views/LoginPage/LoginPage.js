import React, { useState } from 'react'
//import axios from 'axios'
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state 만들기 -> 서버에 보내고자 하는 값이 state 에 저장됨
  const [Email, setEmail] = useState("") //useState 는 react 라이브러리에서 가져옴
  const [Password, setPassword] = useState("")

  //이벤트 함수
  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault(); //페이지 reflash 막아주기
    console.log('Email', Email)
    console.log('Password', Password) //state 값 확인
    
    let body = {
      email: Email,
      password: Password,
    }

    try {
      const response = await dispatch(loginUser(body));  //loginUser 이라는 action 을 취함

      console.log("🔥 login success:", response); // 응답 데이터 
      //로그인 성공시 렌딩 페이지로 이동동
      if (response.payload.loginSuccess) { //response 의 payload 부분의 loginsuccess값이 true 일 경우 실행
        navigate('/');
      } else{
        alert("faild to login");
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
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <br/>
        <button>
          Login
        </button>

      </form>


    </div>
  )
}

export default LoginPage