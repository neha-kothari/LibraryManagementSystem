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
                console.log(error.request);
                swal("Error", "error");
            } else {
                console.log('Error', error.message);
                swal("Error", "error");
            }
            console.log(error.config);
        });
    }

    deleteReservation(reservationId,token)
    {
        console.log("Deleting Reservation",reservationId)
        axios.delete("http://localhost:"+port+"/lms/v1/reservations/"+reservationId,{headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }}).then(function (res){
                if(res.status===202)
                {
                    swal("Success","Registration has been successfully removed","success")
                }
        })
            .catch(function (error) {
            if (error.response) {
                if(error.response.status===400)
                    swal("Error", error.response.data.error, "error");
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

    getAllReservations(userId,token)
    {
        console.log("get all reservations")
        return axios.get("http://localhost:"+port+"/lms/v1/users/"+userId+"/reservations",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }

    getBookDetails(bookId, token)
    {
        console.log("getting book of Id "+bookId)
        return axios.get("http://localhost:"+port+"/lms/v1/books/"+bookId,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }

    calculateFine(studentId,token)
    {
        return axios.get("http://localhost:"+port+"/lms/v1/users/"+studentId+"/calculatefine",  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }
        )
    }


}
export default new StudentService;
