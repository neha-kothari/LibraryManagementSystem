import axios from 'axios';
import swal from 'sweetalert';

const port = 8085; //change this according to own system
class UserService{


    //API call to register new user
    createUser(user)
    {
        console.log("Creating user", user);

        return axios.post("http://localhost:"+port+"/registration",user).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response);
                if(error.response.status===400)
                    swal("Error", "Email already in use", "error");

                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                swal("Error", "error");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                swal("Error", "error");
            }
            console.log(error.config);
        });
    }

    //API call to login new user
    loginUser(user)
    {
        return axios.post("http://localhost:"+port+"/lms/v1/login",user).catch(function (error) {
            if (error.response) {
                console.log(error.response);
                if(error.response.status===403)
                    swal("Error", "Incorrect emailId or password", "error");

                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
                swal("Error", "error");
            } else {
                console.log('Error', error.message);
                swal("Error", "error");
            }
            console.log(error.config);
        });
    }

    //API call to Fetch details of currently logged in User using token returned
    getUserDetails(token)
    {
        return axios.get("http://localhost:8085/lms/v1/users/profile",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }

    //API call to
    getIssueHistory(userId,token,isActive)
    {
        //1-->active
        console.log("get issue details:",token)
        return axios.get("http://localhost:8085/lms/v1/users/"+userId+"/bookissues/"+isActive,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )

    }

    //API call to return outstanding fine of user on a particular issue
    getFine(orderId, token){
        return axios.get("http://localhost:8085/lms/v1/return/calculatefine/"+orderId,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }

    //API to return all books
    getAllBooks(token)
    {
        return axios.get("http://localhost:"+port+"/lms/v1/books",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }


}
export default new UserService()   //exporting the object of this class
