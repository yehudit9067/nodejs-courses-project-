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
        //בדיקה אם הסטודנט קיים בכלל במערכת
        const studentExists = studentsService.getStudentById(id);
        //אם הסטודנט לא נמצא נחזיר מייד קוד סטטוס 404
        if (!studentExists) {
            return res.status(404).json({ message: "Student not found for update" });
        }
        //בדיקת תקינות הקלט שהתקבל מהלקוח
        if (!name && !email) {
            return res.status(400).json({ message: "At least one field (name or email) is required to update" });
        }
        const updatedStudent = studentsService.updateStudent(id, name, email);
        //הסרת קוד הטיפול בשגיאה הכללית משום שהוא התפצל לשני בדיקות ספציפיות 400 ו404
        // if (!updatedStudent) {
        //     return res.status(400).json({ message: "Update failed. Check parameters and ID" });
        // }

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found for update" });
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