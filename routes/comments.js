const express    = require("express"),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment"),
	  middleware = require("../middleware");

const router = express.Router({mergeParams: true});

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log("Error, ", err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	})
});

router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log("Error ", err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log("Error ", err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added comment");
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	})
});

router.get("/:comid/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comid, function(err, foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			req.flash("success", "Edited comment");
			res.render("comments/edit", {campground_id : req.params.id, comment: foundComment})
		}
	})
});

router.put("/:comid", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comid, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

router.delete("/:comid", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comid, function(err){
		if(err){
			res.redirect("back");
		}
		req.flash("success", "Comment deleted");
		res.redirect(`/campgrounds/${req.params.id}`);
	})
})

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}else{
// 		res.redirect("/login");
// 	}
// }

// function checkCommentOwnership(req, res, next){
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comid, function(err, foundComment){
// 			if(err){
// 				res.redirect("back");
// 			}else{
// 				if(foundComment.author.id.equals(req.user._id)){
// 					next();
// 				}else{
// 					res.redirect("back");
// 				}
// 			}
// 		})
// 	}else{
// 		res.redirect("back");
// 	}
// };

module.exports = router;