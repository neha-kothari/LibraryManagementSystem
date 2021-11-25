import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Card from "./Card";

class StudentDashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            userName:"user",
            fine:0,
            userData:JSON.parse(localStorage.getItem('userData')),
        }

    }
    componentDidMount() {
        if (this.state.userData === undefined) {
            console.log("Student:getting UserData")
            this.setState({
                userData: JSON.parse(localStorage.getItem('userId')),
            },()=>console.log("StudentDashboard userId:",this.state.userData))

        } else {
            console.log("StudentDashboard: setting UserId:" ,this.state.userData)
            localStorage.setItem('userId', JSON.stringify(this.state.userData));
        }
    }

    render() {
        return (
            <div>
                <div className="parent">
                    <div className="left">
                        <ul>
                            <li><h3>welcome</h3></li>
                            <li><h3>{this.state.userData.name} </h3></li>
                            <li>Library Management System</li>
                            <br/><br/><br/><br/>
                            <li><h4>You have {this.state.fine} pending fine</h4></li>
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                            {/*fix this*/}
                            <button className="logoutBtn" >Logout</button>
                        </ul>
                    </div>

                    <div className="right" >
                        <div className="studCardContainer">
                            <div className="reserveBookC">
                                <Link to="/ReserveBooks">
                                    <Card title ="Reserve Books"/>
                                </Link>
                            </div>
                            <div className="issueBookC">
                                <Link to="/IssuedBooks">
                                    <Card title ="View Issued Books"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default withRouter(StudentDashboard)
