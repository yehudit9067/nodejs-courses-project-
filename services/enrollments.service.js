const enrollmentsData = require('../data/enrollments.data');
const studentsData = require('../data/students.data');
const coursesData = require('../data/courses.data');

// שגיאת קלט של הלקוח - נושאת סטטוס 400 כדי שה-controller ידע להבדיל
// בינה לבין שגיאת שרת אמיתית (500)
function badRequest(message) {
    const err = new Error(message);
    err.status = 400;
    return err;
}

module.exports = {
    getAllEnrollments: async () => {
        return await enrollmentsData.getAll();
    },

    getEnrollmentById: async (id) => {
        return await enrollmentsData.getById(id);
    },

    createEnrollment: async (studentId, courseId) => {
        // await חובה: בלעדיו מקבלים Promise שאינו null, והתנאי לעולם לא מתקיים
        const studentExists = await studentsData.exists(studentId);
        const courseExists = await coursesData.getById(courseId);

        if (!studentExists || !courseExists) {
            throw badRequest("Student or Course does not exist");
        }

        return await enrollmentsData.create(studentId, courseId);
    },

    updateEnrollment: async (id, studentId, courseId) => {
        // בדיקת קיום רק עבור השדות שנשלחו (תמיכה בעדכון חלקי)
        if (studentId !== undefined) {
            const studentExists = await studentsData.exists(studentId);
            if (!studentExists) throw badRequest("Invalid StudentId");
        }
        if (courseId !== undefined) {
            const courseExists = await coursesData.getById(courseId);
            if (!courseExists) throw badRequest("Invalid CourseId");
        }

        return await enrollmentsData.update(id, studentId, courseId);
    },

    deleteEnrollment: async (id) => {
        return await enrollmentsData.remove(id);
    }
};
