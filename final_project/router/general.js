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
// TASK 11-14: AXIOS & ASYNC/AWAIT & PROMISES
// ==========================================
const axios = require('axios');

// Task 11: Lấy danh sách tất cả các sách (Sử dụng Promise)
const getBooks = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/')
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
};

// Task 12: Tìm sách theo ISBN (Sử dụng Promise)
const getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/isbn/${isbn}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
};

// Task 13: Tìm sách theo Tác giả (Sử dụng async/await)
const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin sách theo tác giả:", error);
    }
};

// Task 14: Tìm sách theo Tiêu đề (Sử dụng async/await)
const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin sách theo tiêu đề:", error);
    }
};);
        });
};
