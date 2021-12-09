const express = require('express');
const mysql = require('mysql');

const createTutors = require('./script/createTutors');
const removeTutors = require('./script/removeTutors');

const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mentorme-test",
});

con.connect((err) => {
  if (err)
  {
      console.log('Error in Connection');
  }
  else
  {
      app.listen(3000);
      console.log("Successful Connection");
  }
});

app.get('/script/create',(res,req) => createTutors(res,req,con))

app.get('/script/delete',removeTutors);

module.exports = con;

