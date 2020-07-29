
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Node app is working!');
});

app.get("/api/customers",(req,res)=>{

    const customers = [
  
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Brad', lastName: 'Traversy'},
      {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  
    ];
  
    res.json(customers);
  
  });