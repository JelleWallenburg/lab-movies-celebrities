// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity= require('../models/Celebrity.model');

// all your routes here
router.get('/movies/create', (req, res) =>{
    Celebrity.find()
    .then(celebritiesArray => {
        console.log(celebritiesArray)
        res.render('movies/new-movie', {celebritiesArray})
    })
    .catch(error => console.log("error is:", error))
})

router.post('/movies/create', (req, res) =>{
    Movie.create(req.body)
    .then(newMovie =>
        console.log('new Movie', newMovie));
        res.redirect('/movies') //redirect to the list f all movies
        .catch(error => console.log("error is:", error))
})

router.get('/movies', (req,res) => {
    Movie.find()
    .then(moviesArray => {
        console.log(moviesArray)
        res.render("movies/movies", {moviesArray})
    })
    .catch(err => console.log("error is", err))
})

router.get('/movies/:_id', (req,res) => {
    console.log(req.params);
    Movie.findById(req.params)
    .populate("cast") 
    .then((movie) =>{
        console.log(movie);
        res.render("movies/movie-details", movie);
    })
    .catch(err => console.log("error", err))
})



router.post("/movies/:_id", (req,res)=> {
    console.log('meegezonden params',req.params)
    console.log('meegezonden body',req.body)
    const {title, genre, plot, cast} = req.body;
    console.log(title, genre, plot, cast)
    Movie.findOneAndReplace(req.params, {title:title, genre:genre, plot:plot, cast:cast})
    .catch(error => console.log("there is an error", error))
    res.redirect('/movies/:_id')
})

router.post('/movies/:_id/delete', (req, res) => {
    console.log(req.params)
    Movie.findByIdAndRemove(req.params)
    .then( 
        res.redirect('/movies')
    )
    .catch(error => console.log("there is an error", error))
})


router.get("/movies/:_id/edit", (req, res) => {
    Movie.findById(req.params)
    .populate('cast')
    .then(movies => {
        console.log(movies);
        res.render("movies/edit-movie", movies)
    })
    .catch(error => console.log(error))
})


module.exports = router;