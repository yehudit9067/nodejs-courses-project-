const express = require('express');

const app = express();
const PORT = 3000;

// שורת חובה לקבלת נתוני JSON בגוף הבקשה (POST/PUT)
app.use(express.json());

// מערכי הנתונים בתוך הקובץ הראשי (נשתמש ב-let כדי שנוכל לשנות אותם)
let courses = [
    { id: 1, name: "Node.js Basics", duration: "40 hours" },
    { id: 2, name: "React Essentials", duration: "50 hours" }
];

let students = [
    { id: 1, name: "Israel Israeli", email: "israel@example.com" },
    { id: 2, name: "Sarah Levi", email: "sarah@example.com" }
];

let enrollments = [
    { id: 1, studentId: 1, courseId: 2 },
    { id: 2, studentId: 2, courseId: 1 }
];

// 1. הגדרת נתיב (Route) לכתובת הבית הראשית
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the School API",
        description: "This server manages courses, students, and enrollments data."
    });
});

// ==========================================
// 1. נתיבי קורסים (Courses Routes)
// ==========================================

// א. קבלת כל הקורסים (GET ALL)
app.get('/courses', (req, res) => {
    res.json(courses);
});

// ב. קבלת קורס בודד לפי מזהה (GET BY ID)
app.get('/courses/:id', (req, res) => {
    const courseId = Number(req.params.id);
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
});

// ג. יצירת קורס חדש (POST)
app.post('/courses', (req, res) => {
    const { name, duration } = req.body;

    if (!name || !duration) {
        return res.status(400).json({ message: "Name and duration are required" });
    }

    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        name: name,
        duration: duration
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// ד. עדכון קורס קיים (PUT)
app.put('/courses/:id', (req, res) => {
    const courseId = Number(req.params.id);
    const { name, duration } = req.body;

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (!name || !duration) {
        return res.status(400).json({ message: "Name and duration are required" });
    }

    course.name = name;
    course.duration = duration;

    res.json(course);
});

// ה. מחיקת קורס (DELETE)
app.delete('/courses/:id', (req, res) => {
    const courseId = Number(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
        return res.status(404).json({ message: "Course not found" });
    }

    courses.splice(courseIndex, 1);
    res.json({ message: "Course deleted successfully" });
});

// ==========================================
// 2. נתיבי תלמידים (Students Routes)
// ==========================================

// א. קבלת כל התלמידים (GET ALL)
app.get('/students', (req, res) => {
    res.json(students);
});

// ב. קבלת תלמיד בודד לפי מזהה (GET BY ID)
app.get('/students/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
});

// ג. יצירת תלמיד חדש (POST)
app.post('/students', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name: name,
        email: email
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// ד. עדכון תלמיד קיים (PUT)
app.put('/students/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const { name, email } = req.body;

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    student.name = name;
    student.email = email;

    res.json(student);
});

// ה. מחיקת תלמיד (DELETE)
app.delete('/students/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(studentIndex, 1);
    res.json({ message: "Student deleted successfully" });
});

// ==========================================
// 3. נתיבי רישום (Enrollments Routes)
// ==========================================

// א. קבלת כל הרישומים (GET ALL)
app.get('/enrollments', (req, res) => {
    res.json(enrollments);
});

// ב. קבלת רישום בודד לפי מזהה (GET BY ID)
app.get('/enrollments/:id', (req, res) => {
    const enrollmentId = Number(req.params.id);
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    
    if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
    }
    res.json(enrollment);
});

// ג. יצירת רישום חדש (POST)
app.post('/enrollments', (req, res) => {
    const { studentId, courseId } = req.body;

    // 1. בדיקה שכל השדות נשלחו
    if (!studentId || !courseId) {
        return res.status(400).json({ message: "StudentId and courseId are required" });
    }

    // 2. בדיקה האם התלמיד קיים במערכת
    const studentExists = students.some(s => s.id === Number(studentId));
    if (!studentExists) {
        return res.status(400).json({ message: "Cannot enroll: Student does not exist" });
    }

    // 3. בדיקה האם הקורס קיים במערכת
    const courseExists = courses.some(c => c.id === Number(courseId));
    if (!courseExists) {
        return res.status(400).json({ message: "Cannot enroll: Course does not exist" });
    }

    // 4. יצירת הרישום החדש
    const newEnrollment = {
        id: enrollments.length > 0 ? enrollments[enrollments.length - 1].id + 1 : 1,
        studentId: Number(studentId),
        courseId: Number(courseId)
    };

    enrollments.push(newEnrollment);
    res.status(201).json(newEnrollment);
});

// ד. עדכון רישום קיים (PUT)
app.put('/enrollments/:id', (req, res) => {
    const enrollmentId = Number(req.params.id);
    const { studentId, courseId } = req.body;

    const enrollment = enrollments.find(e => e.id === enrollmentId);

    if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
    }

    if (!studentId || !courseId) {
        return res.status(400).json({ message: "StudentId and courseId are required" });
    }

    // בדיקה שהתלמיד והקורס החדשים קיימים במערכת
    const studentExists = students.some(s => s.id === Number(studentId));
    const courseExists = courses.some(c => c.id === Number(courseId));

    if (!studentExists || !courseExists) {
        return res.status(400).json({ message: "Invalid StudentId or CourseId" });
    }

    enrollment.studentId = Number(studentId);
    enrollment.courseId = Number(courseId);

    res.json(enrollment);
});

// ה. מחיקת רישום (DELETE)
app.delete('/enrollments/:id', (req, res) => {
    const enrollmentId = Number(req.params.id);
    const enrollmentIndex = enrollments.findIndex(e => e.id === enrollmentId);

    if (enrollmentIndex === -1) {
        return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollments.splice(enrollmentIndex, 1);
    res.json({ message: "Enrollment deleted successfully" });
});

// הפעלת השרת
app.listen(PORT, async () => {
    const { default: chalk } = await import('chalk');

    console.log(chalk.blue.bold(`\n[Server] Express server is running at: http://localhost:${PORT}`));
    console.log(chalk.green(`[Server] Press Ctrl+C to stop the server\n`));
});