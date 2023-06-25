const express = require('express');
const router = express.Router();
const Book = require('../model/book');
const store = require('../store')

router.get('/', (req, res)=>{
    res.render("index",{
        title: 'Главная',
        books: store
    })
})

router.get('/book/:id',async (req, res)=>{
    const {id} = req.params;
    const book = store.find(i=>i.id===id);
    const response =  await fetch(`${process.env.COUNTER_URL}/counter/${id}`,{
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
})

router.post('/',(req, res)=>{
    const {title, authors, description, favorite} = req.fields
    const book = new Book(title, description, authors, !!favorite)
    store.push(book);
    res.redirect('/')
})

router.get('/update/:id', (req, res)=>{
    const {id} = req.params;
    const book = store.find(i=>i.id===id);
    if(!book){
        res.redirect('/404')
    }
    res.render("update", {
        title: 'Изменить',
        btn: 'Изменить',
        book
    })
})

router.put('/update/:id', (req, res)=> {
    const {id} = req.params;
    const book = store.findIndex(i=>i.id===id);
    if(book===-1){
        res.redirect('/404')
    }
    const changeObj = req.fields
    for (let key in changeObj){
        if(key==='favorite'){
            store[book]["favorite"]=!!changeObj.favorite
        }
        store[book][key]=changeObj[key]
    }
    res.redirect(`/book/${id}`)
})

router.get('/new',(req, res)=>{
    res.render("create",{
        title: 'Добавить книгу',
        btn: 'Создать',
        book: {}
    })
})

router.get('/delete/:id',(req, res)=>{
    const {id} = req.params;
    const book = store.findIndex(i=>i.id===id);
    if(book===-1){
        res.redirect('/404')
    }
    store.splice(book,1)
    res.redirect(`/`)
})

module.exports = router;
