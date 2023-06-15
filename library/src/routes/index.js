const express = require('express');
const router = express.Router();
const Book = require('../models/book');


router.get('/', async (req, res)=>{
    try{
        const books = await Book.find()
        res.render("index",{
            title: 'Главная',
            books
        })
    }catch (err){
        res.status(500).json(err);
    }
})

router.get('/book/:id',async (req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id).select('-__v');
        const response = await fetch(`${process.env.COUNTER_URL}/counter/${id}`,{
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(r => r.json())
        await fetch(`${process.env.COUNTER_URL}/counter/${id}`,{
            method: 'POST',
        })
        res.render("view", {
            title: book.title,
            count: response.count,
            book
        })
    }catch (err){
        res.status(500).json(err);
    }
})

router.post('/',async (req, res)=>{
    const {title, authors, description, favorite} = req.fields

    const newBook = new Book({
        title,
        description,
        authors,
        favorite: !!favorite
    })
    try{
        await newBook.save();
        res.redirect('/')
    }catch (err){
        res.status(500).json(err);
    }
})

router.get('/update/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id).select('-__v');
        if(!book){
            res.redirect('/404')
        }
        res.render("update", {
            title: 'Изменить',
            btn: 'Изменить',
            book
        })
    }catch (err){
        res.status(500).json(err);
    }
})

router.put('/update/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const changeObj = req.fields
        const book = await Book.findByIdAndUpdate(id, {...changeObj, favorite: !!changeObj.favorite}).select('-__v');
        if(!book){
            res.redirect('/404')
        }
        res.redirect(`/book/${id}`)
    } catch (err){
        res.status(500).json(err);
    }
})

router.get('/new',(req, res)=>{
    res.render("create",{
        title: 'Добавить книгу',
        btn: 'Создать',
        book: {}
    })
})

router.get('/delete/:id',async (req, res)=>{
    try{
        const {id} = req.params;
        await Book.deleteOne({_id: id})
        res.redirect(`/`)
    }catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;
