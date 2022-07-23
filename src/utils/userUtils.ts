import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository.js";

const SALT = process.env.SALT || 10;
const JWT_KEY = process.env.JWT_SECRET || "JWT_KEY";
const EXPIRATION_TIME = "1d";

type DecodedTokenData = {
  userId: string;
};

const userUtils = {
  checkForUserConflict: async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if (user) {
      throw {
        name: "Conflict",
        message: "⚠ User already exists",
      };
    }
  },

  hashData: async (data: string) => {
    return bcrypt.hashSync(data, Number(SALT));
  },

  compareHashedData: async (data: string, hash: string) => {
    return bcrypt.compareSync(data, hash);
  },

  generateToken: (userId: number) => {
    return jwt.sign({ userId }, JWT_KEY, { expiresIn: EXPIRATION_TIME });
  },

  verifyToken: (token: string) => {
    jwt.verify(token, JWT_KEY, (error, data) => {
      if (error) {
        throw {
          name: "expiredToken",
          message: "⚠ Token expired!",
        };
      }
    });

    return jwt.decode(token) as DecodedTokenData;
  },
};

export default userUtils;
