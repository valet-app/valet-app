# Valet App API Documentation

## Endpoints

### Employee Resources
Employees login to the app and setup garages and park cars.

#### `GET /api/empl` and `GET /api/empl?id=1`
Returns array of all employees, or one employee.  Sample data: 
````json
[
    {
        "id": 2,
        "company_id": 1,
        "username": null,
        "name": "AF Valet",
        "admin": false,
        "password": null,
        "isactive": false
    }
]
````

#### `PUT /api/empl?id=1`
Update Employee will return updated employee data.  Body to be as shown below.  Still need to add other employee fields.
```json
    { "isactive": "true" }
```

#### `POST /api/empl`
Add new employee.  Body to be as shown.  isActive defaults to false on the database, and it not included below.
```json
    {
        "company_id": "3",
        "username": "dm",
        "name": "dev",
        "admin": "false",
        "password": "node"
    }
```

### Car Resources
#### `GET /api/cars` and `GET /api/cars?id=1`
Returns array of all cars, or one car.  Sample data:
```json
[
    {
        "car_id": 2,
        "parkingspacetype_id": 1,
        "make": "Scion",
        "model": "xB",
        "licenseplate": "040tdmz",
        "valettag": null,
        "status_id": null,
        "parkingspace_id": null,
        "user_id": 1,
        "firstname": "Gran",
        "lastname": "Belhomme",
        "phone": "646-602-5395"
    }
]
```

#### `PUT /api/cars?id=10 `
Update Car Data.  Body to be:    
(Do we need to be able to edit the other fields in the cars table?)
```json
    {
        "status_id": "3",
        "employee_id": "5",      
        "parkingspace_id": "2"
    }
```

#### `POST /api/cars`
Add new Car.  Body to be:    

```json
    {
        "usercar_id": "3",
        "parkingspacetype_id": "1",
        "make": "McClaren",
        "model": "P1",
        "licenseplate": "567htgt",
        "valettag": "126"
    }
```

### Parking Garage & Parking Spot Resources
Available Parking Spaces:
#### `PUT /api/parkingspot/?lotid=1&typeid=3 `
- lotid = id from parkinglot table
- typeid = id from parkingspacetype table

Sample Returned Data:
```json
[
    {
        "id": 8,
        "parkinglot_id": 1,
        "parkingspacetype_id": 3,
        "location1": "Floor 2",
        "location2": "Section C",
        "location3": "110",
        "location4": "",
        "location5": ""
    },
    {
        "id": 9,
        "parkinglot_id": 1,
        "parkingspacetype_id": 3,
        "location1": "Floor 2",
        "location2": "Section c",
        "location3": "105",
        "location4": "",
        "location5": ""
    }
]
```









# Valet App Documentation

Summary of the app...

***

-- Set Valet Status, boolean column on Employee table called isactive
   PUT request to http://localhost:3001/api/empl/?id=1     (be sure to set employee id)
   BODY: { "isactive": "true" }

-- Get Company & Garage for employee
   GET request to http://localhost:3001/api/emplGarage?id=4    where id = employee id

-- Get all available parking spots for a given garage and parking space type (compact, regular, truck, etc.)
   GET request to http://localhost:3001/api/parkingspot/?lotid=1&typeid=3  where lotid = parkinglot_id and typeid = parkingspacetype_id

-- Change status of car
   PUT request to http://localhost:3001/api/cars?id=10    where id = car_id
   Body to be:  {
                   "status_id": "3",
                   "employee_id": "5",      
                   "parkingspace_id": "2"
                }

-- Add new employee
   POST request to http://localhost:3001/api/empl
   Body to be:  {
                    "company_id": "3",
                    "username": "dm",
                    "name": "dev",
                    "admin": "false",
                    "password": "node"
                }



-- Add new car
   POST request to http://localhost:3001/api/cars
   Body to be:  {
                    "usercar_id": "3",
                    "parkingspacetype_id": "1",
                    "make": "McClaren",
                    "model": "P1",
                    "licenseplate": "567htgt",
                    "valettag": "126"
                }





## Endpoints

#### Employee Resources


- **[<code>GET</code> /api/empl]**
- **[<code>GET</code> photos/search](https://github.com/500px/api-documentation/blob/master/endpoints/photo/GET_photos_search.md)**
- **[<code>GET</code> photos/:id](https://github.com/500px/api-documentation/blob/master/endpoints/photo/GET_photos_id.md)**
- **[<code>GET</code> photos/:id/comments](https://github.com/500px/api-documentation/blob/master/endpoints/photo/GET_photos_id_comments.md)**
- **[<code>GET</code> photos/:id/votes](https://github.com/500px/api-documentation/blob/master/endpoints/photo/GET_photos_id_votes.md)**
- **[<code>PUT</code> photos/:id](https://github.com/500px/api-documentation/blob/master/endpoints/photo/PUT_photos_id.md)**
- **[<code>POST</code> photos](https://github.com/500px/api-documentation/blob/master/endpoints/photo/POST_photos.md)**
- **[<code>POST</code> photos/upload](https://github.com/500px/api-documentation/blob/master/endpoints/photo/POST_photos_upload.md)**
- **[<code>POST</code> photos/:id/vote](https://github.com/500px/api-documentation/blob/master/endpoints/photo/POST_photos_id_vote.md)**
- **[<code>DELETE</code> photos/:id/vote](https://github.com/500px/api-documentation/blob/master/endpoints/photo/DELETE_photos_id_vote.md)**
- **[<code>POST</code> photos/:id/tags](https://github.com/500px/api-documentation/blob/master/endpoints/photo/POST_photos_id_tags.md)**
- **[<code>POST</code> photos/:id/comments](https://github.com/500px/api-documentation/blob/master/endpoints/photo/POST_photos_id_comments.md)**
- **[<code>POST</code> photos/:id/report](https://github.com/500px/api-documentation/blob/master/endpoints/photo/POST_photos_id_report.md)**
- **[<code>DELETE</code> photos/:id](https://github.com/500px/api-documentation/blob/master/endpoints/photo/DELETE_photos_id.md)**
- **[<code>DELETE</code> photos/:id/tags](https://github.com/500px/api-documentation/blob/master/endpoints/photo/DELETE_photos_id_tags.md)**

#### Upload Method

- **[<code>POST</codE> upload](https://github.com/500px/api-documentation/blob/master/endpoints/upload/POST_upload.md)**

#### User Resources

- **[<code>GET</code> users](https://github.com/500px/api-documentation/blob/master/endpoints/user/GET_users.md)**
- **[<code>GET</code> users/show](https://github.com/500px/api-documentation/blob/master/endpoints/user/GET_users_show.md)**
- **[<code>GET</code> users/:id/friends](https://github.com/500px/api-documentation/blob/master/endpoints/user/GET_users_id_friends.md)**
- **[<code>GET</code> users/:id/followers](https://github.com/500px/api-documentation/blob/master/endpoints/user/GET_users_id_followers.md)**
- **[<code>GET</code> users/search](https://github.com/500px/api-documentation/blob/master/endpoints/user/GET_users_search.md)**
- **[<code>POST</code> users/:id/friends](https://github.com/500px/api-documentation/blob/master/endpoints/user/POST_users_id_friends.md)**
- **[<code>DELETE</code> users/:id/friends](https://github.com/500px/api-documentation/blob/master/endpoints/user/DELETE_users_id_friends.md)**

#### Gallery Resources

- **[<code>GET</code> users/:user_id/galleries](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/GET_galleries.md)**
- **[<code>GET</code> users/:user_id/galleries/:id](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/GET_galleries_id.md)**
- **[<code>GET</code> users/:user_id/galleries/:id/items](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/GET_galleries_id_items.md)**
- **[<code>GET</code> users/:user_id/galleries/:id/share_url](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/GET_galleries_id.md)**
- **[<code>PUT</code> users/:user_id/galleries/:id](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/PUT_galleries_id.md)**
- **[<code>PUT</code> users/:user_id/galleries/:id/items](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/PUT_galleries_id_items.md)**
- **[<code>PUT</code> users/:user_id/galleries/reposition](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/PUT_galleries_reposition.md)**
- **[<code>POST</code> users/:user_id/galleries](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/POST_galleries.md)**
- **[<code>DELETE</code> users/:user_id/galleries/:id](https://github.com/500px/api-documentation/blob/master/endpoints/galleries/DELETE_galleries_id.md)**




## Authentication

- **[<code>POST</code> oauth/request_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_requesttoken.md)**
- **[<code>POST</code> oauth/authorize](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_authorize.md)**
- **[<code>POST</code> oauth/access_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_accesstoken.md)**
- **[Upload key](https://github.com/500px/api-documentation/blob/master/authentication/upload_key.md)**


