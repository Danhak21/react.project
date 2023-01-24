import { addPost,getMyPosts, removePost } from "../../store/user/action";
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./posts.scss"

export const Posts=()=>{
    const [b,setB]=useState("")
    const a=useSelector(state=>state.us.posts)
    const [file,setFile]=useState(null)
    const dispatch=useDispatch()
    console.log(a)

    const show=(e)=>{
        if(e.target.files.length>0){
            setFile(e.target.files[0])
        }
    }
    useEffect(()=>{
        dispatch(getMyPosts())
    },[])

    const upload=()=>{
        if(file!=null){
            let formData=new FormData()
            formData.append("token",localStorage.us);
            formData.append("avatar",file)
            formData.append("text",b)
            dispatch(addPost(formData))
        }
    }

    const remove=(e)=>{
        dispatch(removePost(e))
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
            <div>
                <textarea onChange={(e)=>setB(e.target.value)}></textarea>
                <input type="file" onChange={(e)=>show(e)}></input>
                <button onClick={()=>upload()}>Save Post</button>
                <hr></hr>
                <div className="posts">
                    {a?.map((e,i)=>{
                        return(
                            <div key={i}>
                                <p>{e.text}</p>
                                <img src={"http://localhost:5000/photos/"+e.photo} alt=""></img>
                                <button onClick={()=>remove(e.id)}>X</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}