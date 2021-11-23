import React, {Component} from "react";

import {Link} from 'react-router-dom'

class RegisterBook extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        console.log("Handle change called")
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
        console.log(this.state)
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
                        className="text-secondary">Add</span> Books</h1>

                    <form id="book-form">
                        <div className="form-group">
                            <label htmlFor="title">Book Title</label>
                            <input type="text" id="booktitle" name = "booktitle" className="form-control" required="true" value={this.state.booktitle} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Publisher</label>
                            <input type="text" id="publisher" name="publisher" className="form-control" required="true" value={this.state.publisher} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">ISBN#</label>
                            <input type="text" id="isbn" name="isbn" className="form-control" required="true" value={this.state.isbn} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Language</label>
                            <input type="text" id="language" name="language" className="form-control" required="true" value={this.state.language} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Number of Pages</label>
                            <input type="number" id="pages" name="pages" className="form-control" required="true" value={this.state.pages} onChange={this.handleChange}/>
                        </div>
                        <input type="submit" value="Add Book Items" className="btn btn-primary btn-block"/>
                    </form>

                </div>
                </body>
            </div>
        )
    }
}

export default RegisterBook
