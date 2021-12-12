import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentService from "../../Services/StudentService";
import Item from "../Items/reservedBookItem"

class IssuedBooks extends Component{
    constructor() {
        super();
        this.state={
            allData:[]
        }
    }
    componentDidMount() {
        let token=localStorage.getItem("token")
        let userData=localStorage.getItem("userData")
        let userId=JSON.parse(userData).userId
        console.log(userId)
        StudentService.getAllReservations(1,token).then(res => {
            console.log("Fetching all reserved books....", res);
            if(res!==undefined)
            {
                this.setState({
                    allData:res.data,
                })
            }
            console.log(this.state.allData)
        });
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

                </div>

                <div className="container mt-4">
                    <h1 className="display-8 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Reserved</span> Books
                    </h1>
                    <div className="bookItemContainer">
                        {this.state.allData.map((item) => (
                            <Item {...item} key={item.bookId} />
                        ))}
                    </div>


                </div>
            </div>

        );
    }

}

export default withRouter(IssuedBooks);
