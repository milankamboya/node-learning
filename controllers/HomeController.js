class HomeController {

  static home = (req, res) => {
    return res.send('homepage successfull');
  };
}

module.exports = HomeController;