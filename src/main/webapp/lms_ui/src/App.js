import React, {Component} from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css';
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import LibDashboard from "./Component/LibDashboard";
import AddBook from "./Component/AddBookItem";
import RegisterBook from "./Component/RegisterBook";

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
            <Route exact path="/AddBook" component={AddBook}/>
            <Route exact path="/RegisterBook" component={RegisterBook}/>
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Switch>
        </Router>
    )
  }
}

export default App;



