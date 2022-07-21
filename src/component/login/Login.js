import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../module/loginReducer';
import './Login.css';
function Login(props) {
    const isLogin=props.isLogin;
    
    const dispatch=useDispatch();

    const [loginId,setLoginId]=useState("");
    const [password,setPassword]=useState("");

    const [isLoginId,setIsLoginId]=useState(false);
    const [isPassword,setIsPassword]=useState(false);

    const navigate=useNavigate();

    if(isLogin){
        alert("로그인중");
        navigate("/")
    }
    const changeLoginId=e=>{
        const checkresult=/^[\w+_]\w+@\w+\.\w+$/
        if(!checkresult.test(loginId)) setIsLoginId(true)
        else setIsLoginId(false)

        setLoginId(e.target.value)
    }

    const changePassword=e=>{
        if(e.target.value.length<5)setIsPassword(true)
        else setIsPassword(false);

        setPassword(e.target.value);
    }
    const login=e=>{
        e.preventDefault();
        if(loginId.length==0||isLoginId){
            alert("아이디를 입력하세요");
            return false;
        }else if(password.length<5){
            alert("비밀번호를 입력하세요");
            return false;
        }

        // axios.post(`api/Members/login?loginId=${loginId}&password=${password}`)
        axios.post(`auth/sign_up`,{
            loginId:loginId,
            password:password
        })
        .then(
            res => {
                dispatch(setUser(true))
                if(res.data.msg) alert(res.data.msg);
                else {
                    sessionStorage.setItem("user_id",res.data.login_id);
                    sessionStorage.setItem("user",res.data.name);
                    sessionStorage.setItem("id",res.data.id);
                    document.location.href = '/';
                }

                // sessionStorage.setItem("user_id",res.data.login_id);
                // sessionStorage.setItem("user",res.data.name);
                // document.location.href = '/'

                // navigate("/")
            }
        ).catch(
            res=> console.log(res.message)
        )
        
    }

    

    return (
        <div className="containers">
            <div className='login_container'>
                <div className="login_form">
                    <form onSubmit={login}>
                        <div className="login_box id_box">
                            <input type="text" className="form_box" id="login_id" placeholder="아이디"
                                name="userId"value={loginId}  onChange={changeLoginId}/>
                                {isLoginId && <div className="invalid-input">이메일 형식이 잘못되었습니다.</div>}
                        </div>
                        <div className="login_box">
                            <input type="password" className="form_box" id="login_password"
                                placeholder="비밀번호" name="password" value={password} onChange={changePassword} />
                                {isPassword&&<div className="invalid-input">비밀번호가 짧습니다.</div>}
                        </div>
                        <div className="submit_box">
                            <input type="submit" className="form_box sub_from" value="로그인" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;