import { BrowserRouter,Switch,Route,NavLink } from "react-router-dom";
import { Profile } from "./profile/Profile";
import { Register } from "./register/Register";
import { Login } from "./login/Login";
import { Guest } from "./guest/Guest"
import { MyRequests } from "./myrequests/MyRequests"
import { MyFriends } from "./myfriends/MyFriends";
import { Settings } from "./settings/Settings";
import { Posts } from "./posts/Posts";
import { Photos } from "./photos/Photos";

export const Router=(props)=>{
    console.log(props)
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/profile" exact component={Profile}></Route>
                    <Route path="/register" exact component={Register}></Route>
                    <Route path="/guest/:id" exact component={Guest}></Route>
                    <Route path="/showmyrequests" exact component={MyRequests}></Route>
                    <Route path="/showmyfriends" exact component={MyFriends}></Route>
                    <Route path="/settings" exact component={Settings}></Route>
                    <Route path="/posts" exact component={Posts}></Route>
                    <Route path="/photos" exact component={Photos}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}