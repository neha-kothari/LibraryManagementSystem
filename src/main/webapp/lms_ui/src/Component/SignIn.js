import React, {Component} from "react";
import {withRouter, Link} from 'react-router-dom'
import UserService from "../Services/UserService";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getDetails = this.getDetails.bind(this)
    }

    //Maps state variables with inputs
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    //Checking if the user can be logged in
    async onSubmit(e) {
        e.preventDefault();

        let user = {
            emailAddress: this.state.email,
            password: this.state.password
        }

        UserService.loginUser(user).then(res => {
            if(res!==undefined)
            {
                let token = res.data.token;
                localStorage.setItem('token',res.data.token);
                this.getDetails(token)
            }
        });
    }

    //Gets user details from token, and redirects to Student dashboard or Librarian Dashboard
    getDetails(t){
        UserService.getUserDetails(t).then(res=>{
            if(res!==undefined)
            {
                localStorage.setItem('userData',JSON.stringify(res.data))

                if(res.data.userType==="Librarian")
                {
                    this.props.history.push("/LibraryDashboard")
                }
                else
                {
                    this.props.history.push("/StudentDashboard")
                }
            }
        });
    }

    //Redirects to Dashboard if Logout is not performed
    componentDidMount() {
        if(localStorage.getItem("userData")!==null)
        {
            let userDataObj=JSON.parse(localStorage.getItem("userData"))
            if(userDataObj["userType"]==="Librarian")
            {
                this.props.history.push("/LibraryDashboard")
            }
            else
            {
                this.props.history.push("/StudentDashboard")
            }
        }
    }

    render() {
        return (
            <div className="SignIn" >
                <div className="text-justify">
                    <meta charSet="UTF-8"/>
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
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                    </svg>
                                </span>
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
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-key" viewBox="0 0 16 16">
                                          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                                          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </span>
                                <input type="password"
                                       id="inputPassword"
                                       className="form-control"
                                       placeholder="Password"
                                       required="True"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <p>New User? <Link to="/SignUp"> Sign Up </Link></p>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmit}>Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignIn);




