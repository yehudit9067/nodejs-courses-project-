const { readJson, writeJson } = require('../utils/fileStore');

const FILE_NAME = 'students.json';

module.exports = {
    getAll: async () => {
        return await readJson(FILE_NAME);
    },

    getById: async (id) => {
        const students = await readJson(FILE_NAME);
        return students.find(s => s.id === id);
    },

    // בדיקת קיום: מחזיר תמיד true/false, בלי לחשוף את האובייקט
    exists: async (id) => {
        const students = await readJson(FILE_NAME);
        return students.some(s => s.id === id);
    },

    create: async (name, email) => {
        const students = await readJson(FILE_NAME);
        // מייצר ID ייחודי לפי ה-ID המקסימלי הקיים (עמיד למחיקות)
        const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const newStudent = { id: nextId, name, email };
        students.push(newStudent);
        await writeJson(FILE_NAME, students);
        return newStudent;
    },

    update: async (id, name, email) => {
        const students = await readJson(FILE_NAME);
        const student = students.find(s => s.id === id);
        if (!student) return null;

        // עדכון חלקי: רק שדות שנשלחו
        if (name !== undefined) student.name = name;
        if (email !== undefined) student.email = email;

        await writeJson(FILE_NAME, students);
        return student;
    },

    remove: async (id) => {
        const students = await readJson(FILE_NAME);
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return false;

        students.splice(index, 1);
        await writeJson(FILE_NAME, students);
        return true;
    }
};
