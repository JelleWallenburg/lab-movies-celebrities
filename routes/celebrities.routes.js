// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity= require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render("celebrities/new-celebrity")
});

router.post('/celebrities/create', (req,res) =>{
    Celebrity.create(req.body)
    .then(newCelebrity => {
        console.log('new Celebrity', newCelebrity);
        res.redirect('/');
    })
    //if no error
    .catch( err =>{
        console.log(err);
        res.render("celebrities/new-celebrity")
    })
});

router.get('/celebrities', (req,res) => {
    Celebrity.find()
    .then(celebritiesArray => {
        console.log(celebritiesArray)
        res.render("celebrities/celebrities", {celebritiesArray})
    })
    .catch(err => console.log("error is", err))
})

module.exports = router;