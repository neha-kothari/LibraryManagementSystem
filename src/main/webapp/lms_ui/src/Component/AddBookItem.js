import React, {Component} from "react";
import YearPicker from "react-year-picker";



class AddBookItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            copies: 0,
            isReferenceOnly : 0,
            price: 0,
            purchaseDate:"",
            publicationYear : ""

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
                        className="text-secondary">Add</span> Book Items</h1>

                    <form className="add-book-form">
                        <div className="add-book">
                            <label htmlFor="Number of Copies">Number of Copies</label>
                            <input type="number" id="copies" name = "copies" className="form-control" required="true" value={this.state.copies} onChange={this.handleChange} />
                        </div>
                        <div className="add-book">
                            <label htmlFor="Reference only">Is Reference Only</label>
                            <input type="number" id="isReferenceOnly" name = "isReferenceOnly" className="form-control" min="0" max="1" required="true" value={this.state.isReferenceOnly} onChange={this.handleChange} />
                        </div>

                        <div className="add-book">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" name="price" className="form-control" required="true" value={this.state.price} onChange={this.handleChange}/>
                        </div>
                        <div className="add-book">
                            <label htmlFor="purchaseDate">Date of Purchase</label>
                            <input type="date" id="purchaseDate" name="purchaseDate" className="form-control" required="true" value={this.state.purchaseDate} onChange={this.handleChange}/>
                        </div>
                        <div className="add-book">
                            <label htmlFor="publicationYear">Year of Publication</label>
                            <YearPicker id= "publicationYear" name="publicationYear" className="form-control-year" required="true" value={this.state.publicationYear} onChange={this.handleChange}  />
                        </div>
                        <div className="add-book">
                        <button type="submit"  className="btn btn-primary btn-block"> Add Book Items</button>
                        </div>
                    </form>

                </div>
                </body>
            </div>
        )
    }
}

export default AddBookItem
