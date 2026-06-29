const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 7: Đăng ký người dùng
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Task 2: Lấy danh sách tất cả các sách
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 3: Lấy thông tin sách theo ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
     return res.status(200).json(books[isbn]);
  } else {
     return res.status(404).json({message: "Book not found"});
  }
});
  
// Task 4: Lấy thông tin sách theo Tác giả
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let result = [];
  for(let key in books){
      if(books[key].author === author){
          result.push(books[key]);
      }
  }
  return res.status(200).json(result);
});

// Task 5: Lấy thông tin sách theo Tiêu đề (Title)
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let result = [];
  for(let key in books){
      if(books[key].title === title){
          result.push(books[key]);
      }
  }
  return res.status(200).json(result);
});

// Task 6: Lấy đánh giá (review) của sách
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn]){
      return res.status(200).json(books[isbn].reviews);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;

// ==========================================
// TASK 11: AXIOS & ASYNC/AWAIT & PROMISES
// ==========================================
const axios = require('axios');

// 1. Lấy danh sách tất cả các sách (Dùng async/await)
const getAllBooksAsync = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("Task 11 - All Books:", response.data);
    } catch (error) {
        console.error("Error fetching all books:", error);
    }
};

// 2. Tìm sách theo ISBN (Dùng Promise callbacks)
const getBookByIsbnPromise = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log(`Task 11 - Book with ISBN ${isbn}:`, response.data);
        })
        .catch(error => {
            console.error("Error fetching book by ISBN:", error);
        });
};

// 3. Tìm sách theo Tác giả (Dùng async/await)
const getBookByAuthorAsync = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(`Task 11 - Books by ${author}:`, response.data);
    } catch (error) {
        console.error("Error fetching books by author:", error);
    }
};

// 4. Tìm sách theo Tiêu đề (Dùng Promise callbacks)
const getBookByTitlePromise = (title) => {
    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => {
            console.log(`Task 11 - Books with title ${title}:`, response.data);
        })
        .catch(error => {
            console.error("Error fetching books by title:", error);
        });
};