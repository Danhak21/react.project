import { Link } from "react-router-dom"
import { useState } from "react"
import { addUser } from "../../store/user/action";
import { useDispatch, useSelector } from "react-redux";
import "./register.scss"

export const Register=()=>{
  const [user,setUser]=useState({
    name:"",
    surname:"",
    login:"",
    password:"",
    confirm:""
  })
  const dispatch=useDispatch();
  const register=()=>{
    delete user.confirm
    dispatch(addUser(user))
    setUser({
      name:"",
      surname:"",
      login:"",
      password:"",
      confirm:"",
    })
  }
  const error=useSelector(state=>state.us.registerError)
    return(
        <>
          <div className="mas2">
            <div className="mas2-1">
              <h2>Registration</h2>
              <p>{error}</p>
              <input placeholder="Name" onChange={(e)=>setUser({...user,name:e.target.value})} value={user.name}></input>
              <input placeholder="Surname" onChange={(e)=>setUser({...user,surname:e.target.value})} value={user.surname}></input>
              <input placeholder="Login" onChange={(e)=>setUser({...user,login:e.target.value})} value={user.login}></input>
              <input placeholder="Password" type="password" onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password}></input>
              <input placeholder="Conform Password" type="password" onChange={(e)=>setUser({...user,confirm:e.target.value})} value={user.confirm}></input>
              <button onClick={register}>Register</button>
              <Link to="/">login</Link>
            </div>  
          </div>  
        </>
    )
}