const db = require("../dbconfig");
module.exports.renderHome = async (req, res) => {
    try {
        // Fetch all movies and group by genre
        const [movies] = await db.query(`
            SELECT *
            FROM movies
            ORDER BY genre
        `);

        // Fetch top 10 recently released movies
        const [recentMovies] = await db.query(`
            SELECT * 
            FROM movies 
            ORDER BY relese_date DESC 
            LIMIT 10
        `);

        // Group movies by genre
        const moviesByGenre = {};
        movies.forEach(movie => {
            if (!moviesByGenre[movie.genre]) {
                moviesByGenre[movie.genre] = [];
            }
            moviesByGenre[movie.genre].push(movie);
        });

        res.render("common/home.ejs", { moviesByGenre, recentMovies });
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to load movies.");
        res.redirect("/");
    }
};


module.exports.getProfile = async (req, res) => {
    try {
        const user_id = req.user.id;

        // Fetch bookings with movie and venue details
        const [bookings] = await db.query(`
            SELECT 
                b.show_id, 
                m.title AS movie_title, 
                v.vname AS venue_name, 
                v.location, 
                s.start_time, 
                s.price, 
                GROUP_CONCAT(bs.seat_no ORDER BY bs.seat_no) AS seats
            FROM bookings b
            JOIN shows s ON b.show_id = s.show_id
            JOIN movies m ON s.movie_id = m.movie_id
            JOIN venues v ON s.venue_id = v.venue_id
            LEFT JOIN booked_seats bs ON b.user_id = bs.user_id AND b.show_id = bs.show_id
            WHERE b.user_id = ?
            GROUP BY b.show_id
        `, [user_id]);

        res.render("./common/profile", { user: req.user, bookings });
    } catch (error) {
        console.error("Error fetching profile:", error);
        req.flash("error", "Could not load profile.");
        res.redirect("/");
    }
};
