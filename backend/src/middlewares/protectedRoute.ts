import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = 'ubuntu'; 

const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.auth_token;  
    if (!token) {
      res.status(401).json({ error: 'Please Sign Up to Continue!' });
      return;
    }
  
    jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
      }
  
      if (decoded && typeof decoded === 'object') {
        (req as any ).user = decoded as { id: string; email: string };
        next();
      } else {
        res.status(403).json({ error: 'Invalid token format' });
      }
    });
  };
  
  

export default authenticateToken;
