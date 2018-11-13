var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailSchema = new Schema({
	name : {
		type : String,
		index : true
	},
	email : {
		type : String
	},
	subject : {
		type : String
	},
	message : {
		type : String
	}
}, {collection: 'emails'});


var Mail = module.exports = mongoose.model('Mail', mailSchema);


module.exports.newMail = function(mail, callback){
	console.log('posted');
	var new_mail = new Mail(mail);
	new_mail.save(function(err){
		if (err) return handleError(err);
	})
}