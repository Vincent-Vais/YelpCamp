const express    = require("express"),
	  passport   = require("passport"),
	  User       = require("../models/user"),
	  middleware = require("../middleware");

const router = express.Router();

router.get("/", function(req, res){
	res.render("campgrounds/landing");
});

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			res.redirect("/register");
		}else{
			console.log(user);
			passport.authenticate("local")(req, res, function(){
				req.flash("success", `Welcome to YelpCamp ${user.username}`)
				res.redirect("/campgrounds");
			})
		}
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", 
		 passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}));

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Loged you out");
	res.redirect("/campgrounds");
});

// router.isLogedIn = 
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}else{
// 		res.redirect("/login");
// 	}
// }

module.exports = router;