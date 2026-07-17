const express = require('express');
const app = express();
const PORT = 3000;

// ייבוא הנתבים (Routes) של כל אחת מהישויות
const coursesRoutes = require('./routes/courses.routes');
const studentsRoutes = require('./routes/students.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes');

// מידלוור חובה לקבלת נתוני JSON בגוף הבקשה (POST/PUT)
app.use(express.json());

// הגדרת נתיב (Route) בסיסי לכתובת הבית
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the School API",
        description: "This server manages courses, students, and enrollments data."
    });
});

// חיווט הנתבים השונים לנתיבי הבסיס שלהם (Prefix)
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/enrollments', enrollmentsRoutes);

// הפעלת השרת והאזנה לפורט שהוגדר
app.listen(PORT, async () => {
    const { default: chalk } = await import('chalk');

    console.log(chalk.blue.bold(`\n[Server] Express server is running at: http://localhost:${PORT}`));
    console.log(chalk.green(`[Server] Press Ctrl+C to stop the server\n`));
});