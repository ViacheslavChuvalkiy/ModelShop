module.exports = function(req, res, next) {

    res.locals.auth = req.session.isAuthenticated;
    res.locals.itsAdmin = req.session.itsAdmin;
    next();
};