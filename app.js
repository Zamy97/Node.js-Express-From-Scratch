const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeKB');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('connected to MongoDB');
})

// Check for DB errors
db.on('error', function(err){
    console.log(err);
});


// Init app
const app = express();

// Bring in Models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req,res){
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);

        } else {
            res.render('index', {
                title:'Articles',
                articles: articles
            });
        }
    });
});

// Add route
app.get('/articles/add', function(req, res){
    res.render('add_article', {
        title: 'Add article'
    });

});

// Add submit POST route
app.post('/articles/add', function(req, res){
    console.log('sumitted');
    return;

});

// Start server
app.listen(4000, function(){
    console.log("Server started on port 4000");
})
