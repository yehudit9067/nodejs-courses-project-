const studentsService = require('../services/students.service');

module.exports = {
    getAll: (req, res) => {
        const students = studentsService.getAllStudents();
        res.json(students);
    },
    getById: (req, res) => {
        const id = Number(req.params.id);
        const student = studentsService.getStudentById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    },
    create: (req, res) => {
        const { name, email } = req.body;
        const newStudent = studentsService.createStudent(name, email);
        if (!newStudent) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        res.status(201).json(newStudent);
    },
    update: (req, res) => {
        const id = Number(req.params.id);
        const { name, email } = req.body;
        const updatedStudent = studentsService.updateStudent(id, name, email);
        if (!updatedStudent) {
            return res.status(400).json({ message: "Update failed. Check parameters and ID" });
        }
        res.json(updatedStudent);
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        const deleted = studentsService.deleteStudent(id);
        if (!deleted) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    }
};