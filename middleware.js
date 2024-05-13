const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema }=require("./schema.js");
const {reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirectUrl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be login to create listing !");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


//validation for listing schema
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errmsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,error);
    }else{
      next();
    }
  };


//validation for review schema
module.exports.validateReview = (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errmsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,error);
    }else{
      next();
    }
  };  

  module.exports.isReviewAuthor = async(req,res,next)=>{
    let { id ,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
  
    next();
  };