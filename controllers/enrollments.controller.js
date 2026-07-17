const enrollmentsService = require('../services/enrollments.service');

module.exports = {
    getAll: (req, res) => {
        const enrollments = enrollmentsService.getAllEnrollments();
        res.json(enrollments);
    },
    getById: (req, res) => {
        const id = Number(req.params.id);
        const enrollment = enrollmentsService.getEnrollmentById(id);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.json(enrollment);
    },
    create: (req, res) => {
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "StudentId and courseId are required" });
        }

        try {
            const newEnrollment = enrollmentsService.createEnrollment(Number(studentId), Number(courseId));
            res.status(201).json(newEnrollment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: (req, res) => {
        const id = Number(req.params.id);
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "StudentId and courseId are required" });
        }

        try {
            const updatedEnrollment = enrollmentsService.updateEnrollment(id, Number(studentId), Number(courseId));
            if (!updatedEnrollment) {
                return res.status(404).json({ message: "Enrollment not found" });
            }
            res.json(updatedEnrollment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        const deleted = enrollmentsService.deleteEnrollment(id);
        if (!deleted) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.json({ message: "Enrollment deleted successfully" });
    }
};