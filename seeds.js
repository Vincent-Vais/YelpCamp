const mongoose   = require("mongoose"),
	  Campground = require("./models/campground"),
	  Comment    = require("./models/comment"),
	  User       = require("./models/user");

let data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Great Camp!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem sed risus ultricies tristique. Euismod quis viverra nibh cras. Tempor nec feugiat nisl pretium fusce id velit. Eget magna fermentum iaculis eu non diam phasellus vestibulum. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Maecenas sed enim ut sem. Et ligula ullamcorper malesuada proin libero nunc. Mi tempus imperdiet nulla malesuada. Vulputate dignissim suspendisse in est ante in nibh mauris. At tempor commodo ullamcorper a lacus. Nunc non blandit massa enim nec dui nunc mattis. Ac turpis egestas maecenas pharetra. Id donec ultrices tincidunt arcu non sodales neque sodales. Fames ac turpis egestas integer eget aliquet nibh praesent",
	},
	{
		name: "Blue Lagoon",
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Great Camp!. No bathroom, but have a lagoon. Duis at consectetur lorem donec massa sapien faucibus et molestie. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Venenatis lectus magna fringilla urna porttitor. Nam at lectus urna duis convallis convallis tellus. Semper auctor neque vitae tempus. Iaculis at erat pellentesque adipiscing commodo elit at. Pharetra magna ac placerat vestibulum lectus. Dolor morbi non arcu risus quis varius quam quisque id. Pharetra pharetra massa massa ultricies. Viverra ipsum nunc aliquet bibendum enim facilisis. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Scelerisque felis imperdiet proin fermentum. ",
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Sucks! Odio ut sem nulla pharetra diam sit amet nisl suscipit. Odio morbi quis commodo odio aenean. Tortor at auctor urna nunc id cursus metus. Arcu dui vivamus arcu felis bibendum ut tristique et. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Amet justo donec enim diam vulputate ut pharetra. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Non nisi est sit amet facilisis magna etiam. Amet risus nullam eget felis eget nunc lobortis. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At augue eget arcu dictum.",
	}
]

function seedDB(){
	Campground.remove({}, function(err){
	if(err){
		console.log("Error! ", err);
	}else{
		console.log("Campgrounds removed");
		Comment.remove({}, function(err){
			if(err){
				console.log("Error! ", err);
			}else{
				User.remove({}, function(err){
					if(err){
						console.log(err);
					}
				})
				// data.forEach(function(seed){
				// 	Campground.create(seed, function(err, campground){
				// 		if(err){
				// 			console.log("Error! ", err);
				// 		}else{
				// 			console.log("Added!");
				// 			console.log(campground);
				// 			Comment.create({
				// 				text: "This place is great, but I wish it had internet",
				// 				author: "Homer"
				// 			}, function(err, comment){
				// 				if(err){
				// 					console.log("Error ", err);
				// 				}else{
				// 					campground.comments.push(comment);
				// 					campground.save();
				// 					console.log("Created new comment");
				// 				}
				// 			});
				// 		}
				// 	});
				// });
			}	
		});	
		}
	});
};



// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
// }

module.exports = seedDB ; 