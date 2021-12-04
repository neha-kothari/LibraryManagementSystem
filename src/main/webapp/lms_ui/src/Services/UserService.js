import axios from 'axios';
import swal from 'sweetalert';

const port = 8085; //change this according to own system
class UserService{

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
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
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

    getUserDetails(token)
    {
        return axios.get("http://localhost:8085/lms/v1/users/getdetails",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }

    getAllStudents(token)
    {
        return axios.get("http://localhost:8085/lms/v1/users/students",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }

    blockStudent(token,userId)
    {

    }
}
export default new UserService()   //exporting the object of this class
