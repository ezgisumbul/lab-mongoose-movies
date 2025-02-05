const express = require('express');
const celebrityRouter = express.Router();
const Celebrity = require('../models/celebrity');

celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebrityRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebrityRouter.get('/:id', (req, res, next) => {
  const { id } = req.params; // id must be wrapped as an object because req.params is an object with a key called id. we are trying to use this key later on, and in a more shorter way
  // console.log(req.params);
  Celebrity.findById(id)
    .then((celebrities) => {
      res.render('celebrities/show', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebrityRouter.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((err) => {
      next(err);
    });
});

celebrityRouter.post('/', (req, res, next) => {
  // console.log(req.body);

  const { name, occupation, catchPhrase } = req.body;
  // const createdStar = new Celebrity({ name, occupation, catchPhrase });
  // createdStar
  //   .save(createdStar)
  //   .then((celebrities) => {
  //     res.render('celebrities/index', { celebrities });
  //   })
  //   .catch(() => {
  //     console.log('Error');
  //     res.render('celebrities/create');
  //   });

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      // res.render('celebrities/index', { celebrities }); // only lists the last created celebrity and not the whole list because we pass a single celebrity
      res.redirect('/celebrities'); // it doesn't work at all. gives error: update: apparently redirect gets path not view name
    })
    .catch((error) => {
      console.log('Error', error);
      res.redirect('/celebrities/create');
    });
});

celebrityRouter.post('/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
      // res.redirect('/celebrities/' + id);
    })
    .catch((err) => {
      next(err);
    });
});

celebrityRouter.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = celebrityRouter;
