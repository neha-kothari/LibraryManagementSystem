import React,{Component} from "react"
import {Link} from "react-router-dom";


class LibNavbar extends Component{
    constructor() {
        super();
        this.state={

        }
    }

    render() {
        return (
            <div>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >

                    <a className="navbar-brand ml-9" href="#">LMS</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/LibraryDashboard">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </Link>

                            </li>
                            <li className="nav-item active">
                                <Link to="/RegisterBook">
                                    <a className="nav-link" href="#">Add Book <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>

                            <li className="nav-item active">
                                <Link to="/ManageBooks">
                                    <a className="nav-link" href="#">Manage Books <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/ManageStudents">
                                    <a className="nav-link" href="#">Manage Students <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
export default (LibNavbar)
