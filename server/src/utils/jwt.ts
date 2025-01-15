import jwt from 'jsonwebtoken';
import 'dotenv/config';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: number;
  }
}

const getToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.T!, { expiresIn: '15m' });
  return token;
};

const getRefreshToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.R!, { expiresIn: '7d' });
  return token;
};

const verifyRefreshToken = (token: string) => {
  try {
    const result = jwt.verify(token, process.env.R!);
    if (typeof result !== 'string') {
      return result.id;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export { getToken, getRefreshToken, verifyRefreshToken };
