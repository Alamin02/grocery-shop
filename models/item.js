var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		index:true
	},
	price: {
		type: Number
	},

	category: {
		type: String
	},
	shop: {
		type: Number
	},
	quantity: {
		type: Number
	},
	details: {
		type: String
	}
}, {collection: 'allproducts'});


var Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.createNew = function(product, callback){
	console.log('trying to create new');
	var New = new Product(product);
	New.save(function (err) {
		console.log('trying to save...');
    if (err) return handleError(err);
   // saved!
   })
}

module.exports.deleteItem = function(productName, callback){
	console.log(productName);
	Product.remove({ name : productName}, function(err){
		if(err) return handleError(err);
	});
}