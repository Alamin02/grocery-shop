var express = require('express');
var router = express.Router();
var fs = require('fs');

var app = express();

//import model
var Product = require('../models/item');

router.get('/new', checkAuth, function(req, res){
	res.render('newitem');
});


router.post('/new', function(req, res){
	console.log('New item request');
  console.log(req.body);
  //item name and price
	var name = req.body.name;
    var price = req.body.price;
    var shop = req.body.shop;
    var category = req.body.category;
    var details = req.body.details;
    var quantity = req.body.quantity;

    var file;
    var filename;
    //get image
    if(req.files){
        file = req.files.image;
        file.name = name + '.jpg';
        filename = file.name;
        file.mv('./public/photos/' + filename , function(err){
            if(err)
                console.log(err);
        });
    }
    var image_path = req.body.image;

     //validation
     req.checkBody('name', 'Product Name is required').notEmpty();
     req.checkBody('price', 'Include Price').notEmpty();
    // req.checkBody('image', 'No image provided').notEmpty();

     var error_log;
     req.getValidationResult().then(function(errors){
     	if(!errors.isEmpty()) {
            error_log = errors;
            res.render('newitem', {
              errors: error_log.array()
            });
            //return;
        } else {
   //       var image = fs.readFileSync(image_path);
        	var newItem = new Product({
        		name: name,
        		price: price,
            category: category,
            shop: shop,
            quantity: quantity,
            details: details
        	});

        	Product.createNew(newItem, function(err, item){
			    if(err) throw err;
			    console.log(item);
		    });

        	res.redirect('/admin/adminpanel?success=true');
        }
     });
});



router.post('/delete', function(req, res){
    console.log(req.body);
    var item_name = req.body.name;
    console.log(item_name);
    Product.deleteItem(item_name, function(err, item){
        if(err) throw err;
        console.log(item);
    });
    res.redirect('old');
    
});

router.get('/old', function(req, res){

  var query = req.query;

  Product.find(query, function (err, product) {
     if (err) throw err;

     if(product){
      res.render('manage', {
              products: product,
              shop: query
            });
     }
     else
      res.render('manage');
    });
});

router.post('/update', function(req, res){
  console.log(req.body);
  var id = req.body.id;
  var new_quantity = req.body.new_quantity;

  Product.findById(id, function(err, product){
    if (err) return handleError (err);
    product.quantity = new_quantity;

    product.save(function(err, updatedProduct){
      if(err) return handleError (err);

      res.redirect('old');
    })
  })

});


// checks if logged in
function checkAuth (req, res, next) {
    console.log('checkAuth ' + req.url);

    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if ((!req.session || !req.session.authenticated)) {
        console.log('not logged in');
        return;
    }
    next();
}


module.exports = router;