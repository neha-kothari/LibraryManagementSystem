import React,{Component} from "react";
import {Link} from 'react-router-dom';
import Card from "./Card";

class LibDashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            userName:"user",
            reservations:"x"

        }

    }

    render() {
        return (
            <div>

                <div className="parent">

                    <div className="left">
                        <ul>
                            <li><h3>welcome to </h3></li>
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
                                <Card
                                    title ="Add Books"
                                />
                            </div>
                            <div className="manBookC">
                                <Card
                                    title ="Manage Books"
                                />
                            </div>
                            <div className="manStudC">
                                <Card
                                    title ="Manage Students"
                                />
                            </div>
                            <div  className="approveC">
                                <Card
                                    title ="Approve Reservations"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


}


export default LibDashboard
