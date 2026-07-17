const studentsData = require('../data/students.data');

module.exports = {
    getAllStudents: () => studentsData.getAll(),
    
    getStudentById: (id) => studentsData.getById(id),
    
    createStudent: (name, email) => {
        if (!name || !email) return null;
        return studentsData.create(name, email);
    },
    
    updateStudent: (id, name, email) => {
        if (!name || !email) return null;
        return studentsData.update(id, name, email);
    },
    
    deleteStudent: (id) => studentsData.remove(id)
};