import axios from 'axios';
import swal from "sweetalert";

const port = 8085; //change this according to own system

class LibrarianService{
    getAllStudents(token)
    {
        console.log("get student details:",token)
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
        console.log(token,userId)
        return axios.post("http://localhost:"+port+"/lms/v1/users/"+userId+"/block",{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    unblockStudent(token,userId)
    {
        console.log(token,userId)
        return axios.post("http://localhost:"+port+"/lms/v1/users/"+userId+"/unblock",{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    addBook(book,token)
    {
        console.log("Adding Book", book);
        return axios.post("http://localhost:"+port+"/lms/v1/books",book,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response);
                if(error.response.status===400)
                    swal("Error", "ISBN is already used", "error");
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


export default new LibrarianService();
