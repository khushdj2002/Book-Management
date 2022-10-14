const express = require("express");


const {users}=require("../data/users.json");

const router  = express.Router();


/**
 * Route: /users/
 * Method: GET
 * Description: public
 * Parameters: None
 */

 router.get("/",(request,response)=>{
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

router.get("/:id",(request,response)=>{
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

router.post("/",(request,response)=>{
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

router.put("/:id",(request,response)=>{

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

router.delete("/:id",(request,response)=>{
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

module.exports = router;