exports.findAll = async(user, content) => {
    const users = await User.findAll();
    return JSON.stringify(users, null, 2);
  };
  
exports.create = async(user, content) => {
    //const user = await models.User.build("")
};