var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/login', function(req, res){
	if ((!req.session || !req.session.authenticated)){
		res.render('login');
	}
	else
		res.redirect('adminpanel');
});

router.get('/logout', function(req, res){
	//yet to implement
});

router.get('/adminpanel', checkAuth, function(req, res){
	var success = req.query.success;
	if (success) {
		res.render('adminpanel', {
			success: "Item successfully added!"
		});
	} 
	else
		res.render('adminpanel');
});

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


router.post('/login', function (req, res, next) {

		// you might like to do a database look-up or something more scalable here
		if (req.body.username && req.body.username === 'shanto' && req.body.password && req.body.password === 'meghla') {
			req.session.authenticated = true;
			res.redirect('/admin/adminpanel');
		} else {
			res.render('login', {
				error : 'Wrong UserID or Password'
			});
		}

	});

//require model to load mail from database
var Mail = require('../models/mail');

router.get('/mail', function(req, res){
	Mail.find({}, function (err, mail) {
     if (err) throw err;

     if(mail){
        res.render('mail', {
              mails: mail
            });
     }
     else
      res.render('mail');
    });
});


module.exports = router;