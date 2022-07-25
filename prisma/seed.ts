import { prisma } from "../src/config/db.js";

async function _termUpsert() {
  await prisma.term.upsert({
    where: { number: 1 },
    update: {},
    create: { number: 1 },
  });
  await prisma.term.upsert({
    where: { number: 2 },
    update: {},
    create: { number: 2 },
  });
  await prisma.term.upsert({
    where: { number: 3 },
    update: {},
    create: { number: 3 },
  });
  await prisma.term.upsert({
    where: { number: 4 },
    update: {},
    create: { number: 4 },
  });
  await prisma.term.upsert({
    where: { number: 5 },
    update: {},
    create: { number: 5 },
  });
  await prisma.term.upsert({
    where: { number: 6 },
    update: {},
    create: { number: 6 },
  });
}

async function _categoryUpsert() {
  await prisma.category.upsert({
    where: { name: "Projeto" },
    update: {},
    create: { name: "Projeto" },
  });
  await prisma.category.upsert({
    where: { name: "Prática" },
    update: {},
    create: { name: "Prática" },
  });
  await prisma.category.upsert({
    where: { name: "Recuperação" },
    update: {},
    create: { name: "Recuperação" },
  });
}

async function _teacherUpsert() {
  await prisma.teacher.upsert({
    where: { name: "Diego Pinho" },
    update: {},
    create: { name: "Diego Pinho" },
  });
  await prisma.teacher.upsert({
    where: { name: "Bruna Hamori" },
    update: {},
    create: { name: "Bruna Hamori" },
  });
}

async function _disciplineUpsert() {
  await prisma.discipline.upsert({
    where: { name: "HTML e CSS" },
    update: {},
    create: {
      name: "HTML e CSS",
      termId: 1,
    },
  });
  await prisma.discipline.upsert({
    where: { name: "Javascript" },
    update: {},
    create: {
      name: "Javascript",
      termId: 2,
    },
  });
  await prisma.discipline.upsert({
    where: { name: "React" },
    update: {},
    create: {
      name: "React",
      termId: 3,
    },
  });
  await prisma.discipline.upsert({
    where: { name: "Humildade" },
    update: {},
    create: {
      name: "Humildade",
      termId: 1,
    },
  });
  await prisma.discipline.upsert({
    where: { name: "Planejamento" },
    update: {},
    create: {
      name: "Planejamento",
      termId: 2,
    },
  });
  await prisma.discipline.upsert({
    where: { name: "Autoconfiaça" },
    update: {},
    create: {
      name: "Autoconfiaça",
      termId: 3,
    },
  });
}

async function _teacherDisciplineUpsert() {
  await prisma.teacherDiscipline.upsert({
    where: { id: 1 },
    update: {},
    create: {
      teacherId: 1,
      disciplineId: 1,
    },
  });
  await prisma.teacherDiscipline.upsert({
    where: { id: 2 },
    update: {},
    create: {
      teacherId: 1,
      disciplineId: 2,
    },
  });
  await prisma.teacherDiscipline.upsert({
    where: { id: 3 },
    update: {},
    create: {
      teacherId: 1,
      disciplineId: 3,
    },
  });
  await prisma.teacherDiscipline.upsert({
    where: { id: 4 },
    update: {},
    create: {
      teacherId: 2,
      disciplineId: 4,
    },
  });
  await prisma.teacherDiscipline.upsert({
    where: { id: 5 },
    update: {},
    create: {
      teacherId: 2,
      disciplineId: 5,
    },
  });
  await prisma.teacherDiscipline.upsert({
    where: { id: 6 },
    update: {},
    create: {
      teacherId: 2,
      disciplineId: 6,
    },
  });
}

(async () => {
  await _termUpsert();
  await _categoryUpsert();
  await _teacherUpsert();
  await _disciplineUpsert();
  await _teacherDisciplineUpsert();
})()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
