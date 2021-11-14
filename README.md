

### Registration API:

POST : http://localhost:8080/registration

Request JSON : 
`{
"userType":"1",
"emailAddress":"abc@def.com",
"password":"12345",
"name":"Abc Def",
"phoneNumber":"9000012345"
}`

Response JSON if successful : `{'data':'Registered Successfully'
}`



### Login API :

POST : http://localhost:8080/lms/v1/login

Request JSON : `
{
"emailAddress":"abc@def.com",
"password":"12345"
}`

Response JSON if Successful returns **Authorization** token: `{
"name": "abc@def.com",
"token": "eyJhb...neAZY"
}`

### Get User Details API :
GET : http://localhost:8080/lms/v1/user/getdetails

Request : Add **Authorization** Token in Request Header
`"Authorization"="eyJhb...neAZY"`

Response JSON : `{
"userId": 1,
"emailAddress": "abc@def.com",
"userType": 1,
"accountStatus": "A",
"password": "",
"name": "Abc Def",
"phoneNumber": "9000012345",
"accountCreationDate": "2021-11-13T16:05:26.000+00:00",
"lastLoginDateTime": "2021-11-13T16:05:26.000+00:00"
}`