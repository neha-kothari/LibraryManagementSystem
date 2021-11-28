import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Card from "../Items/Card";

class LibDashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            userName:"user",
            reservations:"x",
            userData:JSON.parse(localStorage.getItem('userData')),
        }

    }
    componentDidMount() {
        if (this.state.userData === undefined) {
            console.log("Library:getting UserData")
            this.setState({
                userData: JSON.parse(localStorage.getItem('userId')),
            },()=>console.log("AdminDashboard userId:",this.state.userData))

        } else {
            console.log("AdminDashboard: setting UserId:" ,this.state.userData)
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
                            <li><h4>You have {this.state.reservations} pending reservations to approve</h4></li>
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                            {/*fix this*/}
                            <button className="logoutBtn" >Logout</button>
                        </ul>
                    </div>

                    <div className="right" >
                        <div className="libCardContainer">
                            <div className="addBookC">
                                <Link to="/RegisterBook">
                                    <Card title ="Add Books"/>
                                </Link>
                            </div>
                            <div className="manBookC">
                                <Link to="/ManageBooks">
                                    <Card title ="Manage Books"/>
                                </Link>
                            </div>
                            <div className="manStudC">
                                <Card title ="Manage Students"/>
                            </div>
                            <div  className="approveC">
                                <Card title ="Approve Reservations"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


}


export default withRouter(LibDashboard)
