import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../module/loginReducer';
import './Header.css';
function Header(props) {
	const isLogin=props.isLogin;

	const navigate=useNavigate();
	let setHead;
	let join;
	// const isLogin=useSelector((state)=>state.loginReducer.user);
	// console.log(isLogin);


	const onLogout=()=>{
		sessionStorage.removeItem("user_id")
		sessionStorage.removeItem("user")
		sessionStorage.removeItem("id");
		document.location.href = '/'
	}
	if(isLogin){
		setHead=
		<>
		<Link to="/project-test">
			<div className="navbar-nav">
				<span className='header_nav'>test</span>
			</div>
		</Link>
		<Link to="/insert-test">
			<div className="navbar-nav">
				<span className='header_nav'>등록테스트</span>
			</div>
		</Link>
        <div className="navbar-nav" onClick={onLogout}>
			<span className='header_nav'>LogOut</span>
		</div>
	
		</>


	}else{
		setHead=	<Link to="/login">
        <div className="navbar-nav">
			<span className='header_nav'>Login</span>
		</div>
		</Link>

		join=	
		<Link to="/joinForm">
			<div className="navbar-nav">
				<span className='header_nav'>Join</span>
			</div>
		</Link>
	}


    return (
    <div className="container">
		
		<div className="headcont">
			<Link className='headLink' to="/">
	    	TestIops
			</Link>
		</div>
		
		<Link to="/">
		<div className="navbar-nav">
			<span className='header_nav'>home</span>
		</div>
		</Link>
		{join}
		{/* <Link to="/joinForm">
        <div className="navbar-nav">
			<span className='header_nav'>Join</span>
		</div>
		</Link> */}
		
		{setHead}
		{/* <Link to="/login">
        <div className="navbar-nav">
			<span className='header_nav'>Login</span>
		</div>
		</Link> */}
	</div>
    );
}

export default Header;