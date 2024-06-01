import jwt from 'jsonwebtoken';

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(token, "token");

  if (!token) {
    return res.status(403).json({
      message: "Access denied. No token provided.",
      statusCode: 403,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRE);
    if (!decoded.isAdmin) {
      return res.status(403).json({
        message: "Access denied. Admins only.",
        statusCode: 403,
      });
    }
    req.admin = decoded;
    t;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({
      message: "Invalid token",
      statusCode: 403,
    });
  }
};
