const UserMaster = require('../models/user');

class UserController {

  static getUsers = async (req, res) => {
    const users = await UserMaster.find();
    return res.json(users);
  };

}

module.exports = UserController;