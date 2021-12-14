import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import LibNavbar from "./LibNavbar";
import LibrarianService from "../../Services/LibrarianService";
import swal from "sweetalert";
import {validateRegisterBook} from "../validate";

class RegisterBook extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bookTitle: "",
            publisher: "",
            isbn: "",
            language: "",
            pages: 0,
            authors: [""],
            copies: 0,
            isReferenceOnly : true,
            price: 0,
            purchaseDate:"",
            publicationYear : 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeArray = this.handleChangeArray.bind(this)
        this.addBook = this.addBook.bind(this)
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

    addBook(e){
        e.preventDefault()
        console.log("....")
        let book={
            "bookTitle":this.state.bookTitle,
            "isbnNumber":this.state.isbn,
            "publisher":this.state.publisher,
            "language":this.state.language,
            "noOfPages":this.state.pages,
            "noOfCopies":this.state.copies,
            "isReferenceOnly":this.state.isReferenceOnly,
            "price":this.state.price,
            "dateOfPurchase":this.state.purchaseDate,
            "publicationYear":this.state.publicationYear,
            "authors":this.state.authors
        }

        let payload = validateRegisterBook(book);
        if(payload.success) {
            let token=localStorage.getItem("token")
            LibrarianService.addBook(book,token).then(res => {
                console.log(res)
                if(res!==undefined )
                {
                    swal("Successful","New Book Added", "success")
                    window.setTimeout(function() {
                        window.location.reload()
                    }, 3000)

                }
            });
        }
        else {
            let errorMsg=""
            if(payload.errors.name!==undefined)
                errorMsg+=payload.errors.name+"\n"
            swal("Incorrect Input",errorMsg,"error")
        }

    }

    render() {
        return(
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
                        className="text-secondary">Register</span> Books</h1>

                    <form id="register-book-form">
                        <div className="register-book">
                            <label htmlFor="title">Book Title</label>
                            <input type="text" id="bookTitle" name = "bookTitle" className="form-control" required="true" value={this.state.bookTitle} onChange={this.handleChange} />
                        </div>
                        <div className="register-book">
                            <label htmlFor="author">Publisher</label>
                            <input type="text" id="publisher" name="publisher" className="form-control " required="true" value={this.state.publisher} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <div className="register-book-set4">
                            <label htmlFor="title">ISBN#</label>
                            <label htmlFor="price">Price</label>
                            <input type="text" id="isbn" name="isbn" className="form-control addIsbn" required="true" value={this.state.isbn} onChange={this.handleChange}/>
                            <input type="number" id="price" name="price" className="form-control addPrice" required="true" value={this.state.price} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <div className="register-book-set">
                            <label htmlFor="title">Language</label>
                            <label htmlFor="title">Number of Pages</label>
                            <input type="text" id="language" name="language" className="form-control addIsbn" required="true" value={this.state.language} onChange={this.handleChange}/>
                            <input type="number" id="pages" name="pages" className="form-control addPages" required="true" value={this.state.pages} onChange={this.handleChange}/>
                        </div>
                        <br/>

                        <div className="register-book-set2">
                            <label htmlFor="Number of Copies">Number of Copies</label>
                            <label htmlFor="Reference only">Is Reference Only</label>
                            <input type="number" id="copies" name = "copies" className="form-control addCopies" required="true" value={this.state.copies} onChange={this.handleChange} />
                            <select className="form-control" id="exampleFormControlSelect1" name="isReferenceOnly" id="isReferenceOnly" onClick={this.handleChange}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            {/*<input type="number" id="isReferenceOnly" name = "isReferenceOnly" className="form-control addReference" min="0" max="1" required="true" value={this.state.isReferenceOnly} onChange={this.handleChange} />*/}
                        </div>

                        <br/>

                        <div className="register-book-set3">
                            <label htmlFor="purchaseDate">Date of Purchase</label>
                            <label htmlFor="publicationYear">Year of Publication</label>
                            <input type="date" id="purchaseDate" name="purchaseDate" className="form-control addPurchase" required="true" value={this.state.purchaseDate} onChange={this.handleChange}/>
                            <input type="number" id="publicationYear" name="publicationYear" className="form-control addPublication" required="true" min="1000" max="9999" value={this.state.publicationYear} onChange={this.handleChange}/>
                        </div>

                        <div className="register-book">
                            <br/>
                            <label htmlFor="title">Authors</label>
                            {this.createUI()}
                            <input type='button' value='Add more authors' onClick={this.addClick.bind(this)}/>
                            {/*<input type="submit" value="Submit" />*/}
                        </div>
                        <br/>
                        <div className="register-book">
                            <button type="submit"  className="btn btn-primary btn-block" onClick={this.addBook}> Add Book</button>
                        </div>
                        <br/>
                    </form>

                </div>
                </body>
            </div>
        )
    }
}

export default withRouter(RegisterBook)
