import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Item from "../Items/bookItemStud";
import Fuse from "fuse.js";
import StudentNavbar from "./StudentNavbar";
import LibrarianService from "../../Services/LibrarianService";


class ReserveBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            allData:[],
            searchData:[],
            noResults:"none"
        }
        this.searchItem = this.searchItem.bind(this)
    }
    componentDidMount() {

        let token=localStorage.getItem("token")
        LibrarianService.getAllBooks(token).then(res => {
            console.log("Fetching all books....", res);
            if(res!==undefined)
            {
                this.setState({
                    allData:res.data,
                    searchData:res.data
                })
            }
            console.log(this.state.allData)
        });
    }

    searchItem = (query) => {
        if(query===""){
            this.setState({searchData: this.state.allData})
        }
        else{
            const fuse = new Fuse(this.state.allData, {
                keys: ["bookTitle", "authors","isbnNumber"]
            });
            const result = fuse.search(query);
            const finalResult = [];
            if (result.length) {
                result.forEach((item) => {
                    finalResult.push(item.item);
                });
                this.setState({searchData: finalResult, noResults: "none"})
            } else {
                this.setState({searchData: this.state.allData, noResults:"inline"})
            }
        }
    };

    render() {
        return (
            <div>
                <StudentNavbar/>

                <script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js"></script>
                <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
                <link rel="stylesheet"
                      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                      crossOrigin="anonymous"/>
                <div className="container mt-4">
                    <h1 className="display-4 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Reserve</span> Books
                    </h1>
                    <br/><br/>
                    <div className="search-container">
                        <input
                            className="form-control m-3 mr-5"
                            type="search"
                            onChange={(e) => this.searchItem(e.target.value)}
                            placeholder="Search Book"
                        />
                    </div>
                    <p style={{display:this.state.noResults}}>No Results found.... Displaying all books </p>
                    <div className="bookItemContainer">
                        {this.state.searchData.map((item) => (
                            <Item {...item} key={item.name} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(ReserveBooks)
