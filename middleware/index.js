const Campground = require("../models/campground"),
	  Comment    = require("../models/comment");

const middleware = {};

middleware.checkCamgroundOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Camground not found");
				res.redirect("back");
			}else{
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permession to do that");
					res.redirect("back");
				}
			}
		})
	}else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};

middleware.checkCommentOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comid, function(err, foundComment){
			if(err){
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permession to do that");
					res.redirect("back");
				}
			}
		})
	}else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};

middleware.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("/login");
	}
};

module.exports = middleware;