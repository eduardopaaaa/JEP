const express = require('express');
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
// const fruitImp = require('./models/fruits.js');
const override = require('method-override');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(override('_method'));



app.get('/fruits/new', (req, res) => {
    res.render('new.ejs');
});

app.put('/fruits/:id', (req, res) => {
    if ( req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { 
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel) => {
        res.redirect('/fruits');
    });
});

app.post('/fruits', (req, res) => {
    if ( req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { 
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits')
    });
});

app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('index.ejs', {fruits: allFruits} )
    });
});

app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('show.ejs', {fruit: foundFruit});
    });
});

app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('edit.ejs', {fruit: foundFruit});
    });
});

app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/fruits')
    });
});




app.listen(3000, () => {
    console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/basiccrud' , () => {
    console.log('The Connection with MongoD is Established');
});

