const { request, response } = require("express");
const express = require("express");

const app = express();
//json import
const {books}= require("./data/users.json");

const PORT =8081;

app.use(express.json());

app.get("/",(request,response)=>{
    response.status(200).json({
        message:"Server is up and running",
    });
});
/**
 * Route: /users
 * Method: GET
 * Description: public
 * Parameters: None
 */

app.get("/users",(request,response)=>{
    response.status(200).json({
        success: true,
        data :users,
    });
});


app.get("*",(request,response)=>{
    response.status(404).json({
        message: "This route does not exist"
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});