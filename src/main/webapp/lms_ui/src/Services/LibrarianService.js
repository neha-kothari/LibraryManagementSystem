import axios from 'axios';
import swal from "sweetalert";

const port = 8085; //change this according to own system

class LibrarianService{

    getStudentDetails(studentId,token)
    {
        return axios.get("http://localhost:"+port+"/lms/v1/users/"+studentId+"/getdetails",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })

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
        return axios.post("http://localhost:"+port+"/lms/v1/users/"+userId+"/block",{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    unblockStudent(token,userId)
    {
        return axios.post("http://localhost:"+port+"/lms/v1/users/"+userId+"/unblock",{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    addBook(book,token)
    {
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

    deleteBook(bookId,token)
    {
        return axios.delete("http://localhost:"+port+"/lms/v1/books/"+bookId,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).catch(function (error) {
            swal("Error","error","error")
            console.log(error.config);
        });
    }



    editBook(book,token)
    {
        return axios.put("http://localhost:"+port+"/lms/v1/books",book,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    returnBook(returnBook,token)
    {
        // http://localhost:8080/lms/v1/return?memberId=6&orderId=1&lost=0
        return axios.post(" http://localhost:"+port+"/lms/v1/return?memberId="+returnBook.memberId+"&orderId="+returnBook.orderId+"&lost="+returnBook.lost,{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    approveReservation(reservationId, token)
    {
        return axios.post("http://localhost:" + port + "/lms/v1/reservations/approve/" + reservationId, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).catch(function (error) {
            if (error.response) {
                console.log("ERRROORRRRRRR---->",error.response);
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
        })
    }

    collectFine(fineObj,token)
    {
        // http://localhost:8080/lms/v1/return/collectfine
        // { "orderId":5, "memberId":6, "fineAmount":100, "paymentMode":"UPI" }
        return axios.post("http://localhost:"+port+"/lms/v1/return/collectfine",fineObj,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            swal("Error", "error");
            console.log(error.config);
        });
    }



}


export default new LibrarianService();
