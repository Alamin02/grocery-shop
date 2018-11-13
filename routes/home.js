var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//import model
var Product = require('../models/item');
var Mail = require('../models/mail');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('connected with database!');
});



// Get Homepage
router.get('/', function(req, res){
	//checks for products in the database
    console.log('Homepage');
	Product.find({}, function (err, product) {
     if (err) throw err;

     if(product){
     	res.render('index', {
              products: product
            });
     }
     else
     	res.render('index');
    });
});

router.get('/about', function(req,res){
    res.render('about');
});

router.get('/contact', function(req,res){
    res.render('contact');
});

router.post('/contact', function(req, res){
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    var mail = new Mail({
        name : name,
        email : email,
        subject : subject,
        message : message
    });

    Mail.newMail(mail, function(err, item){
        if (err) throw err;
        console.log(item);
    })
});

router.get('/details', function(req, res){
    console.log(req.query);
    var query = req.query;
    Product.findOne(query, function(err, item){
        if(err) throw err;

        if(item){
            res.render('item', {item: item});
        }
    });
});

router.get('/browse', function(req, res){
  console.log('browse request');
  console.log(req.query);
  var query = req.query;
  var category = req.query.category;
  Product.find(query, function(err, product){
    if (err) throw err;

    if(product){
      res.render('junk', {
        products: product,
        category: category
      });
    }
  });
});

module.exports = router;