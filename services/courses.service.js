const coursesData = require('../data/courses.data');

module.exports = {
    getAllCourses: () => coursesData.getAll(),
    
    getCourseById: (id) => coursesData.getById(id),
    
    createCourse: (name, duration) => {
        if (!name || !duration) return null;
        return coursesData.create(name, duration);
    },
    
    updateCourse: (id, name, duration) => {
        if (!name || !duration) return null;
        return coursesData.update(id, name, duration);
    },
    
    deleteCourse: (id) => coursesData.remove(id)
};