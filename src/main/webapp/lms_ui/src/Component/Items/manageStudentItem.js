import React from "react";
import swal from "sweetalert";
import LibrarianService from "../../Services/LibrarianService";
import {Link} from "react-router-dom";

class manageStudentItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isBlocked:true,
            accountStatus:this.props.accountStatus,
            userId: this.props.userId,
            token:"",

        }
        this.blockStudent=this.blockStudent.bind(this)
    }
    componentDidMount() {
        this.setState({
            token:localStorage.getItem("token")
        })
    }

    blockStudent(){
        if(this.state.accountStatus==="Active")
        {
            swal({title: "Block "+ this.props.name +" ?",text: "You can unblock this user later", icon: "warning", buttons: true, dangerMode: true,
            }).then((willBlock) => {
                if (willBlock) {

                    LibrarianService.blockStudent(this.state.token,this.props.userId).then(res => {
                        swal("Blocked", {icon: "success",});
                        this.setState({accountStatus:"Blocked"})
                    });

                }
            });
        }
        else{
            swal({title: "Unblock "+ this.props.name +" ?", text: "You can block this user later", icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    LibrarianService.unblockStudent(this.state.token,this.props.userId).then(res => {
                        swal("Unblocked", {icon: "success",});
                        this.setState({accountStatus:"Active"})
                    });
                }
            });

        }

    }

    render() {
        let membershipDateTime=this.props.accountCreationDate
        let membershipDate=new Date(membershipDateTime)
        membershipDate=membershipDate.getDate()+"/"+membershipDate.getMonth()+"/"+membershipDate.getFullYear()

        let lastLoginDateTime=this.props.lastLoginDateTime
        let lastLoginDate=new Date(lastLoginDateTime)
        lastLoginDate=lastLoginDate.getDate()+"/"+lastLoginDate.getMonth()+"/"+lastLoginDate.getFullYear()

        return (
            <div>
                <div className="card m-3 shadow p-3 bg-white rounded studentItemInner" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">Name: {this.props.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Email Address: {this.props.emailAddress}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">UserId: {this.props.userId}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Phone Number: {this.props.phoneNumber}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Member Since: {membershipDate}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Last Login: {lastLoginDate}</h6>
                        <Link to={{
                            pathname: "/StudentProfile",
                            state: { userId: this.props.userId }}} >
                            <a href="#" className="card-link mr-3">Details</a>
                        </Link>
                        <a href="#" className="card-link "  onClick={() => this.blockStudent()} >{(this.state.accountStatus==="Active")?"Block":"Unblock"}</a>

                    </div>
                </div>
            </div>
        );
    }
}


export default manageStudentItem;
