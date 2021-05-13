import React, {useState} from 'react'
import Blog from './pages/Blog'
import Login from './pages/Login'
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from './pages/SignUp'
export default function App() {
    const [loggedIn, isLoggedIn] = useState(true)

    const loginHelper = () => {
        isLoggedIn(!loggedIn)
    }

    return (
          <>
         {/* Add Login Here */}
         
         
         <Switch>
            {loggedIn && <Route path="/">
                    <Login loginHelper={loginHelper}/>
            </Route>}
         {/* {loggedIn ?
            <Route exact path="/blogs">
                <Blog loginHelper={loginHelper}/>
            </Route>
            : 
            <Route exact path="/">
                <Login loginHelper={loginHelper}/>
            </Route>
         } */}
         <Route path="/blogs">
                <Blog loginHelper={loginHelper}/>
         </Route>
            <Route exact path='/signup' component={SignUp} />
         </Switch>   
        </>
    )
};