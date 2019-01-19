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
    .then(() => { res.redirect('/celebrities' )});
}

module.exports.get = (req, res, next) => {
  Celebrity.findById(req.params.id)
  // .then(celebrity => res.send( { celebrity }));
    .then(celebrity => res.render('celebrities/show', { celebrity }));
}

module.exports.delete = (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/celebrities'));
}

module.exports.edit = (req, res, next) => {
  //req.params => id, name, title
  /**
   * const id = req.params.id
   * const name = req.params.name
   * const title = req.params.title
   * 
   * const { id, name, title } = req.params
   * 
   * fn(params)
   * 
   * const fn = ({ id, name, title }) => {
   *  console.info(id, name, title)
   * }
   */
  const { id } = req.params

  Celebrity.findById({ _id: id })
    .then(celebrity => {
      res.render('celebrities/new', { celebrity })
    })
    .catch(error => console.info(`Error: ${error}`))
}

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params
  const { name, occupation, catchPhrase } = req.body
  Celebrity.findByIdAndUpdate(id, {$set: { name, occupation, catchPhrase }}, { new: true })
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(error => {
      console.info(error)
      res.redirect('/celebrities')
    })
}

// 
