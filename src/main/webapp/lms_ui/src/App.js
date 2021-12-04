import React, {Component} from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css';
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import Error from "./Component/Error"
import LibDashboard from "./Component/Library/LibDashboard";
import RegisterBook from "./Component/Library/RegisterBook";
import AddBookItem from "./Component/Library/AddBookItem";
import ManageBooks from "./Component/Library/ManageBooks";
import EditBook from "./Component/Library/EditBook";
import StudentDashboard from "./Component/Student/StudentDashboard";
import ReserveBooks from "./Component/Student/ReserveBooks";
import IssuedBooks from "./Component/Student/IssuedBooks";
import ManageStudents from "./Component/Library/ManageStudents";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/Error" component={Error}/>

            <Route exact path="/LibraryDashboard" component={LibDashboard}/>
            <Route exact path="/RegisterBook" component={RegisterBook}/>
            <Route exact path="/AddBookItem" component={AddBookItem}/>
            <Route exact path="/ManageBooks" component={ManageBooks}/>
            <Route exact path="/ManageStudents" component={ManageStudents}/>
            <Route exact path="/EditBook" component={EditBook}/>

            <Route exact path="/StudentDashboard" component={StudentDashboard}/>
            <Route exact path="/ReserveBooks" component={ReserveBooks}/>
            <Route exact path="/IssuedBooks" component={IssuedBooks}/>
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Switch>
        </Router>
    )
  }
}

export default App;



