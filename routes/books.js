const { request, response } = require("express");
const express = require("express");

const {books}=require("../data/books.json");
const {users}=require("../data/users.json");
const router = express.Router();


/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameter: none
 */

router.get('/',(request,response)=>{
    response.status(200).json({success: true,data: books,
    message: "Server is working",
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get on basis of id
 * Access: Public
 * Parameter: id
 */

router.get("/:id",(request,response)=>{
    const {id} = request.params;
     
    const book = books.find((each)=>each.id === id);

    if(!book)
    return response.status(404).json({
        success:false,
        message:"Book not found in this id",
    });

    response.status(200).json({
        success:true,
        data:book,
    });
});

/**
 * Route: /books/issued/books
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: none
 */

router.get("/issued/by-user",(request,response)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });
        console.log(usersWithIssuedBooks);
    const issuedBooks=[];

    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id===each.issuedBook);
        
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if(issuedBooks.length === 0)
        return response.status(404).json({
            success:false,
            message:"No issued book found",
        });
    
    return response.status(200).json({
        success:true,
        data:issuedBooks,
    });
});

//default exports
module.exports = router;