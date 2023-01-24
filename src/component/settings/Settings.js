import { useDispatch } from "react-redux"
import { useEffect,useState } from "react"
import { updateLogin, updatePassword,uploadPicture} from "../../store/user/action"
import { Link } from "react-router-dom"
import "./settings.scss"

export const Settings=()=>{
    const [a,setA]=useState("")
    const [b,setB]=useState("")
    console.log(a)
    const dispatch=useDispatch()
    const [file,setFile]=useState(null)
    const show=(e)=>{
        if(e.target.files.length>0){
            setFile(e.target.files[0])
        }
    }
    const upload=()=>{
        if(file!=null){
            let formData=new FormData()
            formData.append("token",localStorage.us);
            formData.append("avatar",file)
            dispatch(uploadPicture(formData))
        }
    }
    return(
        <div>
            <div className="mas3-1">
                <div>
                    <Link to="/profile">Profile</Link>
                    <Link to="/showmyrequests">My Requests</Link>
                    <Link to="/showmyfriends">My Friends</Link>
                    <Link to="/posts">My Posts</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/">log Out</Link>
                </div>
            </div>
            <div className="settings">
                <div>
                    <button onClick={()=>{
                        dispatch(updateLogin(a))
                    }}>Update Login</button>
                    <input placeholder="set your text" onChange={(e)=>setA(e.target.value)}></input>
                </div>
                <div>
                    <button onClick={()=>{
                        dispatch(updatePassword(b))
                    }}>Update Password</button>
                    <input type="password" placeholder="set your password" onChange={(e)=>setB(e.target.value)}></input>
                </div>
                <div>
                    <button onClick={()=>upload()}>Upload Picture</button>
                    <input type="file" onChange={(e)=>show(e)}></input>
                </div>
            </div>
        </div>
    )
}