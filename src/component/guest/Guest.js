import {showGuest} from "../../store/user/action"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import "./guest.scss"
import { Link } from "react-router-dom"

export const Guest=()=>{
    const dispatch=useDispatch()
    useEffect(async()=>{
        dispatch(showGuest())
    },[])
    const a=useSelector(state=>state.us.guest);
    console.log(a)
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
            <p>{a.name} {a.surname}</p>
        </div>
    )
}