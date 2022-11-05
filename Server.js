const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

const fetchMovies = async (url) => {
  try {
    let result;
    await axios
      .get(`${url}`)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {});
    return result;
  } catch (error) {}
};

app.get("/movies", async (req, res, next) => {
  try {
    const movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}`;

    const data = await fetchMovies(movies_url);

    return res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    return next(err);
  }
});

app.get("/searchMovie", async (req, res, next) => {
  try {
    const { query } = req.query;
    const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${query}`;

    const data = await fetchMovies(search_url);
    return res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    return next(err);
  }
});

app.get("/trendingSeries", async (req, res, next) => {
  try {
    const { query } = req.query;
    const search_url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.MOVIE_DB_API_KEY}`;

    const data = await fetchMovies(search_url);
    return res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    return next(err);
  }
});

app.get("/searchSeries", async (req, res, next) => {
  try {
    const { query } = req.query;
    const search_url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`;

    const data = await fetchMovies(search_url);
    return res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    return next(err);
  }
});

const server = app.listen(4000, () => {});
