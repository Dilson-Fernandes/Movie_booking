const db = require('./dbconfig.js');

async function initializeData() {
    try {
        // Clear existing data
        await db.query('DELETE FROM booked_seats');
        await db.query('DELETE FROM bookings');
        await db.query('DELETE FROM shows');
        await db.query('DELETE FROM movie_cast');
        await db.query('DELETE FROM movies');
        await db.query('DELETE FROM venues');

        // Reset Auto Increment
        await db.query('ALTER TABLE venues AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE movies AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE shows AUTO_INCREMENT = 1');

        // Insert Venues
        await db.query(`
            INSERT INTO venues (vname, location, capacity) VALUES
            ('Grand Cinema', 'Anna Salai, Chennai', 100),
            ('Skyline Theater', 'MG Road, Bengaluru', 80),
            ('Moonlight Cinema', 'Bandra, Mumbai', 60),
            ('Regal Cinemas', 'Connaught Place, Delhi', 120),
            ('Sunset Theater', 'Banjara Hills, Hyderabad', 90),
            ('Star Cineplex', 'Jayanagar, Bengaluru', 85),
            ('PVR Cinemas', 'Andheri West, Mumbai', 95),
            ('IMAX Theater', 'DLF Mall, Delhi', 110),
            ('Galaxy Cinema', 'Gachibowli, Hyderabad', 75),
            ('Sathyam Cinemas', 'T Nagar, Chennai', 130)
        `);

        // Insert Movies with multiple languages and genres no. of movies = 32
        await db.query(`
            INSERT INTO movies (title, genre, description, duration, poster_url, relese_date, language) VALUES
            ('Inception', 'science fiction', 'A mind-bending thriller.', 148, 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg', '2010-07-16', 'English'),
            ('Interstellar', 'science fiction', 'A journey beyond the stars.', 169, 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', '2014-11-07', 'English'),
            ('The Matrix', 'science fiction', 'A hacker discovers reality is an illusion.', 136, 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', '1999-03-31', 'English'),
            ('Avatar', 'science fiction', 'A human falls for a Navi on Pandora.', 162, 'https://image.tmdb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg', '2009-12-18', 'English'),
            ('Titanic', 'drama', 'A love story set on the Titanic.', 195, 'https://th.bing.com/th/id/OIP.OqH4vPLjPGrgruv5o8tdngHaJ4?rs=1&pid=ImgDetMain', '1997-12-19', 'English'),
            ('Joker', 'drama', 'The origin story of the Joker.', 122, 'https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', '2019-10-04', 'English'),
            ('KGF', 'action', 'The rise of Rocky in the underworld.', 155, 'https://m.media-amazon.com/images/M/MV5BM2M0YmIxNzItOWI4My00MmQzLWE0NGYtZTM3NjllNjIwZjc5XkEyXkFqcGc@._V1_.jpg', '2018-12-21', 'Kannada'),
            ('Vikram', 'thriller', 'A high-octane thriller.', 174, 'https://i0.wp.com/moviegalleri.net/wp-content/uploads/2021/07/Vijay-Sethupathi-Kamal-Fahadh-Faasil-Vikram-Movie-First-Look-Poster-HD.jpg', '2022-06-03', 'Tamil'),
            ('RRR', 'action', 'A fictional story based on revolutionaries.', 187, 'https://image.tmdb.org/t/p/original/wE0I6efAW4cDDmZQWtwZMOW44EJ.jpg', '2022-03-25', 'Telugu'),
            ('Drishyam', 'thriller', 'A gripping family drama with a thrilling twist.', 163, 'https://m.media-amazon.com/images/I/714kDfwueCL._AC_UF894,1000_QL80_.jpg', '2015-07-31', 'Hindi'),
            ('Blade Runner 2049', 'science fiction', 'A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard, who has been missing for thirty years.', 164, 'https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', '2017-10-06', 'English'),
            ('The Martian', 'science fiction', 'An astronaut, presumed dead, is stranded on Mars and must rely on his ingenuity to survive and signal Earth for rescue.', 144, 'https://image.tmdb.org/t/p/original/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg', '2015-10-02', 'English'),
            ('Arrival', 'science fiction', 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.', 116, 'https://image.tmdb.org/t/p/original/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg', '2016-11-11', 'English'),
            ('Baahubali: The Beginning', 'action', 'A young mans quest to discover his legacy leads him to a legendary kingdom and a fierce battle for the throne.', 159, 'https://m.media-amazon.com/images/M/MV5BM2YxZThhZmEtYzM0Yi00OWYxLWI4NGYtM2Y2ZDNmOGE0ZWQzXkEyXkFqcGc@._V1_.jpg', '2015-07-10', 'Telugu'),
            ('The Dark Knight', 'action', 'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.', 152, 'https://m.media-amazon.com/images/I/81IfoBox2TL.jpg', '2008-07-18', 'English'),
            ('Kabali', 'action', 'A gangster returns from prison to reclaim his life and seek justice.', 153, 'https://m.media-amazon.com/images/M/MV5BZWVlOGZhODYtMWMxYy00ZWFlLWFjYzktYTg5OWFhYmQ0MDZhXkEyXkFqcGc@._V1_.jpg', '2016-07-22', 'Tamil'),
            ('John Wick', 'action', 'A retired hitman seeks revenge after the death of his beloved dog.', 101, 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg', '2014-10-24', 'English'),
            ('Tagaru', 'action', 'A tough cop takes on ruthless gangsters to restore peace in the city.', 128, 'https://m.media-amazon.com/images/M/MV5BZTM4NDgyMWEtMmRkYy00ZTg4LWI3OWEtYTk0ZGZjZmViNmQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2018-02-23', 'Kannada'),
            ('James', 'action', 'A soldier turned security agent fights to protect his loved ones from powerful enemies.', 149, 'https://m.media-amazon.com/images/M/MV5BZTYyYmNkZWEtMDNiYS00YzEwLWJjNjYtY2M0YTIxNjAwZGM2XkEyXkFqcGc@._V1_.jpg', '2022-03-17', 'Kannada'),
            ('Avengers: Endgame', 'action', 'The Avengers unite to undo the damage caused by Thanos and restore balance to the universe.', 181, 'https://m.media-amazon.com/images/I/91syHT466TL.jpg', '2019-04-26', 'English'),
            ('Sarkaru Vaari Paata', 'action', 'A debt collector fights against corruption and financial fraud.', 162, 'https://upload.wikimedia.org/wikipedia/en/1/17/Sarkaru_Vaari_Paata.jpg', '2022-05-12', 'Telugu'),
            ('The Pursuit of Happyness', 'drama', 'A struggling salesman takes custody of his son as he embarks on a life-chttpanging professional career.', 117, 'https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_.jpg', '2006-12-15', 'English'),  
            ('Forrest Gump', 'drama', 'The story of a man with a low IQ who achieves great things in life despite his challenges.', 142, 'https://m.media-amazon.com/images/I/717C4+q+CrL.jpg', '1994-07-06', 'English'),  
            ('Lucia', 'drama', 'A struggling theater usher consumes a mysterious pill that alters his perception of reality.', 135, 'https://m.media-amazon.com/images/M/MV5BMTQyMDA5ODkzN15BMl5BanBnXkFtZTgwMjIzMDkyMDE@._V1_.jpg', '2013-08-15', 'Kannada'), 
            ('Thithi', 'drama', 'A comedy-drama about the death of a village elder and the events that unfold afterward.', 123, 'https://m.media-amazon.com/images/M/MV5BOWM4YTNlZTQtMTIyMS00ZmE2LTgxZDEtMjI1MzY3ZjcwZDVhXkEyXkFqcGc@._V1_.jpg', '2015-11-06', 'Kannada'),
            ('Jersey', 'drama', 'A failed cricketer makes a comeback to fulfill his sons wish of owning a jersey.', 157, 'https://upload.wikimedia.org/wikipedia/en/1/10/Jersey_2019_poster.jpg', '2019-04-19', 'Telugu'),
            ('Arjun Reddy', 'drama', 'A hot-headed surgeons life takes a downward spiral after his girlfriend marries someone else.', 187, 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p14472997_p_v8_aa.jpg', '2017-08-25', 'Telugu'),
            ('Asuran', 'drama', 'A farmer fights to protect his family from a powerful landowner.', 141, 'https://onlookersmedia.in/wp-content/uploads/2019/01/asuran-first-look-poster-stills1.jpg', '2019-10-04', 'Tamil'),
            ('The Shawshank Redemption', 'drama', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 142, 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg', '1994-10-14', 'English'),
            ('Dune', 'science fiction', 'A young nobleman embarks on a journey to protect his family and planet from rival factions.', 155, 'https://images-cdn.ubuy.co.in/6355c8013cefba3a8d6dc4e7-dune-movie-poster-27-x-40.jpg', '2021-10-22', 'English'),
            ('Gravity', 'science fiction', 'Two astronauts struggle to survive after an accident leaves them adrift in space.', 91, 'https://assets.scriptslug.com/live/img/poster/gravity-2013.jpg?v=1679811482', '2013-10-04', 'English'),
            ('Elysium', 'science fiction', 'In a dystopian future, a man takes on a mission to bring equality to Earth and a wealthy space station.', 109, 'https://m.media-amazon.com/images/M/MV5BNDc2NjU0MTcwNV5BMl5BanBnXkFtZTcwMjg4MDg2OQ@@._V1_FMjpg_UX1000_.jpg', '2013-08-09', 'English'),
            ('Gone Girl', 'thriller', 'A woman disappears on her wedding anniversary, and her husband becomes the prime suspect.', 149, 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/gone-girl-et00022415-11-08-2020-02-09-43.jpg', '2014-10-03', 'English'),
            ('Shutter Island', 'thriller', 'A U.S. Marshal investigates the disappearance of a murderer from a hospital for the criminally insane.', 138, 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p3531967_p_v13_an.jpg', '2010-02-19', 'English'),
            ('Talaash', 'thriller', 'A police officer investigates a mysterious car accident that leads him into the world of supernatural forces.', 139, 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9549537_p_v8_ab.jpg', '2012-11-30', 'Hindi'),
            ('U-Turn', 'thriller', 'A reporter investigates a series of deaths linked to a mysterious U-turn at a flyover.', 121, 'https://m.media-amazon.com/images/M/MV5BMjQ3Zjc2YzMtN2VlNC00NTliLWE0MWMtYTJlNDQ4ZmI4ZGZkXkEyXkFqcGc@._V1_.jpg', '2018-09-13', 'Kannada'),
            ('Kavaludaari', 'thriller', 'A traffic cop stumbles upon a decades-old case, leading him to uncover dark secrets.', 144, 'https://m.media-amazon.com/images/S/pv-target-images/12da1fdb3de2ee688d784fb09c7548047565087fe0b711abbefabf300e31c2b0.jpg', '2019-04-12', 'Kannada'),
            ('Goodachari', 'thriller', 'An intelligence agent discovers shocking truths about his father and his own identity.', 147, 'https://m.media-amazon.com/images/S/pv-target-images/abc07da34427f951671503171ce9ad4d0256f4d4d90198fabdb5111f6bdd8654.jpg', '2018-08-03', 'Telugu'),
            ('Ratsasan', 'thriller', 'A rookie cop investigates a series of brutal murders targeting young girls.', 170, 'https://m.media-amazon.com/images/M/MV5BMjgzMzMxMzUtNzUyYi00NTkxLWI1NTAtMjZhNmMxMGQ4YjBmXkEyXkFqcGc@._V1_.jpg', '2018-10-05', 'Tamil'),
            ('Kahaani', 'thriller', 'A pregnant woman searches for her missing husband in Kolkata, uncovering dangerous secrets.', 122, 'https://m.media-amazon.com/images/M/MV5BMTQ1NDI0NzkyOF5BMl5BanBnXkFtZTcwNzAyNzE2Nw@@._V1_.jpg', '2012-03-09', 'Hindi')
        `);

        // Insert Cast for Movies
        await db.query(`
            INSERT INTO movie_cast (movie_id, cast_name) VALUES
            (1, 'Leonardo DiCaprio'),
            (1, 'Joseph Gordon-Levitt'),
            (2, 'Matthew McConaughey'),
            (2, 'Anne Hathaway'),
            (3, 'Keanu Reeves'),
            (3, 'Laurence Fishburne'),
            (4, 'Sam Worthington'),
            (4, 'Zoe Saldana'),
            (5, 'Leonardo DiCaprio'),
            (5, 'Kate Winslet'),
            (6, 'Joaquin Phoenix'),
            (7, 'Yash'),
            (8, 'Kamal Haasan'),
            (9, 'NTR Jr.'),
            (9, 'Ram Charan'),
            (10, 'Ajay Devgn'),
            (11, 'Ryan Gosling'),
            (11, 'Harrison Ford'),
            (12, 'Matt Damon'),
            (12, 'Jessica Chastain'),
            (13, 'Amy Adams'),
            (13, 'Jeremy Renner'),
            (14, 'Prabhas'),  
            (14, 'Rana Daggubati'),
            (15, 'Christian Bale'),  
            (15, 'Heath Ledger'),
            (16, 'Rajinikanth'),  
            (16, 'Radhika Apte'),
            (17, 'Keanu Reeves'),  
            (17, 'Ian McShane'),
            (18, 'Shiva Rajkumar'),  
            (18, 'Manvitha Kamath'),
            (19, 'Puneeth Rajkumar'),  
            (19, 'Priya Anand'),
            (20, 'Robert Downey Jr.'),  
            (20, 'Chris Evans'),
            (21, 'Mahesh Babu'),  
            (21, 'Keerthy Suresh'),
            (22, 'Will Smith'),  
            (22, 'Jaden Smith'),  
            (23, 'Tom Hanks'),  
            (23, 'Robin Wright'),  
            (24, 'Sathish Ninasam'),  
            (24, 'Sruthi Hariharan'),  
            (25, 'Channegowda'),  
            (25, 'Singri Gowda'),  
            (26, 'Nani'),  
            (26, 'Shraddha Srinath'),  
            (27, 'Vijay Deverakonda'),  
            (27, 'Shalini Pandey'),  
            (28, 'Dhanush'),  
            (28, 'Manju Warrier'),
            (29, 'Tim Robbins'),  
            (29, 'Morgan Freeman'),
            (30, 'Timothée Chalamet'),  
            (30, 'Zendaya'),  
            (31, 'Sandra Bullock'), 
            (31, 'George Clooney'),  
            (32, 'Matt Damon'),
            (32, 'Jodie Foster'),
            (33, 'Ben Affleck'),
            (33, 'Rosamund Pike'),
            (34, 'Leonardo DiCaprio'),
            (34, 'Mark Ruffalo'),
            (35, 'Aamir Khan'),
            (35, 'Rani Mukerji'),
            (36, 'Samantha Ruth Prabhu'),
            (36, 'Aadhi Pinisetty'),
            (37, 'Rishi'),
            (37, 'Anant Nag'),
            (38, 'Adivi Sesh'),
            (38, 'Sobhita Dhulipala'),
            (39, 'Vishnu Vishal'),
            (39, 'Amala Paul'),
            (40, 'Vidya Balan'),
            (40, 'Nawazuddin Siddiqui')
        `);
        await db.query(`
            INSERT INTO shows (movie_id, venue_id, start_time) VALUES
            (1, 1, '2025-03-16 14:00:00'),
            (1, 2, '2025-03-16 17:00:00'),
            (2, 3, '2025-03-16 19:30:00'),
            (2, 4, '2025-03-16 21:00:00'),
            (3, 5, '2025-03-17 15:00:00'),
            (3, 6, '2025-03-17 18:30:00'),
            (4, 7, '2025-03-17 20:00:00'),
            (4, 8, '2025-03-18 16:00:00'),
            (5, 9, '2025-03-18 19:00:00'),
            (5, 10, '2025-03-18 21:30:00'),
            (6, 1, '2025-03-19 14:00:00'),
            (6, 2, '2025-03-19 17:00:00'),
            (7, 3, '2025-03-19 19:30:00'),
            (7, 4, '2025-03-19 21:00:00'),
            (8, 5, '2025-03-20 15:00:00'),
            (8, 6, '2025-03-20 18:30:00'),
            (9, 7, '2025-03-20 20:00:00'),
            (9, 8, '2025-03-21 16:00:00'),
            (10, 9, '2025-03-21 19:00:00'),
            (10, 10, '2025-03-21 21:30:00'),
            (11, 1, '2025-03-22 14:00:00'),
            (11, 2, '2025-03-22 17:00:00'),
            (12, 3, '2025-03-22 19:30:00'),
            (12, 4, '2025-03-22 21:00:00'),
            (13, 5, '2025-03-23 15:00:00'),
            (13, 6, '2025-03-23 18:30:00');
        `);
        console.log('Database reset and initialized successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await db.end();
    }
}

initializeData();
