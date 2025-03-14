CREATE DATABASE MOVIE_BOOKING;
USE MOVIE_BOOKING;
CREATE TABLE user(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    password VARCHAR(255) NOT NULL
);


CREATE TABLE venues(
	venue_id INT AUTO_INCREMENT PRIMARY KEY,
    vname VARCHAR(255) NOT NULL ,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE movies(
	movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    description TEXT,
    duration INT ,
    poster_url TEXT,
    relese_date DATE,
    language VARCHAR(50)
);

CREATE TABLE movie_cast(
	movie_id INT,
    cast_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (movie_id,cast_name),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

CREATE TABLE shows (
	movie_id INT NOT NULL,
    venue_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    show_id INT AUTO_INCREMENT UNIQUE,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    PRIMARY KEY (movie_id, venue_id, start_time),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE CASCADE
);


CREATE TABLE bookings(
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    PRIMARY KEY(user_id,show_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE
);

CREATE TABLE booked_seats (
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    seat_no VARCHAR(10) NOT NULL,
    PRIMARY KEY (user_id, show_id, seat_no),
    FOREIGN KEY (user_id, show_id) REFERENCES bookings(user_id, show_id) ON DELETE CASCADE
);

select * from user;

    