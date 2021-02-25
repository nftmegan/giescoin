const user_service = require('../services/user.service');

exports.findAll = async(req, res, next) => {
  const {user, content} = req.body
  try {
    const data = await user_service.findAll(user, content);
    res.status(200).send(data);
    next();
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

exports.create = async(req, res, next) => {
  const {user, content} = req.body
  try {
    await user_service.create(user, content);
    res.sendStatus(200);
    next();
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};