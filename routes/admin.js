const express = require("express");
const router = express.Router();
const { 
    addVenue, 
    addMovie, 
    addShow, 
    renderAddVenue, 
    renderAddMovie, 
    renderAddShow,
    viewShows,
    deleteShow
} = require("../controllers/admin");
const { isLoggedIn, isAdmin } = require("../middleware");

// Admin Dashboard
router.get("/dashboard", isLoggedIn, isAdmin, (req, res) => {
    res.render("admin/dashboard");
});

// Venues
router.get("/venues/add", isLoggedIn, isAdmin, renderAddVenue);
router.post("/venues/add", isLoggedIn, isAdmin, addVenue);

// Movies
router.get("/movies/add", isLoggedIn, isAdmin, renderAddMovie);
router.post("/movies/add", isLoggedIn, isAdmin, addMovie);

// Shows
router.get("/shows", isLoggedIn, isAdmin, viewShows);
router.get("/shows/add", isLoggedIn, isAdmin, renderAddShow);
router.post("/shows/add", isLoggedIn, isAdmin, addShow);
router.post("/shows/delete/:show_id", isLoggedIn, isAdmin, deleteShow);

module.exports = router;
