import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (token) {
      jwt.verify(token, 'secretkey', (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
          } else {
              
              req.user = decoded; 
              next(); 
          }
      });
  } else {
      res.status(401).json({ message: 'No token provided' });
  }
};
