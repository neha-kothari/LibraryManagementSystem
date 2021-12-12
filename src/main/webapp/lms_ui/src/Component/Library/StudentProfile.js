import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import LibNavbar from "./LibNavbar";
import StudentService from "../../Services/StudentService";
import swal from "sweetalert";
import LibrarianService from "../../Services/LibrarianService";
import UserService from "../../Services/UserService";

class StudentProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            studentData:[],
            reservationData:[],
            reservationBooks:[],
            issueData:[],
            token:""
        }

        this.getReservations=this.getReservations.bind(this)
        this.viewBook=this.viewBook.bind(this)
        this.getIssues=this.getIssues.bind(this)
        this.approveReservation=this.approveReservation.bind(this)
        this.loadAllData=this.loadAllData.bind(this)
        this.convertDate=this.convertDate.bind(this)
    }

    convertDate(dateTime)
    {
        let date=new Date(dateTime)
        date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        return date
    }
    getStudentDetails()
    {
        LibrarianService.getStudentDetails(this.state.userId, this.state.token).then(res=>{
            if(res!==undefined)
            {
                this.setState({
                    studentData:res.data
                })
            }
        })
    }
    approveReservation(reservationId)
    {
        LibrarianService.approveReservation(reservationId, this.state.token).then(res => {
            if(res===undefined)
            {
                swal("Something went wrong", " Try again later","error")
            }
            else{
                swal("Reservation approved","","success")
            }
        })

    }
    viewBook(bookId)
    {
        StudentService.getBookDetails(bookId, this.state.token).then(res=>{
            if(res!==undefined)
            {
                console.log(res)
                swal(res.data.bookTitle,"Author: "+res.data.authors.join(", ")+"\nPublisher:  " +res.data.publisher+
                    "\n ISBN:  " +res.data.isbnNumber + "\n Available Copies:  "+res.data.availableCopies+"\n Language:  "+res.data.language+
                    "\n Pages:  " + res.data.noOfPages +"\nPublication Year:  " +res.data.publicationYear  )
            }
            else
            {
                swal("Something went wrong...","","error")
            }
        })
    }

    getReservations(){
        StudentService.getAllReservations(this.state.userId,this.state.token).then(res => {
            console.log("Fetching all reserved books....", res);
            if(res!==undefined)
            {
                this.setState({
                    reservationData:res.data,
                })
            }
        });
    }

    getIssues(){
        UserService.getIssueHistory(this.state.userId,this.state.token).then(res => {
            console.log("Fetching all issued books....", res);
            if(res!==undefined)
            {
                this.setState({
                    issueData:res.data,
                })
            }
        });
    }

    loadAllData(){
        this.getReservations()
        this.getIssues()
        this.getStudentDetails()
    }


    componentDidMount() {
        let token=localStorage.getItem("token")
        if(this.props.location.state===undefined) {
            console.log("did you justRefresh? ", localStorage.getItem("userId"))
            this.setState({
                userId:localStorage.getItem("userId")
            },()=>this.loadAllData())
        }
        else {
            console.log("first time on page", this.props.location.state.userId)
            localStorage.setItem("userId",this.props.location.state.userId)
            console.log("now from local:",localStorage.getItem("userId"))
            this.setState({
                userId:localStorage.getItem("userId"),
                token:token
            },()=>this.loadAllData())
        }
    }

    render() {
        return (
            <div>
                <LibNavbar/>
                <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
                <link rel="stylesheet"
                      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                      crossOrigin="anonymous"/>
                <div className="studentProfile">
                    <h1 className="display-8 text-center">
                        <span className="text-secondary">Student</span> Profile
                    </h1>
                    <h2>Details</h2>
                    <div className="card">
                        <div className="card-body">
                            <table>
                                <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{this.state.studentData.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>imdezcode@gmail.com</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>Bali, Indonesia</td>
                                </tr>
                                <tr>
                                    <td>Hobbies</td>
                                    <td>:</td>
                                    <td>Diving, Reading Book</td>
                                </tr>
                                <tr>
                                    <td>Job</td>
                                    <td>:</td>
                                    <td>Web Developer</td>
                                </tr>
                                <tr>
                                    <td>Skill</td>
                                    <td>:</td>
                                    <td>PHP, HTML, CSS, Java</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h2>Reservations</h2>
                    <div className="card2" style={{"display":this.state.reservationData.length===0?"block":"none"}}>No pending reservations</div>
                    {this.state.reservationData.map((book) => (
                    <div className="card2">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Reservation ID:</td>
                                        <td>{book.reservationId}</td>
                                        <td><a href="#" onClick={()=>this.viewBook(book.bookId)}>View Book</a></td>
                                    </tr>
                                    <tr>
                                        <td>Reservation Date:</td>
                                        <td>{this.convertDate(book.reservationDate)}</td>
                                        <td><a href="#" onClick={()=>this.approveReservation(book.reservationId)}>Approve Reservation</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    ))}

                    <h2>Issued Books</h2>
                    <div className="card2" style={{"display":this.state.issueData.length===0?"block":"none"}}>User has not issued any books</div>
                    {this.state.issueData.map((book) => (
                        <div className="card3">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Issue ID:</td>
                                        <td>{book.orderId}</td>
                                        <td><a href="#" onClick={()=>this.viewBook(book.bookId)}>View Book</a></td>
                                    </tr>
                                    <tr>
                                        <td>Due Date:</td>
                                        <td>{this.convertDate(book.dueDate)}</td>
                                    </tr>
                                    <tr>
                                        <td>Issue Date:</td>
                                        <td>{this.convertDate(book.issueDate)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default withRouter(StudentProfile);
