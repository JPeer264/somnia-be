# Somnia API

## Authentication
### register
`Request Type: POST`
> /api/register

#### requirement
```
email: 'example@example.com'
```

#### returns
```
{
  "user": {
    "email": "example@example.com",
    "createdAt": "2016-05-21T10:14:04.867Z",
    "updatedAt": "2016-05-21T10:14:04.867Z",
    "id": "574034ec4bb5f9e40d050838"
  },
  "token": [token]
}
```

### login
`Request Type: POST`
> /api/login

#### requirement
```
email: 'example@example.com',
password: 'mySuperPassword'
```

#### returns
```
{
  "user": {
    "email": "example@example.com",
    "createdAt": "2016-05-21T10:14:04.867Z",
    "updatedAt": "2016-05-21T10:14:04.867Z",
    "id": "574034ec4bb5f9e40d050838"
  },
  "token": [token]
}
```

## Project
### create
`Request Type: POST`
> /api/project

Create a new Project for the currently logged in user (autogenerated password)

#### requirement
```
title: 'My First Project',
dueDate: 1463790502134,
token: [token]
```

#### returns
```
{
  "project": {
    "title": "My First Project",
    "dueDate": "2016-05-21T00:00:00.000Z",
    "owner": "573f9eb09e2c67bbe47feb87",
    "createdAt": "2016-05-21T09:46:12.777Z",
    "updatedAt": "2016-05-21T09:46:12.777Z",
    "id": "57402e644bb5f9e40d050837"
  }
}
```

### get
`Request Type: GET`
> /api/project/:projectId

get project from id

#### returns
```
{
  "project": {
    "milestones": [
          {
            "title": "My First Milestone",
            "dueDate": "2035-05-26T00:00:00.000Z",
            "project": "57403c45b3833cc825ea756f",
            "createdAt": "2016-05-21T10:48:48.643Z",
            "updatedAt": "2016-05-21T10:48:48.643Z",
            "id": "57403d10b4dcdca7263b20e1"
          },
          {
            "title": "My Second Milestone",
            "dueDate": "2035-05-26T00:00:00.000Z",
            "project": "57403c45b3833cc825ea756f",
            "createdAt": "2016-05-21T10:48:52.012Z",
            "updatedAt": "2016-05-21T10:48:52.012Z",
            "id": "57403d14b4dcdca7263b20e2"
          }
        ],
    "owner": "573f9eb09e2c67bbe47feb87",
    "title": "new new title",
    "dueDate": "2003-09-17T00:00:00.000Z",
    "createdAt": "2016-05-21T09:46:12.777Z",
    "updatedAt": "2016-05-21T09:46:19.179Z",
    "id": "57402e644bb5f9e40d050837",
    "done": true/false
  }
}
```

### update
`Request Type: PUT`
> /api/project/:projectId

#### requirement
only requires fields to update
```
title: 'My updated Project',
dueDate: 1003790502134,
token: [token]
```

#### returns
```
{
  "project": {
    "title": "new new title",
    "dueDate": "2003-09-17T00:00:00.000Z",
    "owner": "573f9eb09e2c67bbe47feb87",
    "createdAt": "2016-05-21T09:46:12.777Z",
    "updatedAt": "2016-05-21T10:21:02.755Z",
    "id": "57402e644bb5f9e40d050837"
  }
}
```

### delete
`Request Type: DELETE`
> /api/project/:projectId

#### requirement
```
token: [token]
```

#### returns
```
{
  "msg": "Project successfully destroyed"
}
```
