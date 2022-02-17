const jwt = require("jsonwebtoken");

const secureAPI = () => {
  return function (req, res, next) {
    try {
      const tok = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(tok, process.env.JWT_SECRET);
      res.locals.decoded = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Auth Failed. Must send valid token" });
    }
  };
};

module.exports = secureAPI;
