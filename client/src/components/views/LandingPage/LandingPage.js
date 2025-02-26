import React, {useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
    .then(response => console.log(response.data))
    .catch(error => console.error("API 요청실패: ", error));

  }, [])
  
  const onClickHandler = () => {
    axios.get('http://localhost:5000/api/users/logout', { withCredentials: true })
    .then(response => {
      if (response.data.success)  {
        navigate('/login')
      } else {
        alert('로그아웃 실패');
      }
    })
    .catch(error => console.log("로그아웃 실패", error))
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2>시작페이지</h2>

      <button onClick = {onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage