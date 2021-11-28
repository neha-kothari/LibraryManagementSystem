import React,{Component} from "react";
import {withRouter} from "react-router-dom";

class IssuedBooks extends Component{
    constructor() {
        super();
        this.state={

        }
    }

    render() {
        return (
            <div>
                <h1>No books issued</h1>
            </div>
        );
    }

}

export default withRouter(IssuedBooks);
