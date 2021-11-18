import React,{Component} from "react";
import {Link} from 'react-router-dom';

class SignUp extends Component{
    constructor() {
        super();
        this.state={

        }
        this.handleChange();
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
        return (
            <div className="SignUp">

            </div>
        );
    }
}

export default SignUp;
