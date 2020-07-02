const express 	     = require("express"),
	  request 	     = require("request"),
	  bodyParser     = require("body-parser"),
	  mongoose 	     = require("mongoose"),
	  passport       = require("passport"),
	  LocalStrategy  = require("passport-local"),
	  methodOverride = require("method-override"),
	  Campground     = require("./models/campground"),
	  seedDB         = require("./seeds"),
	  Comment        = require("./models/comment"),
	  User           = require("./models/user"),
	  flash          = require("connect-flash"),
	  app 		     = express();

const campgroundRoutes = require("./routes/campgrounds"),
	  commentRoutes    = require("./routes/comments"),
	  authRoutes       = require("./routes/auth");
	  
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://yelpcamper:password123@c@cluster0.fgusb.mongodb.net/yelp_camp?retryWrites=true&w=majority", {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
	console.log("CONNECTED");
}).catch(err => {
	console.log(err);
});
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB();

app.use(require("express-session")({
	secret: "Campground",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
	res.locals.currentUrl = req._parsedOriginalUrl.path;
	res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// app.get("/", function(req, res){
// 	res.render("campgrounds/landing");
// });

// app.get("/campgrounds", function(req, res){
// 	Campground.find(function(err, allCampgrounds){
// 		if(err){
// 			console.log("Error! ", err);
// 		}
// 		else{
// 			res.render("campgrounds/index", {campGrounds : allCampgrounds});
// 		}
// 	});
	
// });

// app.get("/campgrounds/new", function(req, res){
// 	res.render("campgrounds/new");
// });

// app.post("/campgrounds", function(req, res){
// 	const name = req.body.name;
// 	const image = req.body.image;
// 	const dsc = req.body.description;
// 	const newCampground = {name : name, image : image, description : dsc};
// 	Campground.create(newCampground, function(err, newlyCreated){
// 		if(err){
// 			console.log("Error! ", err);
// 		} else{
// 			res.redirect("/campgrounds");
// 		}
// 	});
// });

// app.get("/campgrounds/:id", function(req, res){
// 	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
// 		if(err){
// 			console.log("Error! ", err);
// 		}
// 		else{
// 			console.log(foundCampground);
// 			res.render("campgrounds/show", {campGround: foundCampground});
// 		}
// 	});
// });

// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
// 	Campground.findById(req.params.id, function(err, campground){
// 		if(err){
// 			console.log("Error, ", err);
// 		}else{
// 			res.render("comments/new", {campground: campground});
// 		}
// 	})
// });

// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
// 	Campground.findById(req.params.id, function(err, campground){
// 		if(err){
// 			console.log("Error ", err);
// 			res.redirect("/campgrounds");
// 		}else{
// 			Comment.create(req.body.comment, function(err, comment){
// 				if(err){
// 					console.log("Error ", err);
// 				}else{
// 					campground.comments.push(comment);
// 					campground.save();
// 					res.redirect(`/campgrounds/${campground._id}`);
// 				}
// 			});
// 		}
// 	})
	
// });

// app.get("/register", function(req, res){
// 	res.render("register");
// });

// app.post("/register", function(req, res){
// 	const newUser = new User({username: req.body.username});
// 	User.register(newUser, req.body.password, function(err, user){
// 		if(err){
// 			console.log(err);
// 			return res.render("/register");
// 		}else{
// 			console.log(user);
// 			passport.authenticate("local")(req, res, function(){
// 				res.redirect("/campgrounds");
// 			})
// 		}
// 	});
// });

// app.get("/login", function(req, res){
// 	res.render("login");
// });

// app.post("/login", 
// 		 passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}));

// app.get("/logout", function(req, res){
// 	req.logout();
// 	res.redirect("/campgrounds");
// });

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}else{
// 		res.redirect("/login");
// 	}
// }

app.listen(3000, function(){
	console.log("Yelp Camp started listening on port 3000");
});