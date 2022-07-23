import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

const teacherDisciplineUtils = {
  checkTeacherDisciplineExistence: async (id: number) => {
    const teacherDiscipline = await teacherDisciplineRepository.getById(id);
    if (!teacherDiscipline) {
      throw {
        name: "Not Found",
        message: "⚠ TeacherDiscipline not found...",
      };
    }
  },
};

export default teacherDisciplineUtils;
