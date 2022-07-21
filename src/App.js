import logo from './logo.svg';
import './App.css';
import Header from './component/header/Header';
import MainSection from './component/mainSection/MainSection';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardInsert from './component/mainSection/boardInser/BoardInsert';
import Detail from './component/mainSection/main/Detail';
import Update from './component/mainSection/update/Update';
import JoinForm from './component/login/JoinForm';
import Login from './component/login/Login';
import Project from './component/project/Project';
import Insert from './component/mainSection/insertTest/Insert';
import { useEffect, useState } from 'react';


import {HubConnectionBuilder,LogLevel} from '@microsoft/signalr';
function App() {
  const [isLogin,setIsLogin]=useState(false);

  

  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
  })

  return (
    <BrowserRouter>
      <Header isLogin={isLogin}></Header>
      <Routes>
        <Route path="/"  element={<MainSection isLogin={isLogin}></MainSection>}/>
        <Route path="/insert" element={<BoardInsert isLogin={isLogin}/>}/>
        <Route path="/main/:userId" element={<Detail/>}/>
        <Route path="/mainUpdate/:boardId" element={<Update/>}/>
        <Route path="/joinForm" element={<JoinForm/>}/>
        <Route path="/login"  element={<Login isLogin={isLogin}/>}/>
        <Route path="/project-test" element={<Project></Project>}/>
        <Route path="/insert-test" element={<Insert></Insert>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
