'use strict';

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('home');
  });

  app.get('/metamask', (req, res) => {
    res.render('metamask');
  });

  app.get('*', (req, res) => {
    res.status(404).render('404');
  });
};

