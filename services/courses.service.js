const coursesData = require('../data/courses.data');

module.exports = {
    getAllCourses: async () => {
        return await coursesData.getAll();
    },

    getCourseById: async (id) => {
        return await coursesData.getById(id);
    },

    createCourse: async (name, duration) => {
        if (!name || !duration) return null;
        return await coursesData.create(name, duration);
    },

    updateCourse: async (id, name, duration) => {
        // תמיכה בעדכון חלקי: שולחים רק את השדות שנקבלו
        if (name === undefined && duration === undefined) return null;
        return await coursesData.update(id, name, duration);
    },

    deleteCourse: async (id) => {
        return await coursesData.remove(id);
    }
};
