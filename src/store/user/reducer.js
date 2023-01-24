import { user } from "./user";

const reducer=(state=user,action)=>{
    let time={...state};
    switch(action.type){
        case "registerError":
            time.registerError=action.value
            break;
        case "loginError":
            time.loginError=action.value
            break;
        case "profile":
            time.profile=action.value;
            break;
        case "search":
            time.search=action.value;
            break;
        case "guest":
            time.guest=action.value;
            break;
        case "users":
            time.users=action.value;
            break;
        case "user":
            time.user=action.value;
            break;
        case "posts":
            time.posts=action.value;
            break;
        case "photos":
            time.photos=action.value;
            break;
        default:return time;
        }
    return time
}

export default reducer;