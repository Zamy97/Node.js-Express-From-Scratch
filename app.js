const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname,'public')));


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

// Get single Article
app.get('/article/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article: article
        });
    });
});

// Add route
app.get('/articles/add', function(req, res){
    res.render('add_article', {
        title: 'Add article'
    });

});

// Add Submit POST route
app.post('/articles/add', function(req, res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });

});

// Start server
app.listen(4000, function(){
    console.log("Server started on port 4000");
})
