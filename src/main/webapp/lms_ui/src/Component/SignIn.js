import React, {Component} from "react";

import {Link} from 'react-router-dom'

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        console.log("Handle change called")
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    handleClick(e) {
        e.preventDefault();

        let user = {
            emailAddress: this.state.email,
            password: this.state.password
        }
        console.log("HandleClick")
        console.log(user);
    }

    render() {

        return (
            <div className="SignIn" >
                <div className="text-justify">
                    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/sign-in/"/>
                    <h2 className="text-center">Library Management System</h2>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                          rel="stylesheet"
                          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                          crossOrigin="anonymous"/>
                    <div className="text-center ">
                        <form className="form-signin">
                            <img className="mb-4"
                                 src="data:image/png;base64,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"
                                 alt="" width="72"
                                 height="72"/>

                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <input
                                type="email"
                                name="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="Email address"
                                required="true"
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoFocus/>
                            <input type="password"
                                   id="inputPassword"
                                   className="form-control"
                                   placeholder="Password"
                                   required="True"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                            />
                            <div>
                                <p>New User? <Link to="/SignUp"> Sign Up </Link></p>
                            </div>

                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;




