exports.isAdmin = (req, res, next) => {
  req.body.isAdmin
    ? next()
    : res.status(500).json({message: 'Doesnt have admin permissions'});
}
