const express = require('express');
const path = require('path')

// Init app
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req,res){
    let articles = [
        {
            id:1,
            title:'Article One',
            author:'Aktar Zaman',
            body:'This is article one'
        },
        {
            id:2,
            title:'Article Two',
            author:'Rahima Mahmood',
            body:'This is article two'
        },
        {
            id:3,
            title:'Article Three',
            author:'Fariha Zaman',
            body:'This is article three'
        }
    ];
    res.render('index',{
        title: 'Articles',
        articles: articles
    });

});

// Add route
app.get('/articles/add', function(req, res){
    res.render('add_article', {
        title: 'Add article'
    });

});

// Start server
app.listen(4000, function(){
    console.log("Server started on port 4000");
})
