
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const getUser = (token: string | undefined): JwtPayload | null => {
  if(!token) return null;

  const secretKey = process.env.JWT_SECRET_KEY || '';
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
