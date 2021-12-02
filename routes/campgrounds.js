const express = require('express');
const router =  express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const { campgroundSchema } = require('../schemas.js');
const Campground = require('../models/Campground');

const validateCampground = (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const { error } = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// GET Show list of campgrounds 
router.get('/', catchAsync(async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
}));

// Form for registering new campground
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

// POST Register new campground
router.post('/', validateCampground, catchAsync(async (req, res) => {
    const campground = new Campground(...req.body.campground);
    await campground.save();
    console.log(req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`);
}));

// GET |Show details of individual campground
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    res.render('campgrounds/show', { campground });
}));

// GET form to change details of individual campgrounds
router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
}));

// PUT | Carry out changes to individual campground information
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
    console.log(`${campground} has been Updated Successfully`);
}));

// DELETE campground
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    console.log(campground);
    console.log(`${campground.title} has been deleted successfully`);
    res.redirect('/campgrounds');
}));

module.exports = router;
