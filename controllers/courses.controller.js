const coursesService = require('../services/courses.service');

module.exports = {
    getAll: (req, res) => {
        const courses = coursesService.getAllCourses();
        res.json(courses);
    },
    getById: (req, res) => {
        const id = Number(req.params.id);
        const course = coursesService.getCourseById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    },
    create: (req, res) => {
        const { name, duration } = req.body;
        const newCourse = coursesService.createCourse(name, duration);
        if (!newCourse) {
            return res.status(400).json({ message: "Name and duration are required" });
        }
        res.status(201).json(newCourse);
    },
    update: (req, res) => {
        const id = Number(req.params.id);
        const { name, duration } = req.body;
        const updatedCourse = coursesService.updateCourse(id, name, duration);
        
        if (!updatedCourse) {
            return res.status(400).json({ message: "Update failed. Check parameters and ID" });
        }
        res.json(updatedCourse);
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        const deleted = coursesService.deleteCourse(id);
        if (!deleted) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    }
};