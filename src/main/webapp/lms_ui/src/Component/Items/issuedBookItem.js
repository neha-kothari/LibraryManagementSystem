import React from "react";
import StudentService from "../../Services/StudentService"

class issuedBookItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
        // this.issueBook=this.issueBook.bind(this)
    }


    render() {
        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded bookItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        {/*<h5 className="card-title">{this.props.bookTitle}</h5>*/}
                        {/*<h6 className="card-subtitle mb-2 text-muted">by {this.props.authors.join(", ")}</h6>*/}
                        <h6 className="card-subtitle mb-2 text-muted">Publisher: {this.props.bookId}</h6>
                        {/*<h6 className="card-subtitle mb-2 text-muted">ISBN: {this.props.isbnNumber} </h6>*/}
                        {/*<h6 className="card-subtitle mb-2 text-muted">Language: {this.props.language} </h6>*/}
                    </div>
                </div>
            </div>
        );
    }
}


export default issuedBookItem;
