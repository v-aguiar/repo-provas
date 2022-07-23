import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository.js";

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
    const SALT = process.env.SALT || 10;

    return bcrypt.hashSync(data, Number(SALT));
  },
};

export default userUtils;
