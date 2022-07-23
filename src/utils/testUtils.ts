import testRepository from "../repositories/testRepository.js";

const testUtils = {
  checkForTestConflict: async (name: string) => {
    const test = await testRepository.getByName(name);
    if (test) {
      throw {
        name: "Conflict",
        message: "⚠ Test already created with this name...",
      };
    }
  },
};

export default testUtils;
