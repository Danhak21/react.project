import "./login.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {login} from "../../store/user/action"

export const Login=(props)=>{
  const [user,setUser]=useState({
    login:"",
    password:""
  })
  const dispatch=useDispatch();
  const signin=()=>{
    dispatch(login(user,props.history))
    setUser({
      login:"",
      password:""
    })
  }
  const error=useSelector(state=>state.us.loginError)
    return(
        <>
          <div className="mas1">
            <div className="mas1-1">
              <h2>Login</h2>
              <p>{error}</p>
              <label>
                <img src="http://localhost:3000/image/1.png"></img>
                <input placeholder="Enter Yor Email" onChange={(e)=>setUser({...user,login:e.target.value})} value={user.login}></input>
              </label>
              <label>
                <img src="http://localhost:3000/image/2.png"></img>
                <input placeholder="Enter Password" type="password" onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password}></input>
              </label>
              <button onClick={signin}>Login</button>
              <Link to="/register">Register</Link>
            </div>  
          </div>  
        </>
    )
}