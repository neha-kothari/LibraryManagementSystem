import React, {Component} from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css';
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import LibDashboard from "./Component/LibDashboard";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/LibraryDashboard" component={LibDashboard}/>
            <Route exact path="/SignUp" component={SignUp}/>
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Routes>
        </Router>
    )
  }
}

export default App;



