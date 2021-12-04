import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Card from "../Items/Card";
import swal from "sweetalert";

class LibDashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            userName:"user",
            reservations:"x",
            userData:JSON.parse(localStorage.getItem('userData')),
        }

        this.logOut=this.logOut.bind(this)

    }
    componentDidMount() {

        if (this.state.userData === null) {
            console.log("Library:getting UserData")
            let f=localStorage.getItem('userData')
            if( f === null){
                this.props.history.push({
                    pathname: '/Error',
                    message: 'Backend server is down'
                });
            }
            else {
                this.setState({
                    userName:this.state.userData.name
                })
            }
            this.setState({
                userData: JSON.parse(localStorage.getItem('userData')),

            },()=>console.log("StudentDashboard userId:",this.state.userData))

        } else {
            console.log("LibraryDashboard: setting UserData:" ,this.state.userData)
            localStorage.setItem('userData', JSON.stringify(this.state.userData));
            this.setState({
                userName:this.state.userData.name
            })
        }
    }
    logOut(e){
        console.log("logout called")
        swal({
            title: "Logout",
            text: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                localStorage.removeItem("token")
                localStorage.removeItem("userData")

                swal("Log out successful", {
                    icon: "success",
                });
                this.props.history.push("/SignIn")
            }
        });
    }

    render() {
        return (
            <div>
                <div className="parent">
                    <div className="left">
                        <ul>
                            <li><h3>welcome</h3></li>
                            <li><h3>{this.state.userName} </h3></li>
                            <li>Library Management System</li>
                            <br/><br/><br/><br/>
                            <li><h4>You have {this.state.reservations} pending reservations to approve</h4></li>
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                            {/*fix this*/}
                            <button className="logoutBtn" onClick={this.logOut} >Logout</button>
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
                                <Link to="/ManageStudents">
                                    <Card title ="Manage Students"/>
                                </Link>
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
