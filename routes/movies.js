const express = require('express');
const movieRouter = express.Router();
const Movie = require('./../models/movie');

movieRouter.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

movieRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movies) => {
      res.render('movies/show', { movies });
    })
    .catch((err) => {
      next(err);
    });
});

movieRouter.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movies) => {
      res.render('movies/edit', { movies });
    })
    .catch((err) => {
      next(err);
    });
});

movieRouter.post('/', (req, res, next) => {
  const { title, genre, plot } = req.body;

  Movie.create({ title, genre, plot })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    });
});

movieRouter.post('/:id', (req, res, next) => {
  const { title, genre, plot } = req.body;
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, { title, genre, plot })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    });
});

movieRouter.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = movieRouter;
