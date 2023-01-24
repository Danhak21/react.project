import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getFriendsPosts, getUser, unfriend,like } from "../../store/user/action"
import { useEffect,useState } from "react";
import { searchUser } from "../../store/user/action";
import { addFriend } from "../../store/user/action";
import { cancelRequest } from "../../store/user/action";
import { Link } from "react-router-dom";
import "./profile.scss"

export const Profile=(props)=>{
    const dispatch=useDispatch();
    const [text,setText]=useState("")
    const fp=useSelector(state=>state.us.posts)

    console.log(fp)
    useEffect(async()=>{
        if(localStorage.us){
            dispatch(getUser(props.history))
            dispatch(getFriendsPosts())
        }else{
            props.history.push({pathname:"/"})
        }
    },[])

    const a=useSelector(state=>state.us.profile)
    console.log(a)
    const search=(text)=>{
        if(text==""){
            dispatch(searchUser())
        }else{
            dispatch(searchUser(text))
        }
    }
    const b=useSelector(state=>state.us.search)
    const liked=(e,id)=>{
        console.log(fp)
        // if(e.style.color=="black"){
        //     e.style.color="red";
        //     dispatch(like(id))
        // }else{
        //     e.style.color="black"
            dispatch(like(id))
        // }
    }
    return(
        <div className="mas3">
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
            <div className="mas3-2">
                <div className="mas3-2d1">
                    {a.photo?
                    <img src={"http://localhost:5000/photos/"+a?.photo} width="80px" height="80px" alt=""></img>:
                    <></>}
                    <p>{a?.name}</p>
                    <p>{a?.surname}</p>
                    <p>{a?.login}</p>
                    <Link to="/photos">Photos</Link>
                    <hr></hr>
                </div>
                <div className="mas3-2d2">
                    {fp?.map((e,i)=>{
                        return(
                            <div key={i} className="post">
                                <p>{e?.account?.name} {e?.account?.surname}</p>
                                <p>{e?.text}</p>
                                <img src={"http://localhost:5000/photos/"+e.photo} width="100px" height="100px"></img>
                                {
                                    e.isLiked?
                                    <i onClick={(a)=>liked(a.target,e.id)} className='fas fa-thumbs-up' style={{color:'#00f'}}></i>
                                    :
                                    <i onClick={(a)=>liked(a.target,e.id)} className='far fa-thumbs-up'></i>
                                }
                                <div className="hov">
                                    <div className="likes">
                                        {e.likes.map((elm,ind)=>{
                                            return(
                                                <div key={ind}>
                                                    {elm.user.map((element,index)=>{
                                                        return(
                                                            <div key={index}>
                                                                <p>{element.name} {element.surname}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <i><span className="length">{e.likes.length}</span></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mas3-2d3">
                <input placeholder="Search" onChange={e=>{setText(e.target.value);search(e.target.value)}}></input>
                {b?.map((e,i)=>{
                        return(
                            <div key={i}>
                                <div>
                                    <p onClick={()=>{props.history.push("/guest/"+e.id);localStorage.id=e.id}}>{e.name} {e.surname}</p>
                                    { e.id == a.id?
                                    <></>
                                    : e.areWeFriends?
                                    <span>
                                        <button onClick={()=>{
                                            props.history.push("/showmyfriends")
                                        }}>my Friends</button>
                                        <button onClick={()=>{
                                            dispatch(unfriend(e.id, text))
                                        }}>Delete Friend</button>
                                    </span>
                                    :
                                    e.isRequestSent?
                                    <button onClick={()=>{
                                        dispatch(cancelRequest(e.id, text))
                                    }}>cansel Request</button>
                                    :
                                    <button onClick={()=>{
                                        dispatch(addFriend(e.id, text))
                                    }}>add Friend</button>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}