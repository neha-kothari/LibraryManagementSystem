import React, {Component} from "react";

import {Link, withRouter} from 'react-router-dom'

class RegisterBook extends Component{
    constructor(props) {
        super(props);

        this.state = {
            bookTitle: "",
            publisher: "",
            isbn: "",
            language: "",
            pages: 0,
            authors: [""]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeArray = this.handleChangeArray.bind(this)
    }
    handleChange(event) {
        console.log("Handle change called")
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
        console.log(this.state)
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
        return(
            <div>

                <head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=divice-width, initial-scale=1.0"/>
                    <meta http-equive="X-UA-Compatible" content="ie-edge"/>
                    <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
                    <link rel="stylesheet"
                          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                          crossOrigin="anonymous"/>
                    <title>Add Books</title>
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
                            <input type="text" id="publisher" name="publisher" className="form-control" required="true" value={this.state.publisher} onChange={this.handleChange}/>
                        </div>
                        <div className="register-book">
                            <label htmlFor="title">ISBN#</label>
                            <input type="text" id="isbn" name="isbn" className="form-control" required="true" value={this.state.isbn} onChange={this.handleChange}/>
                        </div>
                        <div className="register-book">
                            <label htmlFor="title">Language</label>
                            <input type="text" id="language" name="language" className="form-control" required="true" value={this.state.language} onChange={this.handleChange}/>
                        </div>
                        <div className="register-book">
                            <label htmlFor="title">Number of Pages</label>
                            <input type="number" id="pages" name="pages" className="form-control" required="true" value={this.state.pages} onChange={this.handleChange}/>
                        </div>
                        <div className="register-book">
                            <label htmlFor="title">Authors</label>
                            {this.createUI()}
                            <input type='button' value='Add more authors' onClick={this.addClick.bind(this)}/>
                            {/*<input type="submit" value="Submit" />*/}
                        </div>
                        <br/>
                        <input type="submit" value="Add Book Items" className="btn btn-primary btn-block"/>
                    </form>

                </div>
                </body>
            </div>
        )
    }
}

export default withRouter(RegisterBook)
