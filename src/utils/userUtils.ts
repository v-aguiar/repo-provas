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
};

export default userUtils;
