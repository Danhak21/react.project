import axios from "axios"

export const registerError=(e)=>{
    return {type:"registerError", value:e}
}
export const loginError=(e)=>{
    return {type:"loginError", value:e}
}
export const profile=(e)=>{
    return {type:"profile", value:e}
}
export const search=(e)=>{
    return {type:"search", value:e}
}
export const guest=(e)=>{
    return {type:"guest", value:e}
}
export const users=(e)=>{
    return {type:"users", value:e}
}
export const user=(e)=>{
    return {type:"users", value:e}
}
export const posts=(e)=>{
    return {type:"posts", value:e}
}
export const photos=(e)=>{
    return {type:"photos", value:e}
}


export const addUser=(user)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/signup",user)
            .then(res=>{
                console.log(res)
                if("error" in res.data){
                    dispatch(registerError(res.data.error))
                }else{
                    dispatch(registerError(""))
                }
            })
            .catch(e=>{
                console.log(e)
            })
    }
}
export const login=(user,history)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/login",user)
        .then(res=>{
            console.log(res)
            if("error" in res.data){
                    dispatch(loginError(res.data.error))
                }else{
                    dispatch(loginError(""))
                    localStorage.us=res.data.token
                    history.push({pathname:"/profile"})
                }
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const getUser=(history)=>{
    return function(dispatch){
        axios.post('http://localhost:5000/getUserByToken',{token:localStorage.us})
                    .then(res=>{
                        if("error" in res.data){
                            delete localStorage.us
                            history.push({pathname:"/"})
                        }else{
                            console.log(res.data)
                            localStorage.us=res?.data.token
                            dispatch(profile(res.data))
                        }
                    })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const searchUser=(x)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/search",{token:localStorage.us,text:x})
        .then(res=>{
            console.log(res);
            dispatch(search(res.data.users))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const addFriend=(userId, text='')=>{
    return function(dispatch){
        axios.post("http://localhost:5000/addFriend",{token:localStorage.us,id:userId})
        .then(res=>{
            console.log(res)
            dispatch(searchUser(text))

        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const showGuest=()=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getUserById",{id:localStorage.id})
        .then(res=>{
            console.log(res.data)
            dispatch(guest(res.data))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}
export const getMyRequests=()=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getMyRequests",{token:localStorage.us})
        .then(res=>{
            console.log(res)
            dispatch(users(res.data.users))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const acceptRequest=(userId)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/acceptRequest",{token:localStorage.us,id:userId})
        .then(res=>{
            console.log(res);
            dispatch(getMyRequests())
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const declineRequest=(userId)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/declineRequest",{token:localStorage.us,id:userId})
        .then(res=>{
            console.log(res);
            dispatch(getMyRequests())
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const cancelRequest=(userId, text='')=>{
    return function(dispatch){
        axios.post("http://localhost:5000/cancelRequest",{token:localStorage.us,id:userId})
        .then(res=>{
            console.log(res);
            dispatch(searchUser(text))

        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const myFriends=()=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getMyFriends",{token:localStorage.us})
        .then(res=>{
            console.log(res);
            dispatch(user(res.data.users))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const unfriend=(userId, text='')=>{
    return function(dispatch){
        axios.post("http://localhost:5000/unfriend",{token:localStorage.us,id:userId})
        .then(res=>{
            console.log(res);
            dispatch(myFriends())
            dispatch(searchUser(text))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const updateLogin=(txt)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/updateLogin",{text:txt,token:localStorage.us})
        .then(res=>{
            console.log(res)
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const updatePassword=(txt)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/updatePassword",{text:txt,token:localStorage.us})
        .then(res=>{
            console.log(res)
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const uploadPicture=(obj)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/uploadPic",obj)
        .then(res=>{
            console.log(res)
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const addPost=(obj)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/addPost",obj)
        .then(res=>{
            dispatch(getMyPosts())
            console.log(res)
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const getMyPosts=()=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getMyPosts",{token:localStorage.us})
        .then(res=>{
            console.log(res)
            dispatch(posts(res.data))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const removePost=(obj)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/removePost",{post_id:obj,token:localStorage.us})
        .then(res=>{
            console.log(res)
            dispatch(getMyPosts())
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const getFriendsPosts=()=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getFriendsPosts",{token:localStorage.us})
        .then(res=>{
            console.log('get',res)
            dispatch(posts(res.data))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const like=(id)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/like",{token:localStorage.us,post_id:id})
        .then(res=>{
            console.log("res", res)
            dispatch(getFriendsPosts())
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const addPhoto=(obj)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/addPhoto",obj)
        .then(res=>{
            console.log(res)
            dispatch(getMyPhotos())
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const getMyPhotos=()=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getMyPhotos",{token:localStorage.us})
        .then(res=>{
            console.log(res);
            dispatch(photos(res.data))
        })
        .catch(e=>{
            console.log(e);
        })
    }
}

export const category=(av,txt)=>{
    return function(dispatch){
        axios.post("http://localhost:5000/getMyPhotos",{token:localStorage.us,avatar:av,text:txt})
        .then(res=>{
            console.log(res);
            dispatch(getMyPhotos())
        })
        .catch(e=>{
            console.log(e);
        })
    }
}