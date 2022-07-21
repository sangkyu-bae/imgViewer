import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPost from '../common/DaumPost';
import './JoinForm.css';
function JoinForm(props) {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [checkPassword,setCheckPassword]=useState("");
    const [name,setName]=useState("");
    const [firstPhone,setFirstPhone]=useState("");
    const [lastPhone,setLastPhone]=useState("");
    const [fixAddress,setFixAddress]=useState("");
    const [adress,setAddress]=useState("");
    const [startPhone,setStartPhone]=useState("");

    const [isPopupOpen,setIsPopupOpen]=useState(false);

    const navigate=useNavigate();
    const openPostCode=()=>{
        setIsPopupOpen(true);
    }

    const closePostCode=()=>{
        setIsPopupOpen(false);
    }


    const [isEmail,setIsEmail]=useState(false);
    const [ispassword,setIsPassword]=useState(false);
    const [ischeckPassword,setIsCheckPassword]=useState(false);
    const [isname,setIsName]=useState(false);
    const [isFirstPhone,setIsFirstPhone]=useState(false);
    const [isLastPhone,setIsLastPhone]=useState(false);
    const [isAdress,setIsAddress]=useState(false);
    
    const inputSpace=useRef();

    const changeEmail=e=>{
        const checkresult=/^[\w+_]\w+@\w+\.\w+$/
        if(!checkresult.test(email)) setIsEmail(true)
        else setIsEmail(false)

        setEmail(e.target.value)
    }

    const changePassword=e=>{
        if(e.target.value.length<8) setIsPassword(true)
        else setIsPassword(false)

        setPassword(e.target.value);
    }

    const changeCheckPassword =e =>{
        if(e.target.value!=password) setIsCheckPassword(true)
        else setIsCheckPassword(false)

        setCheckPassword(e.target.value);
    } 
    
    const changeName=e=>{
        if(e.target.value.length<2)setIsName(true)
        else setIsName(false)

        setName(e.target.value);
    }

    const changefirstPhone=e=>{
        const checkPhone=/\d{4}/
        if(!checkPhone.test(e.target.value))setIsFirstPhone(true);
        else setIsFirstPhone(false)
        setFirstPhone(e.target.value);
        if(isFirstPhone&&e.target.value.length>3) inputSpace.current.focus();
    }

    const changeLastPhone=e=>{

        const checkPhone=/\d{4}/
        if(!checkPhone.test(e.target.value))setIsLastPhone(true);
        else setIsLastPhone(false)
        setLastPhone(e.target.value);
        
    }
    
    const insertmember=e=>{
        e.preventDefault();
        console.log(startPhone)
        e.preventDefault();
        if(isEmail){
            alert("이메일을 확인하세요")
            return false;
        }else if(ispassword||ischeckPassword){
            alert("비밀번호를 확인하세요");
            return false;
        }else if(isname){
            alert("이름을 확인하세요")
            return false
        }else if(isFirstPhone||isLastPhone||startPhone==""||startPhone=="true"){
            alert("핸드폰 번호를 확인하세요")
            return false;
        }else if(isAdress||fixAddress.length<3){
            alert("주소를 확인하세요");
            return false;
        }
        let phone=startPhone+firstPhone+lastPhone;

        axios.post('/auth/InsertUser',{
            loginId:email,
            password:password,
            name:name,
            address:adress,
            phone:phone
        }).then(
            res => navigate("/")
        ).catch(
            res=> console.log(res.message)
        )
    }

    const getAdress=(adress)=> setFixAddress(adress);
    
    const changeAdress=e=> {
        if(e.target.value.length<3) setIsAddress(true)
        else setIsAddress(false)
        setAddress(e.target.value);
    }

    const changeStartPhone=e=>{
        setStartPhone(e.target.value);
    }
    return (
        <div className="containers">
            <div className='join_form_container'>
                <form onSubmit={insertmember}>
                    <div className="join_box">
                        <label htmlFor="email" className="join_label">이메일</label><br/> <input
                            id="email" className="join_input" type="text" value={email} onChange={changeEmail}name="loginId"/>
                           {isEmail && <div className="invalid-input">이메일 형식이 잘못되었습니다. </div>}
                    </div>
                    <div className="join_box">
                        <label htmlFor="password" className="join_label">비밀번호</label><br/> <input
                            id="password" value={password} onChange={changePassword} className="join_input" type="password" name="password"/>
                            {ispassword && <div className="invalid-input">비밀번호는 8자 이상입니다.</div>}
                    </div>
                    <div className="join_box">
                        <label htmlFor="password2" className="join_label">비밀번호 재확인</label><br/>
                        <input id="password2" className="join_input" type="password" value={checkPassword} onChange={changeCheckPassword}/>
                        {ischeckPassword && <div className="invalid-input">비밀번호가 일치하지 않습니다.</div>}
                    </div>
                    <div className="join_box">
                        <label htmlFor="name" className="join_label">이름</label><br/> <input
                            id="name" className="join_input" type="text" name="name" value={name} onChange={changeName}/>
                            {isname && <div className="invalid-input">이름은 2자 이상입니다.</div>}
                    </div>
                    <div className="join_box">
                        {/* <label htmlFor="phone" className="join_label">핸드폰 번호</label><br/> 
                        <input id="phone" className="join_input" type="text" name="phone" value={phone} onChange={changePhone}/>
                            {isphone && <div className="invalid-input">핸드폰 형식이 다릅니다.</div>} */}
                        <div className="">
                        <label htmlFor="phone" className="join_label">핸드폰 번호</label><br/> 
							<select onChange={changeStartPhone} className="rmobile1 tel" name="">
								<option value>선택하세요</option>
								<option value="010">010</option>
								<option value="011">011</option>
								<option value="016">016</option>
								<option value="017">017</option>
								<option value="018">018</option>
								<option value="019">019</option>
							</select> <span>-</span> <input type="text" maxLength='4'
								className="recipient_info phons tel" name="" value={firstPhone} onChange={changefirstPhone}/> <span>-</span>
                            <input type="text" maxLength='4' className="recipient_info phons tel"
								name="" value={lastPhone} ref={inputSpace} onChange={changeLastPhone}/>
                         {isFirstPhone && <div className="invalid-input">핸드폰 번호 형식이 다릅니다.</div>}
                         {isLastPhone && <div className="invalid-input">핸드폰 번호 형식이 다릅니다.</div>}
						</div>
                    </div>
                    <div className="join_box">
                        {/* <label htmlFor="address" className="join_label">주소</label><br/> <input
                            id="address" className="join_input" type="text" name="address"/> */}
                        <div className="add_box">
                        <label htmlFor="address" className="join_label">주소</label><br/>
                        
							<input type="text" className="recipient_info nonclick addres fix_adrr_ti"name="" disabled/> 
                            <button onClick={openPostCode} type="button"className="plain_btn">주소찾기</button>
                           <br/> <input type="text"
                                value={fixAddress}
								className="recipient_info nonclick addres fix_adrr_mi" name=""
								disabled/><br/> <input type="text"
								placeholder="상세 주소를 입력해주세요" className="recipient_info addres fix_adrr_mi"
								value={adress} onChange={changeAdress}  /><br/>
						</div>
                        {isAdress && <div className="invalid-input">상세주소를 입력하세요.</div>}
                    </div>
                    <div>
                        {isPopupOpen&&(
                            <DaumPost getAdress={getAdress}></DaumPost>
                        )}

                    </div>
                    <div>
                        <label></label>
                        <button type="submit" className="join_submit">회원가입</button>
                    </div>
                </form>
            </div>
	</div>
    );
}

export default JoinForm;