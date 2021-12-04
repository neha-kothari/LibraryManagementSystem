import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class bookItemStud extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
        this.reserveBook=this.reserveBook.bind(this)
    }

    reserveBook(){
        swal({
            title: "Reserve "+ this.props.name +" ?",
            text: "You only have 5 total reservations",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Reserved", {
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
                            pathname: "/Fake",
                            state: { bookTitle: this.props.name }}} >
                            <a href="#" className="card-link">View Details</a>
                        </Link>
                        <a href="#" className="card-link m-3"  onClick={() => this.reserveBook()} >Reserve</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default bookItemStud;
