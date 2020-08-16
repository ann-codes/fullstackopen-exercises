# Token Auth


## Create new user via postman

POST `http://localhost:3003/api/users`

In Body: 
```json
{
    "username": "adamguy", 
    "password": "adamguy",
    "name": "Adam"
}
```
Postman Result and as seen @ http://localhost:3003/api/users: 
```json
{
    "blogs": [],
    "username": "adamguy",
    "name": "Adam",
    "id": "5f37511aa79fc020c4fe45a4"
}
```
In MongoDB
```
_id:5f37511aa79fc020c4fe45a4
blogs:Array
username:"adamguy"
name:"Adam"
passwordHash:"$2b$10$ByaMLvne/alr788WCcnZkOWtG8usb.Y9c6mUp8Mg/kJh0p6WvbmHC"
__v:0
```

## Logging in via postman
POST `http://localhost:3003/api/login`

In Body: 
```json
{
    "username": "adamguy", 
    "password": "adamguy"
}
```
Postman result
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkYW1ndXkiLCJpZCI6IjVmMzc1MTFhYTc5ZmMwMjBjNGZlNDVhNCIsImlhdCI6MTU5NzQ2MTgwNX0.CNItIuzYKRYb3jkJuxlMcqD8Xqn90eDSGaVXaEYmwzA",
    "username": "adamguy",
    "name": "Adam"
}
```
If encountering issues logging in, make sure the `.env` has a `SECRET`; may need to stop nodemon and restart `npm run dev`/`yarn run dev`

## Create new blog with token required
POST `http://localhost:3003/api/blogs`

In Authorization tab, add in token from the login result OR <br>
In headers tab, set `key` to `Authorization` and `value` to `bearer <token from login result>`

In Body: 
```json
{
    "likes": 33,
    "title": "Awesome blog",
    "author": "Some person",
    "url": "awesomebog.com",
    "userId": "5f37511aa79fc020c4fe45a4"
}
```
Postman Result and as seen @ http://localhost:3003/api/blogs: 
```json
{
    "likes": 33,
    "title": "Awesome blog",
    "author": "Some person",
    "url": "awesomebog.com",
    "user": "5f37511aa79fc020c4fe45a4",
    "id": "5f375f5783027601f4543f44"
}
```
As seen @ http://localhost:3003/api/blogs: 
```json
{
    "likes": 33,
    "title": "Awesome blog",
    "author": "Some person",
    "url": "awesomebog.com",
    "user": {
        "username": "adamguy",
        "name": "Adam",
        "id": "5f37511aa79fc020c4fe45a4"
    },
    "id": "5f375f5783027601f4543f44"
}
```

In MongoDB
```
_id:5f375f5783027601f4543f44
likes:33
title:"Awesome blog"
author:"Some person"
url:"awesomebog.com"
user:5f37511aa79fc020c4fe45a4
__v:0
```
