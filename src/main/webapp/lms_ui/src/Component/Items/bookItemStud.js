import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import StudentService from "../../Services/StudentService"

class bookItemStud extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
        this.reserveBook=this.reserveBook.bind(this)
    }

    reserveBook() {
        swal({
            title: "Reserve " + this.props.bookTitle + " ?",
            text: "You only have 5 total reservations",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let token = localStorage.getItem("token")
                let bookId = this.props.bookId;
                StudentService.reserveBook(bookId, token).then(res => {
                    if(res!==undefined)
                    {
                        console.log(res)
                        swal("Reserved " +this.props.bookTitle, {
                            icon: "success",
                        });
                    }

                });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.bookTitle}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {this.props.authors.join(", ")}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Publisher: {this.props.publisher}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">ISBN: {this.props.isbnNumber} </h6>
                        <h6 className="card-subtitle mb-2 " style={{color: this.props.availableCopies === 0 ? "#cf1232" : "green"}}>Available Copies: {this.props.availableCopies} </h6>
                        <Link to={{
                            pathname: "/Fake",
                            state: { bookTitle: this.props.name }}} >
                            <a href="#" className="card-link">View Details</a>
                        </Link>
                        <a href="#" className="card-link m-3" style={{display: this.props.availableCopies === 0 ? "none" : true}}  onClick={() => this.reserveBook()} >Reserve</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default bookItemStud;
