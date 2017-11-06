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

Parking Lot Status:
#### `GET /api/parkinglotstatus?lotid=1 `
- lotid = id from parkinglot table

Sample Returned Data:
```json
[
    {
        "company_id": 1,
        "companyname": "Amina Parking Company",
        "parkinglot_id": 1,
        "parkinglotname": "Garage 1",
        "parkinglotaddress": "123 Main St",
        "parkingspacetype_id": 2,
        "parkingspacetype": "Compact",
        "location1": "Floor 4",
        "location2": "Section D",
        "location3": "South Side",
        "location4": "Over There",
        "location5": "Space 016",
        "make": "Hummer",
        "model": "H3",
        "licenseplate": "489ayqw",
        "color": "Purple",
        "lastchange": "2017-11-04T02:53:42.025Z",
        "parkingstatus": "Incoming",
        "parkedby": "James"
    },
    {
        "company_id": 1,
        "companyname": "Amina Parking Company",
        "parkinglot_id": 1,
        "parkinglotname": "Garage 1",
        "parkinglotaddress": "123 Main St",
        "parkingspacetype_id": 1,
        "parkingspacetype": "Regular",
        "location1": "Floor 3",
        "location2": "Section D",
        "location3": "North Side",
        "location4": "Under That",
        "location5": "Space 011",
        "make": null,
        "model": null,
        "licenseplate": null,
        "color": null,
        "lastchange": null,
        "parkingstatus": null,
        "parkedby": null
    }
]
```