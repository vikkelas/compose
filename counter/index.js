const express = require('express');
const fs = require('fs');
const app = express();
let storage = require('./data/storage');


app.get('/counter/:id', (req, res, next)=>{
    fs.readFile('./data/data.json', 'utf8', (err, data)=>{
        if(!err&&data&&storage.length===0){
            storage=JSON.parse(data)
            next()
        }
        next()
    })
})
app.get('/counter/:id', (req, res)=>{
    const {id} = req.params;
    const book = storage.find(i=>i.bookId===id);
    if(!book){
        const newBook = {bookId: id, count: 0};
        storage.push(newBook);
        fs.writeFile("./data/data.json", JSON.stringify(storage), (err)=>{
            console.log(err)
        });
        return res.status(200).json({count: newBook.count});
    }
    return res.status(200).json({count: book.count});
})

app.post('/counter/:bookId', (req, res)=>{
    const {bookId} = req.params;
    const book = storage.find(i=>i.bookId===bookId);
    book.count++;
    fs.writeFile("./data/data.json", JSON.stringify(storage), (err)=>{
        console.log(err)
    });
    return res.sendStatus(200);
});

const PORT = process.env.PORT_COUNTER || 5000;
app.listen(PORT);
console.log(`server counter start: ${PORT}`);