const coursesService = require('../services/courses.service');

module.exports = {
    getAll: async (req, res) => {
        try {
            const courses = await coursesService.getAllCourses();
            res.json(courses);
        } catch (error) {
            // לא חושפים את error.message ללקוח - עלול להדליף פרטים פנימיים
            res.status(500).json({ message: "Failed to read courses" });
        }
    },

    getById: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const course = await coursesService.getCourseById(id);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ message: "Failed to read course" });
        }
    },

    create: async (req, res) => {
        try {
            const { name, duration } = req.body;
            const newCourse = await coursesService.createCourse(name, duration);
            if (!newCourse) {
                return res.status(400).json({ message: "Name and duration are required" });
            }
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ message: "Failed to create course" });
        }
    },

    update: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { name, duration } = req.body;

            const updatedCourse = await coursesService.updateCourse(id, name, duration);

            if (!updatedCourse) {
                // עדכון נכשל - נבחין בין "לא נמצא" ל"חסרים שדות"
                const exists = await coursesService.getCourseById(id);
                if (!exists) {
                    return res.status(404).json({ message: "Course not found for update" });
                }
                return res.status(400).json({ message: "At least one field (name or duration) is required to update" });
            }

            res.json(updatedCourse);
        } catch (error) {
            res.status(500).json({ message: "Failed to update course" });
        }
    },

    delete: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const deleted = await coursesService.deleteCourse(id);
            if (!deleted) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.json({ message: "Course deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete course" });
        }
    }
};
