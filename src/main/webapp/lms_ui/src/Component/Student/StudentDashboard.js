import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Card from "../Items/Card";
import swal from "sweetalert";
import StudentService from "../../Services/StudentService";

class StudentDashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            userName:"user",
            fine:0,
            userData:JSON.parse(localStorage.getItem('userData')),
        }

        this.logOut=this.logOut.bind(this)
        this.calculateFine=this.calculateFine.bind(this)
    }

    //Calculate total pending fine of student
    calculateFine()
    {
        let token=localStorage.getItem("token")
        let studentId=this.state.userData.userId
        StudentService.calculateFine(studentId,token).then((res)=>{
            if(res!==undefined)
            {
                console.log(res.data)
                this.setState({
                    fine:res.data.fine
                })
            }
        })
    }

    //Logging out user
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


    componentDidMount() {
        this.calculateFine()

        if (this.state.userData === null) {
            console.log("undefined")
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
            console.log("Student:getting UserData")
            this.setState({
                userData: JSON.parse(localStorage.getItem('userData')),

            },()=>console.log("StudentDashboard userId:",this.state.userData))

        } else {
            console.log("StudentDashboard: setting UserData:" ,this.state.userData)
            localStorage.setItem('userData', JSON.stringify(this.state.userData));
            this.setState({
                userName:this.state.userData.name
            })
        }
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
                            <li><h4>You have Rs.{this.state.fine} pending fine</h4></li>
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                            {/*fix this*/}
                            <button className="logoutBtn" onClick={this.logOut} >Logout</button>
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
                                    <Card title ="My Books"/>
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
