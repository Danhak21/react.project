import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {getMyRequests} from "../../store/user/action"
import { acceptRequest } from "../../store/user/action";
import { declineRequest } from "../../store/user/action";
import { canselRequest } from "../../store/user/action";
import { Link } from "react-router-dom";

export const MyRequests=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getMyRequests())
    },[])
    const a=useSelector(state=>state.us.users)
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
                        <div>
                            <button onClick={()=>{
                                dispatch(acceptRequest(e.id))
                            }}>Accept</button>
                            <button onClick={()=>{
                                dispatch(declineRequest(e.id))
                            }}>Decline</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}