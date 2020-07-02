const express    = require("express"),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment"),
	  middleware = require("../middleware");

const router = express.Router();

router.get("/", function(req, res){
	if (req.query.search) {
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
       Campground.find({ "name": regex }, function(err, foundCampgrounds){
           if(err) {
               console.log(err);
           } else {
              res.render("campgrounds/index", {campGrounds : foundCampgrounds});
           }
       }); 
	}else{
		Campground.find(function(err, allCampgrounds){
		if(err){
			console.log("Error! ", err);
		}
		else{
			res.render("campgrounds/index", {campGrounds : allCampgrounds});
		}
		});
	}
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, function(req, res){
	const name = req.body.name;
	const image = req.body.image;
	const dsc = req.body.description;
	const price = req.body.price;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	const newCampground = {name : name, image : image, description : dsc, author: author, price: price};
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log("Error! ", err);
		} else{
			req.flash("success", "Successfully added campground");
			res.redirect("/campgrounds");
		}
	});
});

router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("Error! ", err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campGround: foundCampground});
		}
	});
});

router.get("/:id/edit", middleware.checkCamgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			req.flash("success", "Edited campground");
			res.render("campgrounds/edit", {campground: foundCampground});	
		}
	});
});

router.put("/:id", middleware.checkCamgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/camgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:id", middleware.checkCamgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, removedCamground){
		if(err){
			console.log(err);
		}
		Comment.deleteMany({id : {$in : removedCampground.comments} }, function(err){
			if(err){
				console.log(err);
			}
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		})
		
	})
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
	
module.exports = router;
	
	