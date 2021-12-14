import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentService from "../../Services/StudentService";
import ReserveItem from "../Items/studentReservedBookItem"
import IssueItem from "../Items/studentIssuedBookItem"
import UserService from "../../Services/UserService";
import swal from "sweetalert";

class IssuedBooks extends Component {
    constructor() {
        super();
        this.state = {
            reservationData: [],
            issueData: [],
            oldIssueData: [],
            userId: "",
            token: "",
            isResEmpty: true,
            isIssueEmpty: true
        }
        this.loadData = this.loadData.bind(this)
        this.getIssues = this.getIssues.bind(this)
        this.getReservations = this.getReservations.bind(this)
        this.getOldIssues = this.getOldIssues.bind(this)
        this.convertDate = this.convertDate.bind(this)
        this.viewBook = this.viewBook.bind(this)

    }

    //Generate details of given book ID
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

    //Fetching reserved books
    getReservations() {
        StudentService.getAllReservations(this.state.userId, this.state.token).then(res => {
            console.log("Fetching all reserved books....", res);
            if (res !== undefined) {
                this.setState({
                    reservationData: res.data,
                })
            }
            if (res.data.length !== 0) {
                this.setState({isResEmpty: false})
            }
        });
    }

    //Fetching previously issued Books
    getOldIssues() {
        UserService.getIssueHistory(this.state.userId, this.state.token, 0).then(res => {
            console.log("Fetching all issued books....", res);
            if (res !== undefined) {
                this.setState({
                    oldIssueData: res.data,
                })
            }
        });

    }

    //Fetching issued Books
    getIssues() {
        UserService.getIssueHistory(this.state.userId, this.state.token, 1).then(res => {
            console.log("Fetching all issued books....", res);
            if (res !== undefined) {
                this.setState({
                    issueData: res.data,
                })
            }
            if (res.data.length !== 0) {
                this.setState({isIssueEmpty: false})
            }
        });
    }

    //Loading All data (reservations and issues)
    loadData() {
        this.getReservations()
        this.getIssues()
        this.getOldIssues()
    }

    convertDate(dateTime) {
        let date = new Date(dateTime)
        date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return date
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        let userData = localStorage.getItem("userData")
        let userId = JSON.parse(userData).userId

        this.setState({
            token: token,
            userId: userId
        }, () => this.loadData())
    }

    render() {

        return (
            <div>
                <StudentNavbar/>
                <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>

                {/*--------------Issued Books----------------*/}
                <div className="container mt-4">

                    {/*Heading*/}
                    <h1 className="display-8 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Issued</span> Books
                    </h1>

                    {/*Empty List*/}
                    <div style={{"display": this.state.isIssueEmpty ? "block" : "none"}}>
                        <br/><br/>
                        <h4 className="display-8 text-center border shadow p-3 mb-5 bg-white rounded">
                            No Issued Books Found..</h4>
                        <br/><br/><br/>
                    </div>

                    {/*Actual List*/}
                    <div className="bookItemContainer">
                        {this.state.issueData.map((item) => (
                            <IssueItem {...item} key={item.orderId}/>
                        ))}
                    </div>
                </div>

                {/*--------------Reserved Books----------------*/}
                <div className="container mt-4">

                    {/*Heading*/}
                    <h1 className="display-8 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Reserved</span> Books
                    </h1>

                    {/*Empty List*/}
                    <div style={{"display": this.state.isResEmpty ? "block" : "none"}}>
                        <br/><br/>
                        <h4 className="display-8 text-center border shadow p-3 mb-5 bg-white rounded">
                            No Reservations Found..</h4>
                        <br/><br/><br/>
                    </div>

                    {/*Actual List*/}
                    <div className="bookItemContainer">
                        {this.state.reservationData.map((item) => (
                            <ReserveItem {...item} key={item.bookId}/>
                        ))}
                    </div>
                </div>

                {/*--------------Previous Issues----------------*/}
                <div className="container mt-4">

                    {/*Heading*/}
                    <h1 className="display-8 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Previous</span> Issues
                    </h1>

                    {/*Empty List*/}
                    <div style={{"display": this.state.issueData.length === 0 ? "block" : "none"}}>
                        <br/><br/>
                        <h4 className="display-8 text-center border shadow p-3 mb-5 bg-white rounded">
                            No Previous Books Found..</h4>
                        <br/><br/><br/>
                    </div>

                    {/*Actual List*/}
                    <div className="issuedBooks container mt-4">
                        {this.state.oldIssueData.map((book) => (
                            <div className="card  border shadow p-3 mb-5 bg-white rounded" key={book.orderId}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Issue ID:</td>
                                        <td>{book.orderId}</td>
                                        <td><a href="#" onClick={() => this.viewBook(book.bookId)}>View Book</a></td>
                                    </tr>
                                    <tr>
                                        <td>Issue Date:</td>
                                        <td>{this.convertDate(book.issueDate)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        );
    }

}

export default withRouter(IssuedBooks);
