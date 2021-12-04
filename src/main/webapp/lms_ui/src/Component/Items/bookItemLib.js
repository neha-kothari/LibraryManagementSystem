import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";

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
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Deleted", {
                        icon: "success",
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.tags.join(", ")}</h6>
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
