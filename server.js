
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors());

let port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`); // try again

app.get("/",(req,res)=>{

  res.status(200).send("works!"); 

});

app.get("/api/customers",(req,res)=>{

  const customers = [

    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},

  ];

  res.json(customers);

});
