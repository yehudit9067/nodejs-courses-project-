const enrollmentsService = require('../services/enrollments.service');

// שגיאות עם status מגיעות מהוולידציה (400); כל השאר הן שגיאות שרת (500)
function respondError(res, error, fallbackMessage) {
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: fallbackMessage });
}

module.exports = {
    getAll: async (req, res) => {
        try {
            const enrollments = await enrollmentsService.getAllEnrollments();
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ message: "Failed to read enrollments" });
        }
    },

    getById: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const enrollment = await enrollmentsService.getEnrollmentById(id);
            if (!enrollment) {
                return res.status(404).json({ message: "Enrollment not found" });
            }
            res.json(enrollment);
        } catch (error) {
            res.status(500).json({ message: "Failed to read enrollment" });
        }
    },

    create: async (req, res) => {
        try {
            const { studentId, courseId } = req.body;
            if (studentId === undefined || courseId === undefined) {
                return res.status(400).json({ message: "StudentId and courseId are required" });
            }

            const newEnrollment = await enrollmentsService.createEnrollment(Number(studentId), Number(courseId));
            res.status(201).json(newEnrollment);
        } catch (error) {
            respondError(res, error, "Failed to create enrollment");
        }
    },

    update: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { studentId, courseId } = req.body;

            // בדיקה אם ההרשמה קיימת בכלל במערכת
            const enrollmentExists = await enrollmentsService.getEnrollmentById(id);
            if (!enrollmentExists) {
                return res.status(404).json({ message: "Enrollment not found for update" });
            }

            // תמיכה בעדכון חלקי: חייבים לפחות שדה אחד לעדכון
            if (studentId === undefined && courseId === undefined) {
                return res.status(400).json({ message: "At least one field (studentId or courseId) is required to update" });
            }

            const updatedEnrollment = await enrollmentsService.updateEnrollment(
                id,
                studentId !== undefined ? Number(studentId) : undefined,
                courseId !== undefined ? Number(courseId) : undefined
            );
            res.json(updatedEnrollment);
        } catch (error) {
            respondError(res, error, "Failed to update enrollment");
        }
    },

    delete: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const deleted = await enrollmentsService.deleteEnrollment(id);
            if (!deleted) {
                return res.status(404).json({ message: "Enrollment not found" });
            }
            res.json({ message: "Enrollment deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete enrollment" });
        }
    }
};
