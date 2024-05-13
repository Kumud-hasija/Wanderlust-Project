const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview } = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//post review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
  
//delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor ,wrapAsync(reviewController.destroyReview));

module.exports = router;