const enrollmentsData = require('../data/enrollments.data');
const studentsData = require('../data/students.data');
const coursesData = require('../data/courses.data');

module.exports = {
    getAllEnrollments: () => enrollmentsData.getAll(),
    
    getEnrollmentById: (id) => enrollmentsData.getById(id),
    
    createEnrollment: (studentId, courseId) => {
        // בדיקה שהתלמיד והקורס קיימים לפני הרישום
        const studentExists = studentsData.exists(studentId);
        const courseExists = coursesData.getById(courseId);

        if (!studentExists || !courseExists) {
            throw new Error("Student or Course does not exist");
        }

        return enrollmentsData.create(studentId, courseId);
    },
    
    updateEnrollment: (id, studentId, courseId) => {
        const studentExists = studentsData.exists(studentId);
        const courseExists = coursesData.getById(courseId);

        if (!studentExists || !courseExists) {
            throw new Error("Invalid StudentId or CourseId");
        }

        return enrollmentsData.update(id, studentId, courseId);
    },
    
    deleteEnrollment: (id) => enrollmentsData.remove(id)
};