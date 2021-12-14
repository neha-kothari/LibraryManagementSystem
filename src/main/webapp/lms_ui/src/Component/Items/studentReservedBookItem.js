import React from "react";
import StudentService from "../../Services/StudentService"
import swal from "sweetalert";

class studentReservedBookItem extends React.Component{
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


    //Getting all the details of book of given ID when component mounts
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

    //Displaying extra details of book
    bookDetailsPopUp(){
        swal(this.state.bookTitle,"Author: "+this.state.authors.join(", ")+"\nPublisher:  " +this.state.publisher+
            "\n ISBN:  " +this.state.isbnNumber + "\n Available Copies:  "+this.state.availableCopies+"\n Language:  "+this.state.language+
            "\n Pages:  " + this.state.noOfPages +"\nPublication Year:  " +this.state.publicationYear +"\nPublisher:  " +this.state.publisher )
    }

    //Cancelling reservation of book
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
                window.setTimeout(function() {
                    window.location.reload()
                }, 3000)
            }
        });
    }


    render() {
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h4 className="card-title"><b>{this.state.bookTitle}</b></h4>
                        <h6 className="card-subtitle mb-2 "><b>by </b>{this.state.authors.join(", ")}</h6>
                        <h6 className="card-subtitle mb-2 "><b>Publisher: </b>{this.props.bookId}</h6>
                        <h6 className="card-subtitle mb-2 "><b>ISBN: </b>{this.state.isbnNumber} </h6>
                        <h6 className="card-subtitle mb-2 "><b>Language: </b>{this.state.language} </h6>
                        <a href="#" className="card-link "  onClick={() => this.bookDetailsPopUp()} >Details</a>
                        <a href="#" className="card-link "  onClick={() => this.cancelReservation()} >Cancel Reservation</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default studentReservedBookItem;
