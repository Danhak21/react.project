import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Profile } from "./Profile"
import { Login } from "../login/Login"
export const RouterProfile=()=>{
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="profile" exact component={Profile}></Route>
                    <Route path="profile/photo" exact component={Profile}></Route>
                    <Route path="profile/contacts" exact component={Profile}></Route>
                    <Route path="profile/friends" exact component={Profile}></Route>
                    <Route path="profile/message" exact component={Profile}></Route>
                    <Route path="profile/logout" exact component={Login}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}