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

    // 1. בדיקת תקינות הקלט - חייבים לקבל לפחות שדה אחד לעדכון
    if (!name && !email) {
        return res.status(400).json({ message: "At least one field (name or email) is required to update" });
    }

    // 2. בדיקה אם הסטודנט קיים במערכת
    const studentExists = studentsService.getStudentById(id);
    if (!studentExists) {
        return res.status(404).json({ message: "Student not found for update" });
    }

    // 3. ביצוע העדכון
    const updatedStudent = studentsService.updateStudent(id, name, email);
    
    if (!updatedStudent) {
        return res.status(500).json({ message: "Failed to update student due to a server error" });
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