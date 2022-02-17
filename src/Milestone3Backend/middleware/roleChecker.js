const roleCheck = (roles) => {
  return (req, res, next) => {
    const { decoded } = res.locals;
    const userRole = decoded.role_id;
    let roleName;
    if (userRole === 1) {
      roleName = "MODERATOR";
    } else if (userRole === 2) {
      roleName = "TUTOR";
    } else {
      roleName = "STUDENT";
    }
    if (roles.includes(roleName)) {
      next();
    } else {
      return res.status(401).json("No Permission for the role");
    }
  };
};

module.exports = { roleCheck };
