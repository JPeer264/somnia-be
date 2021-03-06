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

### registerAll
`Request Type: POST`
> /api/registerAll

#### requirement
```
user: {
	"email": "simon@example.com",

	"project": {
		"title": "My Life Goal",
		"dueDate": 1063790502134,

		"milestones": [{
			"title": "My First MileStone",
			"dueDate": 1063790502134
		}, {
			"title": "My Second MileStone",
			"dueDate": 1063790002134
		}]
	}
}
```

#### returns
```
{
  "user": {
    "email": "simon@example.com",
    "createdAt": "2016-05-21T13:03:03.840Z",
    "updatedAt": "2016-05-21T13:03:03.840Z",
    "id": "57405c877d6fc015441d8a04"
  },
  "project": {
    "title": "My Life Goal",
    "dueDate": "2003-09-17T00:00:00.000Z",
    "owner": "57405c877d6fc015441d8a04",
    "createdAt": "2016-05-21T13:03:03.843Z",
    "updatedAt": "2016-05-21T13:03:03.845Z",
    "id": "57405c877d6fc015441d8a05"
  },
  "milestones": [
    {
      "project": "57405c877d6fc015441d8a05",
      "title": "My First MileStone",
      "dueDate": "2003-09-17T00:00:00.000Z",
      "createdAt": "2016-05-21T13:03:03.850Z",
      "updatedAt": "2016-05-21T13:03:03.850Z",
      "id": "57405c877d6fc015441d8a06"
    },
    {
      "project": "57405c877d6fc015441d8a05",
      "title": "My Second MileStone",
      "dueDate": "2003-09-17T00:00:00.000Z",
      "createdAt": "2016-05-21T13:03:03.851Z",
      "updatedAt": "2016-05-21T13:03:03.851Z",
      "id": "57405c877d6fc015441d8a07"
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NDA1Yzg3N2Q2ZmMwMTU0NDFkOGEwNCIsImlhdCI6MTQ2MzgzNTc4MywiZXhwIjoxNDYzODQ2NTgzfQ.-CASaOIKn_DLxD9Eit-sPZ-hqhaZi2wQzQ-2oJeQvz8"
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

## User
###delete
`Request Type: DELETE`
> /api/user/:id

deletes user and all associated data (projects, milestones, steps)

#### requirement
```
token: [token]
```

#### returns
```
{
  "msg": "User with id: [token] successfully destroyed!"
}
```

###getuser
`Request Type: POST`
> /api/getUser

returns the user who includes the newest project with all milestones and all steps

#### requirement
```
token: [token]
```

#### returns
```
{
  "user": {
    "projects": [
      {
        "title": "My First Project",
        "dueDate": "2016-05-21T00:00:00.000Z",
        "owner": "5740963685fa794d1dd09b06",
        "createdAt": "2016-05-21T17:10:08.610Z",
        "updatedAt": "2016-05-21T17:10:08.610Z",
        "id": "5740967085fa794d1dd09b07"
      }
    ],
    "email": "kathi@example.com",
    "createdAt": "2016-05-21T17:09:10.699Z",
    "updatedAt": "2016-05-21T17:09:10.699Z",
    "id": "5740963685fa794d1dd09b06",
    "project": {
      "milestones": [
        {
          "title": "My First Milestone",
          "dueDate": "2003-09-17T00:00:00.000Z",
          "project": "5740967085fa794d1dd09b07",
          "createdAt": "2016-05-21T17:10:56.270Z",
          "updatedAt": "2016-05-21T17:10:56.270Z",
          "id": "574096a085fa794d1dd09b08",
          "step": [
            {
              "title": "My first Step",
              "milestone": "574096a085fa794d1dd09b08",
              "createdAt": "2016-05-21T17:14:34.712Z",
              "updatedAt": "2016-05-21T17:14:34.712Z",
              "id": "5740977a85fa794d1dd09b09"
            },
            {
              "title": "My second Step",
              "milestone": "574096a085fa794d1dd09b08",
              "createdAt": "2016-05-21T17:30:41.888Z",
              "updatedAt": "2016-05-21T17:30:41.888Z",
              "id": "57409b417b0aac7d1de7b65a"
            },
            {
              "title": "My third Step",
              "milestone": "574096a085fa794d1dd09b08",
              "createdAt": "2016-05-21T17:30:45.585Z",
              "updatedAt": "2016-05-21T17:30:45.585Z",
              "id": "57409b457b0aac7d1de7b65b"
            }
          ]
        },
        {
          "title": "My Second Milestone",
          "dueDate": "2003-09-17T00:00:00.000Z",
          "project": "5740967085fa794d1dd09b07",
          "createdAt": "2016-05-21T17:32:54.386Z",
          "updatedAt": "2016-05-21T17:32:54.386Z",
          "id": "57409bc6ce26ae851d51aefb",
          "step": [
            {
              "title": "My first Step",
              "milestone": "57409bc6ce26ae851d51aefb",
              "createdAt": "2016-05-21T17:33:17.678Z",
              "updatedAt": "2016-05-21T17:33:17.678Z",
              "id": "57409bddce26ae851d51aefc"
            }
          ]
        }
      ],
      "owner": "5740963685fa794d1dd09b06",
      "title": "My First Project",
      "dueDate": "2016-05-21T00:00:00.000Z",
      "createdAt": "2016-05-21T17:10:08.610Z",
      "updatedAt": "2016-05-21T17:10:08.610Z",
      "id": "5740967085fa794d1dd09b07",
      "done": false
    }
  }
}
```

###change Password
`Request Type: PUT`
> /api/user

updates userpassword

#### requirement
```
token: [token]
oldPw: 'oldPassword'
newPw: 'newPassword'
```

#### returns
```
{
  "msg": "Userpassword was changed successfully!"
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

## Milestones
### create
`Request Type: POST`
> /api/project/:projectId/milestone

Create a new Milestone for the currently used project

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
> /api/milestone/:id

updates the milestone by id

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
> /api/milestone/:id

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

## Steps
### create
`Request Type: POST`
> /api/milestone/:milestoneId/step

Create a new Step for the currently used Milestone

#### requirement
```
title: 'My first Step',
token: [token]
```

#### returns
```
{
  "step": {
    "title": "My first Step",
    "milestone": "5740523cc8e2f0e9c77dd427",
    "createdAt": "2016-05-21T12:48:16.105Z",
    "updatedAt": "2016-05-21T12:48:16.105Z",
    "id": "57405910c8d4d4a91ba778a0"
  }
}
```

### get
`Request Type: GET`
> /api/step/:id

get step from id

#### returns
```
{
  "step": {
    "milestone": "5740523cc8e2f0e9c77dd427",
    "title": "changed",
    "createdAt": "2016-05-21T12:48:16.105Z",
    "updatedAt": "2016-05-21T12:49:50.034Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NDAyYWJlNmM5NjViZWVjNTdiMTY1NCIsImlhdCI6MTQ2MzgzNDg2OSwiZXhwIjoxNDYzODQ1NjY5fQ.Rw7F_IvxC_64p1DvdrMu5nzRkEbq-ndRySDCwmVJOyc",
    "id": "57405910c8d4d4a91ba778a0"
  }
}
```

### update
`Request Type: PUT`
> /api/step/:id

updates the step by id

#### requirement
only requires fields to update
```
title: 'My updated Step',
token: [token]
```

#### returns
```
{
  "step": {
    "title": "My updated Step",
    "milestone": "5740523cc8e2f0e9c77dd427",
    "createdAt": "2016-05-21T12:48:16.105Z",
    "updatedAt": "2016-05-21T12:49:50.034Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NDAyYWJlNmM5NjViZWVjNTdiMTY1NCIsImlhdCI6MTQ2MzgzNDg2OSwiZXhwIjoxNDYzODQ1NjY5fQ.Rw7F_IvxC_64p1DvdrMu5nzRkEbq-ndRySDCwmVJOyc",
    "id": "57405910c8d4d4a91ba778a0"
  }
}
```

### delete
`Request Type: DELETE`
> /api/step/:id

#### requirement
```
token: [token]
```

#### returns
```
{
  "msg": "Step successfully destroyed"
}
```
