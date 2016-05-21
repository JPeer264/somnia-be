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

## Milestones
### create
`Request Type: POST`
> /api/project/:projectId/milestone

Create a new Milestone for the currently used project (Identfied with the third URL-Path-Parameter)

#### requirement
```
title: 'My First Milestone',
dueDate: 1463790502134,
token: [token]
```

#### returns
```
{
  "milestone": {
    "title": "My First Milestone",
    "dueDate": "2003-09-17T00:00:00.000Z",
    "owner": "57402abe6c965beec57b1654",
    "createdAt": "2016-05-21T10:46:45.501Z",
    "updatedAt": "2016-05-21T10:46:45.501Z",
    "id": "57403c95eb05dcfec62b55a3"
  }
}
```

### get
`Request Type: GET`
> /api/milestone/:id

get milestone from id

#### returns
```
{
  "milestone": {
    "owner": "57402abe6c965beec57b1654",
    "title": "My first change",
    "dueDate": "2003-09-17T00:00:00.000Z",
    "createdAt": "2016-05-21T10:36:43.596Z",
    "updatedAt": "2016-05-21T10:36:50.311Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NDAyYWJlNmM5NjViZWVjNTdiMTY1NCIsImlhdCI6MTQ2MzgyMzA3MywiZXhwIjoxNDYzODMzODczfQ.B2yEy_765ksrasZADTDtWMuCvluHF2z1WSyvBpRU_qU",
    "projectId": "57402aed6c965beec57b1655",
    "id": "57403a3b684ccebdc68b94e5"
  }
}
```

### update
`Request Type: PUT`
> /api/project/:projectId/milestone/:id

updates the milestone by id, project is here for checking if the user is the owner and allowed to change.

#### requirement
only requires fields to update
```
title: 'My updated Milestone',
dueDate: 1003790502134,
token: [token]
```

#### returns
```
{
  "milestone": {
    "title": "My updated change",
    "dueDate": "2003-09-17T00:00:00.000Z",
    "owner": "57402abe6c965beec57b1654",
    "createdAt": "2016-05-21T10:36:43.596Z",
    "updatedAt": "2016-05-21T10:52:20.201Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NDAyYWJlNmM5NjViZWVjNTdiMTY1NCIsImlhdCI6MTQ2MzgyMzA3MywiZXhwIjoxNDYzODMzODczfQ.B2yEy_765ksrasZADTDtWMuCvluHF2z1WSyvBpRU_qU",
    "projectId": "57402aed6c965beec57b1655",
    "id": "57403a3b684ccebdc68b94e5"
  }
}
```

### delete
`Request Type: DELETE`
> /api/project/:projectId/milestone/:id

#### requirement
```
token: [token]
```

#### returns
```
{
  "msg": "Milestone successfully destroyed"
}
```
