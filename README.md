

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

## Books API

### Add Book:

POST : http://localhost:8080/lms/v1/books/addbook

Request JSON :
`{
    "bookTitle":"nsw",
    "isbnNumber":"i213jjl",
    "publisher":"peng",
    "language":"english",
    "noOfPages":200,
    "authorIds":[2,3],
    "noOfCopies":4,
    "isReferenceOnly":false,
    "price":350,
    "status":"A",
    "dateOfPurchase":"2018-01-01",
    "publicationDate":"2017-05-05"
}`

Response if successful : `{ "bookId": 3 }`

Response if user unauthorized *403* : `{"data":"User not authorized"}`

### Remove Book

GET : http://localhost:8080/lms/v1/books/removebook/{book_id}

Response JSON if successful : `{ "data": "Book deleted Successfully" }`

### Add Book Item:

POST : http://localhost:8080/lms/v1/books/addbookitem

Request JSON :
`{
"bookId":1,
"isReferenceOnly":false,
"price":350,
"status":"A",
"dateOfPurchase":"2020-01-01",
"publicationDate":"2015-05-05"
}`

Response if successful : `{ "ItemId": 2 }`

Response if user unauthorized *403* : `{"data":"User not authorized"}`

### Remove Book Item

GET : http://localhost:8080/lms/v1/books/removebookitem/{book_item_id}

Response JSON if successful : `{ "data": "Book Item deleted Successfully" }`