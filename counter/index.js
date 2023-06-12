const express = require('express');
const app = express();
const storage = require('./data/storage');
const BookStore = require('./BookStore');

app.get('/counter/:id', (req, res)=>{
    const {id} = req.params;
    const book = storage.find(i=>i.bookId===id);
    if(!book){
        const newBook = new BookStore(id);
        storage.push(newBook)
        return res.status(200).json({count: newBook.count});
    }
    return res.status(200).json({count: book.count});
})

app.post('/counter/:bookId', (req, res)=>{
    const {bookId} = req.params;
    const book = storage.find(i=>i.bookId===bookId);
    book.incCount();
    return res.sendStatus(200);
});


const PORT = process.env.PORT_COUNTER || 5000;
app.listen(PORT);
console.log(`server counter start: ${PORT}`);