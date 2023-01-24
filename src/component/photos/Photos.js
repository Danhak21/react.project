import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./photos.scss"
import { addPhoto, category, getMyPhotos } from "../../store/user/action";
import { Link } from "react-router-dom";

export const Photos=()=>{
    const [file,setFile]=useState(null)
    const dispatch=useDispatch()
    const [a,setA]=useState("")
    const photo=useSelector(state=>state.us.photos)
    const show=(e)=>{
        if(e.target.files.length>0){
            setFile(e.target.files[0])
        }
    }
    
    useEffect(()=>{
        dispatch(getMyPhotos())

    }, [])


    const upload=()=>{
        if(file!=null){
            let formData=new FormData()
            formData.append("token",localStorage.us);
            formData.append("text",a)
            formData.append("avatar",file)
            dispatch(addPhoto(formData))
            dispatch(getMyPhotos())
        }
    }

    const [text,setText]=useState("public")

    const cat=(photo)=>{
        dispatch(category(photo,text))
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
            <button onClick={()=>upload()}>Upload Picture</button>
            <input type="file" onChange={(e)=>show(e)}></input>
            <input type="text" placeholder="input image text" onChange={(e)=>setA(e.target.value)}></input>
            <hr></hr>
            <div class="photo">
                {photo?.map((e,i)=>{
                    return(
                        <div key={i}>
                            <img src={"http://localhost:5000/photos/"+e.photo} width="100px" alt=""></img>
                            <p>{e.text}</p>
                            <div>
                                <img src="http://localhost:3000/image/public.gif" onClick={()=>{setText("public");dispatch(cat(e.photo,text))}} alt=""></img>
                                <img src="http://localhost:3000/image/private.png" onClick={()=>{setText("private");dispatch(cat(e.photo,text))}} alt=""></img>
                                <img src="http://localhost:3000/image/protected.png" onClick={()=>{setText("protected");dispatch(cat(e.photo,text))}} alt=""></img>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}