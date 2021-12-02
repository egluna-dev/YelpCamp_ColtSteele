const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError');
const catchAsync = require('./utilities/catchAsync');
const { reviewSchema } = require('./schemas.js');
const Campground = require('./models/Campground');
const Review = require('./models/Review');


const reviews = require('./routes/review');
const campgrounds = require('./routes/campgrounds');

// Connect database
connectDB();

const app = express();

// Prefix routes with /campgrounds for campground CRUD routes
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

// Parse Data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Override for PUT requests
app.use(methodOverride('_method'));

// Set view engines: EJS, EJS-mate
app.engine('ejs', ejsMate); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// GET Home Page
app.get('/', (req, res) => {
    res.render('home');
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) {err.message = 'Oh no, something went wrong!' }
    res.status(statusCode).render('error', { err });
});


// Delete all campgrounds
// app.delete('/campgrounds', async (req, res) => {
//     try {
//         const campgrounds = await Campground.deleteMany({});
//         res.redirect('/campgrounds');
//         console.log(campgrounds);
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));