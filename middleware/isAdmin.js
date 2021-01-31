
module.exports = function(req, res, next) {
    if (!req.session.itsAdmin) {
        return res.redirect('/')
    }

    next();
};