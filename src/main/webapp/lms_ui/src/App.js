import React, {Component} from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css';
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import LibDashboard from "./Component/LibDashboard";
import AddBook from "./Component/AddBookItem";
import RegisterBook from "./Component/RegisterBook";
import AddBookItem from "./Component/AddBookItem";
import ManageBooks from "./Component/ManageBooks";
import Fake from "./Component/Fake";
import EditBook from "./Component/EditBook";
import StudentDashboard from "./Component/StudentDashboard";
import ReserveBooks from "./Component/ReserveBooks";
import IssuedBooks from "./Component/IssuedBooks";

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
            <Route exact path="/AddBookItem" component={AddBookItem}/>
            <Route exact path="/ManageBooks" component={ManageBooks}/>
            <Route exact path="/EditBook" component={EditBook}/>
            <Route exact path="/StudentDashboard" component={StudentDashboard}/>
            <Route exact path="/Fake" component={Fake}/>
            <Route exact path="/ReserveBooks" component={ReserveBooks}/>
            <Route exact path="/IssuedBooks" component={IssuedBooks}/>

            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Switch>
        </Router>
    )
  }
}

export default App;



