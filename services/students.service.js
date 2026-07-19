const studentsData = require('../data/students.data');

module.exports = {
    getAllStudents: () => studentsData.getAll(),
    
    getStudentById: (id) => studentsData.getById(id),
    
    createStudent: (name, email) => {
        if (!name || !email) return null;
        return studentsData.create(name, email);
    },
    
    updateStudent: (id, name, email) => {
    // משיגים את הסטודנט הקיים
    const student = studentsData.getById(id);
    if (!student) return null; // הגנה נוספת ליתר ביטחון

    // מעדכנים רק את השדות שנשלחו בבקשה
    if (name) student.name = name;
    if (email) student.email = email;

    // שמירה או עדכון בתוך שכבת המידע שלכם
    return studentsData.update(id, student);
    },
    
    deleteStudent: (id) => studentsData.remove(id)
};