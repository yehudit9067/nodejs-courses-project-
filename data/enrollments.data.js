const { readJson, writeJson } = require('../utils/fileStore');

const FILE_NAME = 'enrollments.json';

module.exports = {
    getAll: async () => {
        return await readJson(FILE_NAME);
    },

    getById: async (id) => {
        const enrollments = await readJson(FILE_NAME);
        return enrollments.find(e => e.id === id);
    },

    create: async (studentId, courseId) => {
        const enrollments = await readJson(FILE_NAME);
        // מייצר ID ייחודי לפי ה-ID המקסימלי הקיים (עמיד למחיקות)
        const nextId = enrollments.length > 0 ? Math.max(...enrollments.map(e => e.id)) + 1 : 1;
        const newEnrollment = { id: nextId, studentId, courseId };
        enrollments.push(newEnrollment);
        await writeJson(FILE_NAME, enrollments);
        return newEnrollment;
    },

    update: async (id, studentId, courseId) => {
        const enrollments = await readJson(FILE_NAME);
        const enrollment = enrollments.find(e => e.id === id);
        if (!enrollment) return null;

        // עדכון חלקי: רק שדות שנשלחו
        if (studentId !== undefined) enrollment.studentId = studentId;
        if (courseId !== undefined) enrollment.courseId = courseId;

        await writeJson(FILE_NAME, enrollments);
        return enrollment;
    },

    remove: async (id) => {
        const enrollments = await readJson(FILE_NAME);
        const index = enrollments.findIndex(e => e.id === id);
        if (index === -1) return false;

        enrollments.splice(index, 1);
        await writeJson(FILE_NAME, enrollments);
        return true;
    }
};
