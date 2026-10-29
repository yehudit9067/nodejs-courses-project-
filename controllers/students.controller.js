const studentsService = require('../services/students.service');

module.exports = {
    getAll: async (req, res) => {
        try {
            const students = await studentsService.getAllStudents();
            res.json(students);
        } catch (error) {
            // לא חושפים את error.message ללקוח - עלול להדליף פרטים פנימיים
            res.status(500).json({ message: "Failed to read students" });
        }
    },

    getById: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const student = await studentsService.getStudentById(id);
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        } catch (error) {
            res.status(500).json({ message: "Failed to read student" });
        }
    },

    create: async (req, res) => {
        try {
            const { name, email } = req.body;
            const newStudent = await studentsService.createStudent(name, email);
            if (!newStudent) {
                return res.status(400).json({ message: "Name and email are required" });
            }
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({ message: "Failed to create student" });
        }
    },

    update: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { name, email } = req.body;

            // null מהשירות יכול לנבוע מ"לא נמצא" או מ"לא נשלח אף שדה"
            // לכן בודקים קודם את הקלט, אחר כך את הקיום, ורק אז מעדכנים
            if (name === undefined && email === undefined) {
                return res.status(400).json({ message: "At least one field (name or email) is required to update" });
            }

            const studentExists = await studentsService.getStudentById(id);
            if (!studentExists) {
                return res.status(404).json({ message: "Student not found for update" });
            }

            const updatedStudent = await studentsService.updateStudent(id, name, email);
            if (!updatedStudent) {
                return res.status(500).json({ message: "Failed to update student" });
            }

            res.json(updatedStudent);
        } catch (error) {
            res.status(500).json({ message: "Failed to update student" });
        }
    },

    delete: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const deleted = await studentsService.deleteStudent(id);
            if (!deleted) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json({ message: "Student deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete student" });
        }
    }
};
