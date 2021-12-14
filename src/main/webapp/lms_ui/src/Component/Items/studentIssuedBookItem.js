import React from "react";
import StudentService from "../../Services/StudentService"
import UserService from "../../Services/UserService";
import swal from "sweetalert";

class studentIssuedBookItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            token:"",
            orderId:this.props.orderId,
            bookId:this.props.bookId,
            issueDate:this.props.issueDate,
            dueDate:this.props.dueDate,
            bookTitle:"",
            authors:[],
            availableCopies: 0,
            isbnNumber: "",
            language: "",
            noOfPages: 0,
            publicationYear: 0,
            publisher: "",
            status:this.props.status
        }
        this.getBookDetails=this.getBookDetails.bind(this)
        this.convertDate=this.convertDate.bind(this)
        this.checkFine=this.checkFine.bind(this)

    }

    checkFine(){
        UserService.getFine(this.state.orderId,this.state.token).then(res=>{
            if(res!==undefined)
            {
                swal("Fine Generated: Rs."+res.data.fine)
            }
            else {
                swal("Error","Please check again later","error")
            }
        })
    }

    getBookDetails(){
        let bookList;
        StudentService.getBookDetails(this.state.bookId, this.state.token).then(res => {
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
                    publisher: bookList.publisher,
                })
            }
        });
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        this.setState({token:token},()=>this.getBookDetails())
    }

    convertDate(dateTime)
    {
        let date=new Date(dateTime)
        date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        return date
    }


    render() {
        let color="green"
        const today = new Date()
        const due = new Date(this.state.dueDate)
        if (today.getTime() > due.getTime()) {
            color="red"
        }

        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h4 className="card-title"><b>{this.state.bookTitle}</b></h4>
                        <h6 className="card-subtitle mb-2 "><b>by </b>{this.state.authors.join(", ")}</h6>
                        <h6 className="card-subtitle mb-2 "><b>Publisher:</b> {this.state.publisher}</h6>
                        <h6 className="card-subtitle mb-2 "><b>ISBN:</b> {this.state.isbnNumber} </h6>
                        <h6 className="card-subtitle mb-2 "><b>Language:</b> {this.state.language} </h6>
                        <h6 className="card-subtitle mb-2 "><b>Status:</b> {this.state.status} </h6>
                        <h6 className="card-subtitle mb-2 " ><b>Issue Date:</b> {this.convertDate(this.state.issueDate)} </h6>
                        <h6 className="card-subtitle mb-2" style={{color:color}}><b>Due Date:</b> {this.convertDate(this.state.dueDate)} </h6>
                        {/*<a href="#" className="card-link" onClick={() => this.checkFine()}>Check Fine</a>*/}

                    </div>
                </div>
            </div>
        );
    }
}


export default studentIssuedBookItem;
