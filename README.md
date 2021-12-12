

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

## User APIs
### Get User Profile :
GET : http://localhost:8080/lms/v1/user/profile

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

### Reserve Book
POST : http://localhost:8080/lms/v1/reservations/{book_id}

Response JSON : `{ "reservationId": 3, "reservationStatus": "Reserved",
"reservationDate": "2021-12-10T17:02:00.097+00:00", "validityTill": "2021-12-12T17:02:00.097+00:00",
"memberId": 6, "bookItemId": 3, "bookId": 1, "error": null }`

## Common APIs
### Get User Details :
GET : http://localhost:8080/lms/v1/users/{user_id}/getdetails

Response JSON : `{
"userId": 1, "emailAddress": "abc@def.com", "userType": 1, "accountStatus": "A", "password": "",
"name": "Abc Def", "phoneNumber": "9000012345",
"accountCreationDate": "2021-11-13T16:05:26.000+00:00", "lastLoginDateTime": "2021-11-13T16:05:26.000+00:00"}`

### Calculate outstanding fine
GET : http://localhost:8080/lms/v1/users/{user_id}/calculatefine

Response JSON : `{"fine":120}`

### Get List of Current User Reservations
GET : http://localhost:8080/lms/v1/users/{user_id}/reservations

Response JSON : `[{
"reservationId": 1, "reservationStatus": "Reserved", 
"reservationDate": "2021-12-10T07:06:24.000+00:00", "validityTill": "2021-12-12T07:06:24.000+00:00",
"memberId": 6, "bookItemId": 1, "bookId": 1, "error": null},
{
"reservationId": 2, "reservationStatus": "Reserved",
"reservationDate": "2021-12-10T16:47:15.000+00:00", "validityTill": "2021-12-12T16:47:15.000+00:00",
"memberId": 6, "bookItemId": 2, "bookId": 1, "error": null}]`

### Get User Book Lending active/history
GET : http://localhost:8080/lms/v1/users/{user_id}/bookissues/{active}

`{active}` should be `1` for currently active issues, `0` for entire history 

Response JSON : `[{
"orderId": 1, "memberId": 6, "bookItemId": 3, "bookId": 1, "issuedByUserId": 7, "status": "Returned", "issueDate": null,
"dueDate": "2021-12-03T12:00:31.000+00:00", "returnDate": null, "fine": 0.0, "error": null },
{
"orderId": 2, "memberId": 6, "bookItemId": 4, "bookId": 1, "issuedByUserId": 7, "status": null, "issueDate": null, 
"dueDate": "2021-12-05T12:00:31.000+00:00", "returnDate": null, "fine": 0.0, "error": null }]`


## Librarian APIs
### Approve Reservation Request
POST : http://localhost:8080/lms/v1/reservations/approve/{reservation_id}

Response JSON : `{
"orderId": 6, "memberId": 6, "bookItemId": 3, "bookId": 1,
"issuedByUserId": 7, "status": "Borrowed",
"issueDate": "2021-12-10T17:02:20.059+00:00", "dueDate": "2021-12-17T17:02:20.059+00:00",
"returnDate": null, "fine": 0.0, "error": null }`

### Issue Book Directly
POST : http://localhost:8080/lms/v1/orders?memberId=6&bookItemId=4

Response : `{
"orderId": 7, "memberId": 6, "bookItemId": 4, "bookId": 1, "issuedByUserId": 7, "status": "Borrowed",
"issueDate": "2021-12-10T18:25:19.806+00:00", "dueDate": "2021-12-17T18:25:19.806+00:00",
"returnDate": null, "fine": 0.0, "error": null
}`

### Return Book 
POST : http://localhost:8080/lms/v1/return?memberId=6&orderId=1&lost=0

Response JSON :

On Success :
`{
"orderId": 6, "memberId": 6, "bookItemId": 3, "bookId": 1, "issuedByUserId": 7, "status": "Returned",
"issueDate": "2021-12-10T17:02:20.000+00:00", "dueDate": "2021-12-14T18:30:00.000+00:00", "returnDate": null,
"fine": 0.0, "error": null
}`

**Fine for this book > 0** : 
`{
"orderId": 6, "memberId": 6, "bookItemId": 3, "bookId": 0, "issuedByUserId": 0,
"status": "B", "issueDate": null, "dueDate": null, "returnDate": null, "fine": 100.0,
"error": "Member needs to pay outstanding fine for this book first"
}`

### Return Book Lost
POST : http://localhost:8080/lms/v1/return?memberId=6&orderId=1&lost=1

Response : `{
"orderId": 6, "memberId": 6, "bookItemId": 3, "bookId": 0, "issuedByUserId": 0, "status": "B",
"issueDate": null, "dueDate": null, "returnDate": null, "fine": 450.0,
"error": "Member needs to pay the fine for losing the book"
}`

### Collect Fine
POST : http://localhost:8080/lms/v1/return/collectfine

Request JSON : `{ "orderId":5, "memberId":6, "fineAmount":100, "paymentMode":"UPI" }`

Response JSON : `{"fineId":0,"status":"\u0000","fineAmount":100.0,"paymentMode":"UPI","transactionDate":null,"orderId":5,"memberId":6,"bookItemId":2,"error":null}`

