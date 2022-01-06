const jwt = require("jsonwebtoken");

module.exports.secureAPI = () => {
  return function (req, res, next) {
    try {
      const tok = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(tok, process.env.JWT_SECRET);
      req.userData = decoded;
      console.log(req.userData);
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Auth Failed. Must send valid token" });
    }
  };
};
