import React, {Component} from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import './App.css';
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";


class App extends Component {
  render() {
    return (
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn/>}/>
            <Route exact path="/SignIn" element={<SignIn/>}/>
            <Route exact path="/SignUp" element={<SignUp/>}/>
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Routes>
        </Router>
    )
  }
}

export default App;



