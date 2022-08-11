const express = require('express');
const mongoose = require('mongoose');
const Budget = require('./models/budgets.js');
const override = require('method-override');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(override('_method'));

app.get('/budgets/new', (req, res) => {
    res.render('new.ejs');
});

app.put('/budgets/:id', (req, res) => {
    if ( req.body.approveBudget === 'on') {
        req.body.approveBudget = true;
    } else { 
        req.body.approveBudget = false;
    }
    Budget.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel) => {
        res.redirect('/budgets');
    });
});

app.post('/budgets', (req, res) => {
    if ( req.body.approveBudget === 'on') {
        req.body.approveBudget = true;
    } else { 
        req.body.approveBudget = false;
    }
    Budget.create(req.body, (error, createdBudget) => {
        res.redirect('/budgets')
    });
});

app.get('/budgets', (req, res) => {
    Budget.find({}, (error, allBudget) => {
        res.render('index.ejs', {budgets: allBudget} )
    });
});

app.get('/budgets/:id', (req, res) => {
    Budget.findById(req.params.id, (error, fBudget) => {
        res.render('show.ejs', {budget: fBudget});
    });
});

app.get('/budgets/:id/edit', (req, res) => {
    Budget.findById(req.params.id, (error, fBudget) => {
        res.render('edit.ejs', {budget: fBudget});
    });
});

app.delete('/budgets/:id', (req, res) => {
    Budget.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/budgets')
    });
});


app.listen(3000, () => {
    console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/bugtr' , () => {
    console.log('The Connection with MongoDB is Established');
});

