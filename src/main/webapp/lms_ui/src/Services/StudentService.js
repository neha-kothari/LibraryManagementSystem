import axios from 'axios';
import swal from "sweetalert";

const port = 8085; //change this according to own system

class StudentService{
    reserveBook(bookID,token)
    {
        console.log("Reserving Book", bookID);
        return axios.post("http://localhost:"+port+"/lms/v1/reservations/"+bookID,{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response);
                if(error.response.status===400)
                    swal("Error", error.response.data.error, "error");
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


}
export default new StudentService;
