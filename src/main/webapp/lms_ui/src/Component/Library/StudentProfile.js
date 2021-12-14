import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import LibNavbar from "./LibNavbar";
import StudentService from "../../Services/StudentService";
import swal from "sweetalert";
import LibrarianService from "../../Services/LibrarianService";
import UserService from "../../Services/UserService";

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            studentData: [],
            reservationData: [],
            reservationBooks: [],
            issueData: [],
            token: ""
        }

        this.computeColor = this.computeColor.bind(this)
        this.getReservations = this.getReservations.bind(this)
        this.viewBook = this.viewBook.bind(this)
        this.getIssues = this.getIssues.bind(this)
        this.approveReservation = this.approveReservation.bind(this)
        this.loadAllData = this.loadAllData.bind(this)
        this.convertDate = this.convertDate.bind(this)
        this.returnBook = this.returnBook.bind(this)
        this.viewFine = this.viewFine.bind(this)
        this.collectFine = this.collectFine.bind(this)
    }

    convertDate(dateTime) {
        let date = new Date(dateTime)
        date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return date
    }

    approveReservation(reservationId) {
        swal({
            title: "Approve reservation??",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willApprove) => {
            if (willApprove) {
                LibrarianService.approveReservation(reservationId, this.state.token).then(res => {
                    if (res === undefined) {
                        swal("Something went wrong", " Try again later", "error")
                    } else {
                        swal("Reservation approved", "", "success").then(window.location.reload())
                    }
                })

            }
        });
    }

    viewBook(bookId) {
        StudentService.getBookDetails(bookId, this.state.token).then(res => {
            if (res !== undefined) {
                console.log(res)
                swal(res.data.bookTitle, "Author: " + res.data.authors.join(", ") + "\nPublisher:  " + res.data.publisher +
                    "\n ISBN:  " + res.data.isbnNumber + "\n Available Copies:  " + res.data.availableCopies + "\n Language:  " + res.data.language +
                    "\n Pages:  " + res.data.noOfPages + "\nPublication Year:  " + res.data.publicationYear)
            } else {
                swal("Something went wrong...", "", "error")
            }
        })
    }

    returnBook(orderId, memberId, isLost) {
        let text = "Do you want to return this book?"
        let textResponse = "The book has been successfully returned"
        let textHeading = "Returned"

        if (isLost === 1) {
            text = "Do you want to log a lost book?"
            textResponse = "The book has been marked as lost"
            textHeading = "Updated"
        }
        swal({
            title: "Confirm?",
            text: text,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willReturn) => {
            if (willReturn) {
                let returnBookObj = {
                    orderId: orderId,
                    memberId: memberId,
                    lost: isLost
                }
                LibrarianService.returnBook(returnBookObj, this.state.token).then(res => {
                    if (res !== undefined && res.data.error===null) {
                        swal(textHeading, textResponse, "success")
                        console.log(res)
                        window.location.reload()
                    }
                    else
                    {
                        swal("Cannot be Returned","Please collect fine to return this book", "error")
                    }
                })
            }
        });
    }

    viewFine(orderId) {
        UserService.getFine(orderId, this.state.token).then(res => {
            if (res !== undefined) {
                swal("Fine", "Pending Fine:  " + res.data.fine)
            }
        })
    }

    collectFine(orderId, memberId) {

        let fine;
        UserService.getFine(orderId, this.state.token).then(res => {
            if (res !== undefined) {
                fine = res.data.fine
            }
        }).then(() => {
            if(fine===0)
            {
                swal("No payment required","User has no fine due")
            }
            else {
                swal({
                    title: "Collect Fine?",
                    text: "Action indicates that user has paid Rs" + fine,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willCollect) => {
                    if (willCollect) {
                        let fineObj = {
                            "orderId": orderId,
                            "memberId": memberId,
                            "fineAmount": fine,
                            "paymentMode": "UPI"
                        }

                        LibrarianService.collectFine(fineObj, this.state.token).then(res => {
                            if (res !== undefined) {
                                swal("Fine Collected")
                                window.location.reload()
                            }
                        })
                    }
                });

            }

        })
    }


    getReservations() {
        StudentService.getAllReservations(this.state.userId, this.state.token).then(res => {
            console.log("Fetching all reserved books....", res);
            if (res !== undefined) {
                this.setState({
                    reservationData: res.data,
                })
            }
        });
    }

    getIssues() {
        UserService.getIssueHistory(this.state.userId, this.state.token, 1).then(res => {
            console.log("Fetching all issued books....", res);
            if (res !== undefined) {
                this.setState({
                    issueData: res.data,
                })
            }
        });
    }

    getStudentDetails() {
        LibrarianService.getStudentDetails(this.state.userId, this.state.token).then(res => {
            if (res !== undefined) {
                console.log(res.data)
                this.setState({
                    studentData: res.data
                })
            }
        })
    }


    loadAllData() {
        this.getReservations()
        this.getIssues()
        this.getStudentDetails()
    }


    componentDidMount() {
        let token = localStorage.getItem("token")
        if (this.props.location.state === undefined) {
            this.setState({
                userId: localStorage.getItem("userId"),
                token: token
            }, () => this.loadAllData())
        } else {
            localStorage.setItem("userId", this.props.location.state.userId)
            this.setState({
                userId: localStorage.getItem("userId"),
                token: token
            }, () => this.loadAllData())
        }
    }

    computeColor(dateVal) {
        let color = "green"
        const today = new Date()
        const due = new Date(dateVal)
        if (today.getTime() > due.getTime()) {
            color = "red"
        }
        return color
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

                    {/******************Details******************/}
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
                                    <td>{this.state.studentData.emailAddress}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>:</td>
                                    <td>{this.state.studentData.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Member Since</td>
                                    <td>:</td>
                                    <td>{this.convertDate(this.state.studentData.accountCreationDate)}</td>
                                </tr>
                                <tr>
                                    <td>Last Log In</td>
                                    <td>:</td>
                                    <td>{this.convertDate(this.state.studentData.lastLoginDateTime)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/******************Reservations*****=*************/}

                    <h2>Reservations</h2>
                    <div className="card2"
                         style={{"display": this.state.reservationData.length === 0 ? "block" : "none"}}>No pending
                        reservations
                    </div>
                    {this.state.reservationData.map((book) => (
                        <div className="card2">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Reservation ID:</td>
                                        <td>{book.reservationId}</td>
                                        <td><a href="#" onClick={() => this.viewBook(book.bookId)}>View Book</a></td>
                                    </tr>
                                    <tr>
                                        <td>Reservation Date:</td>
                                        <td>{this.convertDate(book.reservationDate)}</td>
                                        <td><a href="#" onClick={() => this.approveReservation(book.reservationId)}>Approve
                                            Reservation</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    {/******************IssuedBooks*****=*************/}
                    <h2>Issued Books</h2>
                    <div className="card2"
                         style={{"display": this.state.issueData.length === 0 ? "block" : "none"}}>User has not issued
                        any books
                    </div>
                    {this.state.issueData.map((book) => (
                        <div className="card3">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Issue ID:</td>
                                        <td>{book.orderId}</td>
                                        <td><a href="#" onClick={() => this.viewBook(book.bookId)}>View Book</a></td>
                                        <td><a href="#" onClick={() => this.viewFine(book.orderId)}>View Fine</a></td>
                                    </tr>
                                    <tr>
                                        <td>Due Date:</td>
                                        <td style={{"color": this.computeColor(book.dueDate)}}>{this.convertDate(book.dueDate)}</td>
                                        <td><a href="#"
                                               onClick={() => this.returnBook(book.orderId, book.memberId, 0)}
                                               style={{"display": book.status === "Lost" ? "none" : "block"}}>
                                            Return Book
                                        </a></td>
                                        <td>
                                            <a href="#"
                                               onClick={() => this.collectFine(book.orderId, book.memberId)}>
                                                Collect Fine
                                            </a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>Issue Date:</td>
                                        <td>{this.convertDate(book.issueDate)}</td>
                                        <td>
                                            <a href="#"
                                               onClick={() => this.returnBook(book.orderId, book.memberId, 1)}
                                               style={{"display": book.status === "Lost" ? "none" : "block"}}>
                                                Report Lost
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Status:</td>
                                        <td style={{"color": book.status === "Lost" ? "red" : ""}}>{book.status}</td>
                                        <td>
                                        </td>
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
