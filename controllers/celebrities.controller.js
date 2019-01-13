const Celebrity = require('../models/celebrity.model');

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => res.render('celebrities/index', { celebrities }))
    .catch(err => next(err))
}

module.exports.create = (req, res, next) => {
  res.render('celebrities/new', {celebrity: new Celebrity()});
}

module.exports.doCreate = (req, res, next) => {
  const celebrity = new Celebrity(req.body);

  celebrity.save()
    .then((celebrity) => { res.redirect('/celebrities' )});
}

module.exports.get = (req, res, next) => {
  Celebrity.findById(req.params.id)
  // .then(celebrity => res.send( { celebrity }));
  .then(celebrity => res.render('celebrities/show', { celebrity }));
}

module.exports.delete = (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(celebrity => res.redirect('/index'));
}

module.exports.edit = (req, res, next) => {
  /* Promise.all([
    Celebrity.find(),
    Book.findById(req.params.id)
  ]) */
  Celebrity.find(req.params.id)
  .then(celebrity => res.render('celebrities/new', { celebrity }));
}

module.exports.doEdit = (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      celebrity.set(req.body);

      celebrity.save()
        .then((celebrity) => { res.redirect('/index' )});
    })
}