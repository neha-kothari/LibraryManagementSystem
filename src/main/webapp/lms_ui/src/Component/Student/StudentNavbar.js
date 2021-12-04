import React,{Component} from "react"
import {Link} from "react-router-dom";
import swal from "sweetalert";


class StudentNavbar extends Component{
    constructor() {
        super();
        this.state={

        }
        this.logOut=this.logOut.bind(this)

    }

    logOut(e){
        console.log("logout called")
        swal("Log out successful", {
            icon: "success",
        });
    }

    render() {
        return (
            <div>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                    <p className="navbar-brand ml-9" >LMS</p>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/StudentDashboard">
                                    <p className="nav-link" >Home <span className="sr-only">(current)</span></p>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/ReserveBooks">
                                    <p className="nav-link" >Reserve Books <span className="sr-only">(current)</span></p>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/IssuedBooks">
                                    <p className="nav-link" >Issued Books <span className="sr-only">(current)</span></p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link disabled" >Disabled</p>
                            </li>
                        </ul>
                    </div>
                    <Link to="/">
                    <a className="nav-link float-right text-light" onClick={this.logOut} >LOGOUT <span className="sr-only">(current)</span></a>
                    </Link>
                </nav>
            </div>
        );
    }
}
export default (StudentNavbar)
