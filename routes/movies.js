const express = require('express');
const movieRouter = express.Router();

// movieRouter.get('/celebrities', (req, res, next) => {
//   Celebrity.find()
//     .then((celebrities) => {
//       res.render('celebrities/index', { celebrities });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = movieRouter;
