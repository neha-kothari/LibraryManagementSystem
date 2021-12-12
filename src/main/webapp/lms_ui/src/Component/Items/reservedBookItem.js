import React from "react";
import StudentService from "../../Services/StudentService"
import swal from "sweetalert";

class reservedBookItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookId:this.props.bookId,
            reservationId:this.props.reservationId,
            bookItemId:this.props.bookItemId,
            bookTitle:"",
            authors:[],
            availableCopies: 0,
            isbnNumber: "",
            language: "",
            noOfPages: 0,
            publicationYear: 0,
            publisher: ""
        }
        this.cancelReservation=this.cancelReservation.bind(this)
        this.bookDetailsPopUp=this.bookDetailsPopUp.bind(this)
    }



    componentDidMount() {
        let token = localStorage.getItem("token")
        let bookList;
        StudentService.getBookDetails(this.state.bookId, token).then(res => {
            if(res!==undefined)
            {
                bookList=res.data
                this.setState({
                    bookTitle:bookList.bookTitle,
                    authors:bookList.authors,
                    availableCopies: bookList.availableCopies,
                    isbnNumber: bookList.isbnNumber,
                    language: bookList.language,
                    noOfPages: bookList.noOfPages,
                    publicationYear: bookList.publicationYear,
                    publisher: bookList.publisher
                })
            }
        });
    }
    bookDetailsPopUp(){
        swal(this.state.bookTitle,"Author: "+this.state.authors.join(", ")+"\nPublisher:  " +this.state.publisher+
            "\n ISBN:  " +this.state.isbnNumber + "\n Available Copies:  "+this.state.availableCopies+"\n Language:  "+this.state.language+
            "\n Pages:  " + this.state.noOfPages +"\nPublication Year:  " +this.state.publicationYear +"\nPublisher:  " +this.state.publisher )
    }


    cancelReservation() {
        swal({
            title: "Cancel Reservation" ,
            text: "Do you want to cancel your reservation of "+this.state.bookTitle+"?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let token = localStorage.getItem("token")
                StudentService.deleteReservation(this.state.reservationId, token)
            }
        });
    }


    render() {
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.bookTitle}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {this.state.authors.join(", ")}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Publisher: {this.props.bookId}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">ISBN: {this.state.isbnNumber} </h6>
                        <h6 className="card-subtitle mb-2 text-muted">Language: {this.state.language} </h6>
                        <a href="#" className="card-link "  onClick={() => this.bookDetailsPopUp()} >Details</a>
                        <a href="#" className="card-link "  onClick={() => this.cancelReservation()} >Cancel Reservation</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default reservedBookItem;
