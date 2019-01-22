const Movie = require('../models/movie.model');

module.exports.list = (req, res, next)=> {
    Movie.find()
        .then((movies)=> res.render('movies/index', {movies}))
        .catch(err => next(err))
    }

module.exports.create = (req, res, next) => {
    res.render('movies/new', {movie: new Movie()});
}

module.exports.doCreate = (req, res, next) => {
    const movie = new Movie(req.body);

    movie.save()
        .then(() => { res.redirect('/movies')});
} 

module.exports.get = (req, res, next) => {
    Movie.findById(req.params.id)
        .then((movie => res.render('movies/show', {movie})));
}

module.exports.delete = (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies'));
}

module.exports.edit = (req, res, next) => {
    const { id } = req.params

    Movie.findById({ _id: id })
        .then(movie => {
        res.render('movies/new', { movie })
    })
        .catch(error => console.info(`Error: ${error}`))
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot } = req.body
    Movie.findByIdAndUpdate(id, {$set: { title, genre, plot }}, { new: true })
        .then(()=>{ res.redirect('/movies')})
        .catch(error => {
            console.info(error)
            res.redirect('/movies')
          })
}