const express = require('express');
const path = require('path')

// Init app
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req,res){
    res.render('index',{
        title: 'Fariha Choudhury'
    });

});


// Start server
app.listen(4000, function(){
    console.log("Server started on port 4000");
})
