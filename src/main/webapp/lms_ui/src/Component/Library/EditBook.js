import React,{Component} from "react";
import {withRouter} from 'react-router-dom';
import LibNavbar from "./LibNavbar";
import swal from "sweetalert";
import StudentService from "../../Services/StudentService";
import LibrarianService from "../../Services/LibrarianService";
import {validateEditBook} from "../validate";


class EditBook extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookId:"", //needs to be sent
            bookTitle: "",
            publisher: "",
            isbn: "",
            language: "",
            pages: 0,
            authors: [],
            publicationYear : 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeArray = this.handleChangeArray.bind(this)
        this.fillForm=this.fillForm.bind(this)
        this.submitChanges=this.submitChanges.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
    }

    submitChanges(e){

        let bookObj={
            bookId:this.state.bookId,
            bookTitle:this.state.bookTitle,
            isbnNumber:this.state.isbn,
            publisher:this.state.publisher,
            language:this.state.language,
            noOfPages:this.state.pages,
            publicationYear:this.state.publicationYear,
            authors:this.state.authors,
        }
        let payload = validateEditBook(bookObj)
        if(payload.success){
            swal({
                title: "Submit Changes?",
                text: "Once you submit, older details can not be revived.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willSave) => {
                if (willSave) {
                    let token = localStorage.getItem("token")
                    LibrarianService.editBook(bookObj,token).then((res)=>{
                        swal("Information Saved!", {
                            icon: "success",
                        });
                    })
                }
            });

        }
        else{
            let errorMsg=""
            if(payload.errors.name!==undefined)
                errorMsg+=payload.errors.name+"\n"
            swal("Incorrect Input",errorMsg,"error")
        }
    }

    componentDidMount() {
        if(this.props.location.state===undefined)
        {
            console.log("getting item....",localStorage.getItem("bookId"))
            this.setState({
                bookId:localStorage.getItem("bookId")
            },()=>this.fillForm())
        }
        else
        {
            console.log("setting item....:" ,this.props.location.state.bookDetails.bookId)
            localStorage.setItem("bookId",this.props.location.state.bookDetails.bookId)
            this.setState({
                bookId:localStorage.getItem("bookId")
            }, () => {
                this.fillForm();
            });
        }
    }
    fillForm(){
        let token=localStorage.getItem("token")
        console.log("filling")
        StudentService.getBookDetails(this.state.bookId,token).then(res=>{
            if(res!==undefined){
                console.log(res.data)
                this.setState({
                    bookTitle: res.data["bookTitle"],
                    publisher: res.data["publisher"],
                    isbn: res.data["isbnNumber"],
                    language: res.data["language"],
                    pages: res.data["noOfPages"],
                    authors: res.data["authors"],
                    publicationYear : res.data["publicationYear"]
                })

            }
        })
    }
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    handleChangeArray(i, event) {
        let authors = [...this.state.authors];
        authors[i] = event.target.value;
        this.setState({ authors });
    }
    createUI(){
        return this.state.authors.map((el, i) =>
            <div key={i} className={"addBookContainer"}>
                <input type="text"  className="form-control authorName" value={el||''} onChange={this.handleChangeArray.bind(this, i)} />
                <input type='button' className="removeAuth" value='remove' onClick={this.removeClick.bind(this, i)}/>
                <p></p>
            </div>
        )
    }
    addClick(){
        this.setState(prevState => ({ authors: [...prevState.authors, '']}))
    }
    removeClick(i){
        let authors = [...this.state.authors];
        authors.splice(i,1);
        this.setState({ authors });
    }



    render() {
        return (
            <div>
                <LibNavbar/>
                <head>
                    <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
                    <link rel="stylesheet"
                          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                          crossOrigin="anonymous"/>
                </head>
                <body>
                <div className="container mt-4">
                    <h1 className="display-4 text-center"><i className="fas fa-book-open text-primary"></i> <span
                        className="text-secondary">Edit</span> Book</h1>

                    <form id="register-book-form">
                        <div className="register-book">
                            <label htmlFor="title">Book Title</label>
                            <input type="text" id="bookTitle" name = "bookTitle" className="form-control" required="true" value={this.state.bookTitle} onChange={this.handleChange} />
                        </div>
                        <br/>
                        <div className="register-book">
                            <label htmlFor="author">Publisher</label>
                            <input type="text" id="publisher" name="publisher" className="form-control " required="true" value={this.state.publisher} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <div className="register-book-set4">
                            <label htmlFor="title">ISBN#</label>
                            <label htmlFor="publicationYear">Year of Publication</label>
                            <input type="text" id="isbn" name="isbn" className="form-control addIsbn" required="true" value={this.state.isbn} onChange={this.handleChange}/>
                            <input type="number" id="publicationYear" name="publicationYear" className="form-control addPublication" required="true" min="1000" max="9999" value={this.state.publicationYear} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <div className="register-book-set">
                            <label htmlFor="title">Language</label>
                            <label htmlFor="title">Number of Pages</label>
                            <input type="text" id="language" name="language" className="form-control addIsbn" required="true" value={this.state.language} onChange={this.handleChange}/>
                            <input type="number" id="pages" name="pages" className="form-control addPages" required="true" value={this.state.pages} onChange={this.handleChange}/>
                        </div>
                        <div className="register-book">
                            <br/>
                            <label htmlFor="title">Authors</label>
                            {this.createUI()}
                            <input type='button' value='Add more authors' onClick={this.addClick.bind(this)}/>
                            {/*<input type="submit" value="Submit" />*/}
                        </div>
                        <br/>
                        <div className="register-book-set4">

                        <div className="register-book mb-3">
                            <button type="button"  className="btn btn-primary btn-block" onClick={()=>this.submitChanges()}> Save</button>
                        </div>
                        <div className="register-book">
                            <button type="button"  className="btn btn-primary btn-block" onClick={()=>this.fillForm()}> Reset</button>
                        </div>
                        </div>
                    </form>

                </div>
                </body>
            </div>
        );
    }
}

export default withRouter(EditBook)
