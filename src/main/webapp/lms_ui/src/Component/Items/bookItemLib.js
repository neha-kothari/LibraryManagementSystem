import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import LibrarianService from "../../Services/LibrarianService";

class bookItemLib extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
        this.deleteBook=this.deleteBook.bind(this)
    }
    deleteBook(){
        console.log("delete", this.props.name);
        swal({
            title: "Delete "+ this.props.name +" ?",
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
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.bookTitle}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {this.props.authors.join(", ")}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Publisher: {this.props.publisher}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">ISBN: {this.props.isbnNumber} {this.props.bookId}</h6>

                        <Link to={{
                            pathname: "/EditBook",
                            state: { bookTitle: this.props.name }}} >
                            <a href="#" className="card-link">Edit</a>
                        </Link>
                        <a href="#" className="card-link m-3"  onClick={() => this.deleteBook()} >Delete</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default bookItemLib;
