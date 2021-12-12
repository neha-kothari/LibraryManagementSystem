import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentService from "../../Services/StudentService";
import ReserveItem from "../Items/reservedBookItem"
import IssueItem from "../Items/issuedBookItem"
import UserService from "../../Services/UserService";

class IssuedBooks extends Component{
    constructor() {
        super();
        this.state={
            reservationData:[],
            issueData:[],
            userId:"",
            token:"",
            isResEmpty:true,
            isIssueEmpty:true
        }
        this.loadData=this.loadData.bind(this)
        this.getIssues=this.getIssues.bind(this)
        this.getReservations=this.getReservations.bind(this)
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
            if(res.data.length!==0)
            {
                this.setState({isResEmpty:false})
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
            if(res.data.length!==0)
            {
                this.setState({isIssueEmpty:false})
            }
        });
        
    }

    loadData()
    {
        this.getReservations()
        this.getIssues()
    }
    componentDidMount() {
        let token=localStorage.getItem("token")
        let userData=localStorage.getItem("userData")
        let userId=JSON.parse(userData).userId

        this.setState({
            token:token,
            userId:userId
        },()=>this.loadData())
    }

    render() {

        return (
            <div>
                <StudentNavbar/>
                <script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js"></script>
                <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
                <link rel="stylesheet"
                      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"/>
                <div className="container mt-4">
                    <h1 className="display-8 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Issued</span> Books
                    </h1>
                    <div  style={{"display":this.state.isIssueEmpty?"block":"none"}}>
                        <br/><br/>
                        <h4 className="display-8 text-center border shadow p-3 mb-5 bg-white rounded">
                            No Issued Books Found..</h4>
                        <br/><br/><br/>
                    </div>
                    <div className="bookItemContainer">
                        {this.state.issueData.map((item) => (
                            <IssueItem {...item} key={item.bookId} />
                        ))}
                    </div>
                </div>

                <div className="container mt-4">
                    <h1 className="display-8 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Reserved</span> Books
                    </h1>
                    <div  style={{"display":this.state.isResEmpty?"block":"none"}}>
                        <br/><br/>
                        <h4 className="display-8 text-center border shadow p-3 mb-5 bg-white rounded">
                            No Reservations Found..</h4>
                        <br/><br/><br/>
                    </div>
                    <div className="bookItemContainer">

                        {this.state.reservationData.map((item) => (
                            <ReserveItem {...item} key={item.bookId} />
                        ))}
                    </div>
                </div>
            </div>

        );
    }

}

export default withRouter(IssuedBooks);
