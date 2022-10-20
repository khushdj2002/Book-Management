const { request, response } = require("express");
const express = require("express");


//json import
//const {users}= require("./data/users.json");
// importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT =8081;

app.use(express.json());

app.get("/",(request,response)=>{
    response.status(200).json({
        message:"Server is up and running",
    });
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);



/**
 * Route: /users/
 * Method: GET
 * Description: public
 * Parameters: None
 */

app.get("/users",(request,response)=>{
    response.status(200).json({
        success: true,
        message:"Running",
        data :users,
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by id
 * Access: public
 * Parameters: id
 */

app.get("/users/:id",(request,response)=>{
    const {id} =request.params;
    const user = users.find((each)=> each.id===id);
    if(!user){
        return response.status(404).json({
            success:false,
            message: "User not found",
        });
    }
    return response.status(200).json({
        success:true,
        data: user,
    });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: public
 * Parameters: none
 */

app.post("/users",(request,response)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate }=
    request.body;

    const user = users.find((each)=>each.id===id);

    if(user){
        return response.status(404).json({
            success: false,
            message: "User exist with this id",
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return response.status(201).json({
        success:true,
        data:users,
    });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: updating user data
 * Description: public
 * Parameters: id
 */

app.put("/users/:id",(request,response)=>{

    const {id} = request.params;
    const {data} = request.body;

    const user = users.find((each)=> each.id ===id);

    if(!user){
        return response.status(404).json({
            success:false,
            message:"User not found",
        });
    }
    const updatedUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });

    return response.status(200).json({
        success:true,
        message:"updated",
    });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by id
 * Access: Public
 * parameters:id
 */

app.delete("/users/:id",(request,response)=>{
    const {id} = request.params;
    const user = users.find((each)=> each.id === id);

    if(!users){
        return response.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const index = users.indexOf(user);
    users.splice(index,1);

    return response.status(200).json({
        success: true,
        data:users
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