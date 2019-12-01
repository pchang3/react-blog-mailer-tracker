# React Blog + Email Tracker

Blog with Create, Read, Update, Delete functions. Articles can be sent to users via email in html format and tracked whether it was opened or not.

## Demo
https://react-blog-mailer.firebaseapp.com/

## Pre-requisites

* React
* Node.js
* Express
* MongoDB

## Usage
1. Go into "react-blog/src/index.js" and set "axios.defaults.baseURL" to appropriate value depending on the environment (i.e. http://localhost:8000/)

2. Make sure MongoDB database is connected with Mongoose.

3. To create initial seed user data, modify the test email addresses in "seed.js" file and run the file to create seed user data:
```python
cd react-blog-server
node seed.js
```
4. To start app
```python
cd react-blog-server
node server.js

cd react-blog
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
