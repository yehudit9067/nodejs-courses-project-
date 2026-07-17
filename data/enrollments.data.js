let enrollments = [
    { id: 1, studentId: 1, courseId: 2 },
    { id: 2, studentId: 2, courseId: 1 }
];

module.exports = {
    getAll: () => enrollments,
    getById: (id) => enrollments.find(e => e.id === id),
    create: (studentId, courseId) => {
        const newEnrollment = {
            id: enrollments.length > 0 ? enrollments[enrollments.length - 1].id + 1 : 1,
            studentId,
            courseId
        };
        enrollments.push(newEnrollment);
        return newEnrollment;
    },
    update: (id, studentId, courseId) => {
        const enrollment = enrollments.find(e => e.id === id);
        if (enrollment) {
            enrollment.studentId = studentId;
            enrollment.courseId = courseId;
        }
        return enrollment;
    },
    remove: (id) => {
        const index = enrollments.findIndex(e => e.id === id);
        if (index !== -1) {
            enrollments.splice(index, 1);
            return true;
        }
        return false;
    }
};