const studentsData = require('../data/students.data');

module.exports = {
    getAllStudents: async () => {
        return await studentsData.getAll();
    },

    getStudentById: async (id) => {
        return await studentsData.getById(id);
    },

    studentExists: async (id) => {
        return await studentsData.exists(id);
    },

    createStudent: async (name, email) => {
        if (!name || !email) return null;
        return await studentsData.create(name, email);
    },

    updateStudent: async (id, name, email) => {
        // תמיכה בעדכון חלקי: שולחים רק את השדות שנקבלו
        if (name === undefined && email === undefined) return null;
        return await studentsData.update(id, name, email);
    },

    deleteStudent: async (id) => {
        return await studentsData.remove(id);
    }
};
