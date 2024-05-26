import 'dotenv/config.js';
import * as jose from 'jose';
import * as argon2 from 'argon2';

const SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET);
const ALGORITHM = 'HS256';
const EXPIRATION_TIME = '1h';

class AuthService {
  constructor() {}

  login = async (user, password) => {
    const match = await argon2.verify(user.password, password);
    if (!match) {
      return { isValid: false, jwt: null };
    }

    const jwt = await new jose.SignJWT({
      user: { id: user.id, email: user.email_address },
    })
      .setProtectedHeader({ alg: ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(EXPIRATION_TIME)
      .sign(SECRET);

    return { isValid: match, jwt };
  };

  verifyToken = async (token) => {
    try {
      const { payload } = await jose.jwtVerify(token, SECRET);
      return { isValid: true, payload };
    } catch (err) {
      return { isValid: false, payload: null };
    }
  };
}

export default AuthService;
