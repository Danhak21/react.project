import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { myFriends } from "../../store/user/action"
import { unfriend } from "../../store/user/action"
import { Link } from "react-router-dom"

export const MyFriends=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(myFriends())
    }, [])
    const a=useSelector(state=>state.us.users);
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
            {a?.map((e,i)=>{
                return(
                    <div key={i} style={{border:"1px solid black"}}>
                        <p>{e.name} {e.surname}</p>
                        <button onClick={()=>{
                            dispatch(unfriend(e.id))
                        }}>Delete From Friends</button>
                    </div>
                )
            })}
        </div>
    )
}