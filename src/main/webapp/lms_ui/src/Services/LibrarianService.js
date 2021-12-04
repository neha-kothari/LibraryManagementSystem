import axios from 'axios';

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
}


export default new LibrarianService();
