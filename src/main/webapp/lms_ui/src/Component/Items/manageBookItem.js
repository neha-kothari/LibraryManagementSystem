import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import LibrarianService from "../../Services/LibrarianService";

class manageBookItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
        this.deleteBook=this.deleteBook.bind(this)
    }
    deleteBook(){
        console.log("delete", this.props.bookTitle);
        swal({
            title: "Delete "+ this.props.bookTitle +" ?",
            text: "Once deleted, you will not be able to recover this record",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let token=localStorage.getItem("token")
                let bookId=this.props.bookId;
                LibrarianService.deleteBook(bookId,token).then(res => {
                    swal("Deleted", {
                        icon: "success",
                    });
                });
            }
        });
    }

    render() {
        let bookDetails=this.props
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.bookTitle}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {this.props.authors.join(", ")}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Publisher: {this.props.publisher}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">ISBN: {this.props.isbnNumber} </h6>
                        <Link to={{
                            pathname: "/EditBook",
                            state: { bookDetails: bookDetails }}} >
                            <a href="#" className="card-link">Edit</a>
                        </Link>
                        <a href="#" className="card-link m-3"  onClick={() => this.deleteBook()} >Delete</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default manageBookItem;
