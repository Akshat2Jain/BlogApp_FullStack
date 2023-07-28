const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ message: "Not Success", success: false });
  } else {
    try {
      const validToken = verify(accessToken, "secretToken");
      req.user = validToken;
      if (validToken) {
        return next();
      }
    } catch (error) {
      return res.json({ message: error, success: false });
    }
  }
};

module.exports = { validateToken };
